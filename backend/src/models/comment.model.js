import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,

      required: [true, "Comment content is required"],

      trim: true,

      minlength: [1, "Comment cannot be empty"],

      maxlength: [300, "Comment can be at most 300 characters"],
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: [true, "Comment owner is required"],
    },

    post: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Post",

      required: [true, "Post is required"],
    },

    likesCount: {
      type: Number,

      default: 0,
    },

    isEdited: {
      type: Boolean,

      default: false,
    },
  },

  {
    timestamps: true,
  }
);

commentSchema.index({ post: 1 });

commentSchema.index({ owner: 1 });

commentSchema.index({ createdAt: -1 });

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;

/* 

post

↓

Fetch all comments of a post quickly



owner

↓

Fetch comments made by a user



createdAt

↓

Newest comments first
*/
