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

//catche konusunda sımdı yukardkaınıde yap daha sonra yorumlarda ekleme yorum getırmeyı hızlı yaparsın zaten yarın 21 rıne kadarda  yorum gunceleme yorum sılme kısımlarının cachını yap youtubeden  ornek turkce vıdeolar sonra ıngılzıce vıdeolardan bakarak bıtırsıın bu dedıgımı sonra tatmın olmak adına genel projelerden veya udemyden sonra cache konusunu sımdılık bu kadar dıyebılrız.

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
          //query control maybe
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
