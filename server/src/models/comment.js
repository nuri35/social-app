const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    writer: { type: Schema.Types.ObjectId, ref: "user" },
    postId: { type: Schema.Types.ObjectId, ref: "blog" },
    content: { type: String, required: true, trim: true },
    responseTo: { type: Schema.Types.ObjectId, ref: "comments" },
  },
  {
    timestamps: true,
    autoCreate: true,
    collection: "comments",
  }
);

const Comment = mongoose.model("comments", CommentSchema);

module.exports = Comment;
