const Comment = require("./../models/comment");
const client = require("./../redis/index");
const async = require("async");

const commentAdd = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    comment.populate("writer");
    comment.populate("postId");
    const commentNew = await comment.save();

    const result = await Comment.find({ _id: commentNew._id })
      .populate("writer")
      .populate("postId");

    await client.rPush(
      `Comments/${req.body.postId}`,
      JSON.stringify(commentNew)
    );

    res.status(200).json({ success: true, result });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getComments = async (req, res) => {
  let key = `Comments/${req.body.postId}`;
  try {
    const cacheCommentRange = await client.lRange(key, 0, -1);

    if (cacheCommentRange.length > 0) {
      async.map(
        cacheCommentRange,
        async function (cacheComment) {
          let parseData = JSON.parse(cacheComment);
          let job = { ...parseData };
          return job;
        },
        function (err, postIdbyComments) {
          if (err) throw err;

          res.status(200).json({ success: true, postIdbyComments });
        }
      );
    } else {
      const postIdbyComments = await Comment.find({
        postId: req.body.postId,
      })
        .populate("writer")
        .populate("postId");

      if (postIdbyComments.length === 0) {
        res.status(404).json({ success: false, postIdbyComments });
      } else {
        async.map(
          postIdbyComments,
          async function (postIdbyComment) {
            await client.lPush(key, JSON.stringify(postIdbyComment));
            return postIdbyComments;
          },
          function (err, postIdbyComments) {
            if (err) throw err;

            res.status(200).json({ success: true, postIdbyComments });
          }
        );
      }
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const editSave = async (req, res) => {
  let key = `Comments/${req.body.postId}`;
  try {
    const findWhoComment = await Comment.findOne({
      $and: [{ writer: req.user.id }, { _id: req.body.index }],
    }).populate("writer");

    if (findWhoComment) {
      const updatedProduct = await Comment.findByIdAndUpdate(
        findWhoComment._id,
        { $set: { content: req.body.content } },
        { new: true }
      )
        .populate("writer")
        .populate("postId");

      const cacheLRange = await client.lRange(key, 0, -1);

      async.map(
        cacheLRange,
        async function (value) {
          let parseData = JSON.parse(value);

          let job = { ...parseData };
          return job;
        },
        async function (err, valueResult) {
          if (err) throw err;

          const findIndex = valueResult.findIndex(
            ({ _id }) => _id == updatedProduct._id
          );

          await client.lSet(key, findIndex, JSON.stringify(updatedProduct));

          res.status(200).json({ success: true, updatedProduct });
        }
      );
    } else {
      res.status(404).json({ message: "You can't edit  comment error" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const deleteComment = async (req, res) => {
  try {
    const deleteValue = await Comment.findOneAndDelete({
      _id: req.params.id,
      $or: [{ writer: req.user.id }, { authorId: req.user.id }],
    })
      .populate("responseTo", "writer")
      .populate("postId", "authorId");

    res
      .status(200)
      .json({ success: true, message: "Comment Deleted", ıtem: deleteValue });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = {
  commentAdd,
  getComments,
  editSave,
  deleteComment,
};
