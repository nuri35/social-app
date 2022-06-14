const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new mongoose.Schema(
  {
    tag: {
      type: String,
      required: true,
    },

    authorId: { type: Schema.Types.ObjectId, required: true, ref: "user" },

    title: {
      type: String,
      required: true,
    },
    Subtitle: {
      type: String,
      required: true,
    },
    content: {
      type: Object,
      required: true,
    },
  },
  { autoCreate: true, collection: "blog", timestamps: true }
);
const blog = mongoose.model("blog", blogSchema);

module.exports = blog;
