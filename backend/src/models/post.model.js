import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,

      trim: true,

      maxlength: [200, "Post content can be at most 200 characters"],

      default: "",
    },

    image: {
      type: String,

      default: "",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: [true, "Post owner is required"],
    },

    likesCount: {
      type: Number,

      default: 0,
    },

    commentsCount: {
      type: Number,

      default: 0,
    },

    hashtags: {
      type: [String],

      default: [],
    },

    visibility: {
      type: String,

      enum: ["public", "followers", "private"],

      default: "public",
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

// Indexes
postSchema.index({ owner: 1 });

postSchema.index({ createdAt: -1 });

postSchema.index({ hashtags: 1 });

const Post = mongoose.model("Post", postSchema);

export default Post;

/* 
owner + createdAt

↓

Fetch posts of a user quickly



hashtags

↓

Search posts by hashtags



createdAt

↓

Infinite scroll / Latest feed
*/
