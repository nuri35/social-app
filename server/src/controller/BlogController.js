const Blog = require("./../models/blog_model");
const client = require("./../redis/index");
const { v4: uuidv4 } = require("uuid");
const async = require("async");

const createPost = async (req, res) => {
  const id = req.user.id;
  req.body.authorId = id;
  const cacheKey = `Blog:` + uuidv4();
  try {
    const newblog = new Blog(req.body);

    let saved = await newblog.save();
    const data = JSON.stringify(newblog);
    await client.set(cacheKey, data);
    res.status(200).json({ message: "Successfully published", saved });
  } catch (err) {
    console.log(err);
  }
};

const onearticleget = async (req, res) => {
  try {
    let makaleId = req.params.id;
    const sınglearticle = await Blog.findById({ _id: makaleId }).populate(
      "authorId"
    );

    if (!sınglearticle) {
      res.status(404).json(sınglearticle);
    } else {
      res.json(sınglearticle);
    }
  } catch (err) {
    console.log(err);
  }
};

const searchpost = async (req, res) => {
  let perpage = 3;
  const value = req.query.q;
  const pageNumber = req.query.page;

  try {
    const redisPosts = await client.keys("Blogs/dataPagin");
    if (redisPosts.length > 0) {
      const cacheBlog = await client.lRange("Blogs/dataPagin", 0, -1);
      async.map(
        cacheBlog,
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
          let cacheKey = `Blog:` + uuidv4();

          await client.lPush("Blogs/dataPagin", JSON.stringify(searcharticle));
          return searcharticles;
        },
        function (err, searcharticles) {
          if (err) throw err;

          res.status(200).json({ searcharticles });
        }
      );
    }
  } catch (err) {
    res.status(401).json({ message: "hata durumu oluştu" });
  }
};

module.exports = {
  createPost,
  onearticleget,
  searchpost,
};
