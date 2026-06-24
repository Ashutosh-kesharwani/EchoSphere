import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    likedBy: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: [true, "User is required"],
    },

    post: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Post",

      required: [true, "Post is required"],
    },
  },

  {
    timestamps: true,
  }
);

likeSchema.index(
  {
    likedBy: 1,

    post: 1,
  },

  {
    unique: true,
  }
);

/* 
Ash likes Post A

Ash likes Post A

Ash likes Post A


With:
unique: true
Only:
Ash likes Post A
is allowed once.
*/

likeSchema.index({ post: 1 });

likeSchema.index({ likedBy: 1 });
/* 
post

↓

Get total likes on a post



likedBy

↓

Get all posts liked by a user
*/

const Like = mongoose.model("Like", likeSchema);

export default Like;
