const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    postId: { type: Schema.Types.ObjectId, ref: "blog" },
    commentId: { type: Schema.Types.ObjectId, ref: "comments" },
  },
  {
    timestamps: true,
    autoCreate: true,
    collection: "likes",
  }
);

const like = mongoose.model("likes", LikeSchema);

module.exports = like;
