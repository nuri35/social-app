const Blog = require("./../models/blog_model");

const createPost = async (req, res) => {
  try {
    const id = req.user.id;

    req.body.authorId = id;

    const newblog = new Blog(req.body);

    let saved = await newblog.save();
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

  try {
    const value = req.query.q;
    const pageNumber = req.query.page;

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

    res.status(200).json({ searcharticles });
  } catch (err) {
    console.log(err + "hata var ");

    res.status(401).json({ message: "hata durumu oluştu" });
  }
};

module.exports = {
  createPost,
  onearticleget,
  searchpost,
};
