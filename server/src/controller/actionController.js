const Like = require("./../models/like_model");
const Dislike = require("./../models/dislike_model");

const upLike = async (req, res, next) => {
  let variable = {};

  if (req.body.postId) {
    variable = { postId: req.body.postId, userId: req.user.id };
  } else {
    variable = { commentId: req.body.commentId, userId: req.user.id };
  }

  try {
    const likeac = new Like(variable);

    await likeac.save();

    await Dislike.findOneAndDelete(variable);

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
  }
};

const unLike = async (req, res) => {
  let variable = {};

  if (req.body.postId) {
    variable = { postId: req.body.postId, userId: req.user.id };
  } else {
    variable = { commentId: req.body.commentId, userId: req.user.id };
  }

  try {
    await Like.findOneAndDelete(variable);

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
  }
};

const getLike = async (req, res, next) => {
  let variable = {};

  if (req.body.postId) {
    variable = { postId: req.body.postId };
  } else {
    variable = { commentId: req.body.commentId };
  }

  try {
    const likes = await Like.find(variable);

    res.json({ success: true, likes });
  } catch (err) {
    console.log(err);
  }
};

const getDislike = async (req, res, next) => {
  let variable = {};

  if (req.body.postId) {
    variable = { postId: req.body.postId };
  } else {
    variable = { commentId: req.body.commentId };
  }

  try {
    const dislikes = await Dislike.find(variable);

    res.json({ success: true, dislikes });
  } catch (err) {
    console.log(err);
  }
};

const upDislike = async (req, res) => {
  let variable = {};

  if (req.body.postId) {
    variable = { postId: req.body.postId, userId: req.user.id };
  } else {
    variable = { commentId: req.body.commentId, userId: req.user.id };
  }

  try {
    const dislikeac = new Dislike(variable);

    await dislikeac.save();

    await Like.findOneAndDelete(variable);

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
  }
};

const unDislike = async (req, res) => {
  let variable = {};

  if (req.body.postId) {
    variable = { postId: req.body.postId, userId: req.user.id };
  } else {
    variable = { commentId: req.body.commentId, userId: req.user.id };
  }
  try {
    await Dislike.findOneAndDelete(variable);

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getLike,
  getDislike,
  upLike,
  unLike,
  upDislike,
  unDislike,
};
