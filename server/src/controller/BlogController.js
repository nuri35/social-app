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
  const blogList = [];
  try {
    const redisPosts = await client.keys("Blog*");
    if (redisPosts.length > 0) {
      redisPosts.map(async (val) => {
        const cacheBlog = await client.get(val);
        blogList.push(JSON.parse(cacheBlog));
      });
      //burda akıp gıdıyor yarın sabah halledersın
      res.status(200).json({ searcharticles: blogList });
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

      searcharticles.map(async (val) => {
        let cacheKey = `Blog:` + uuidv4();

        await client.set(cacheKey, JSON.stringify(val));
      });

      res.status(200).json({ searcharticles });
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
