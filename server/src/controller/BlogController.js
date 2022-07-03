const Blog = require("./../models/blog_model");
const client = require("./../redis/index");
var _ = require("lodash");
const async = require("async");

const createPost = async (req, res) => {
  const id = req.user.id;
  req.body.authorId = id;

  try {
    const newblog = new Blog(req.body);
    newblog.populate("authorId");
    let saved = await newblog.save();

    await client.rPush("Blogs/dataPagin", JSON.stringify(saved));
    res.status(200).json({ message: "Successfully published", saved });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const onearticleget = async (req, res) => {
  let makaleId = req.params.id;
  try {
    const redisPostsbyId = await client.get(`blog/${req.params.id}`);

    if (!redisPostsbyId) {
      const sınglearticle = await Blog.findById({ _id: makaleId }).populate(
        "authorId"
      );

      if (!sınglearticle) {
        res.status(404).json(sınglearticle);
      } else {
        let keyName = `blog/${req.params.id}`;
        await client.set(keyName, JSON.stringify(sınglearticle));
        res.json(sınglearticle);
      }
    } else {
      res.json(JSON.parse(redisPostsbyId));
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const searchpost = async (req, res) => {
  let perpage = 3;

  const value = req.query.q;
  const pageNumber = req.query.page;

  try {
    const redisPosts = await client.keys("Blogs/dataPagin");

    if (redisPosts.length > 0) {
      const cacheBlogs = await client.lRange(
        "Blogs/dataPagin",
        (pageNumber - 1) * perpage,
        (pageNumber - 1) * perpage + 2
      );

      async.map(
        cacheBlogs,
        async function (cacheBlog) {
          let parseData = JSON.parse(cacheBlog);
          let job = { ...parseData };
          return job;
        },
        function (err, searcharticles) {
          if (err) throw err;

          res.status(200).json({ searcharticles });
        }
      );
    } else {
      const searcharticles = await Blog.find({
        $or: [
          { title: { $regex: value, $options: "i" } },
          { tag: { $regex: value, $options: "i" } },
          { Subtitle: { $regex: value, $options: "i" } },
        ],
      })
        .skip((pageNumber - 1) * perpage)
        .limit(perpage)
        .populate("authorId");

      async.map(
        searcharticles,
        async function (searcharticle) {
          await client.lPush("Blogs/dataPagin", JSON.stringify(searcharticle));
          return searcharticles;
        },
        function (err, searcharticles) {
          if (err) throw err;

          res.status(200).json(searcharticles);
        }
      );
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = {
  createPost,
  onearticleget,
  searchpost,
};
