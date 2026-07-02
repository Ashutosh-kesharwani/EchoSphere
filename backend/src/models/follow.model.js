import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: [true, "Follower is required"],
    },

    following: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: [true, "Following user is required"],
    },

    status: {
      type: String,

      enum: ["pending", "accepted", "blocked"],

      default: "accepted",
    },
  },

  {
    timestamps: true,
  }
);

followSchema.index(
  {
    follower: 1,

    following: 1,
  },

  {
    unique: true,
  }
);

followSchema.index({ follower: 1 });

followSchema.index({ following: 1 });

/* 
follower

↓

Get whom Ash follows



following

↓

Get followers of John

Meaning

Suppose:

Ash follows John

Document:

{

follower : Ash._id,

following : John._id,

status : "accepted"

}
Supported Features

✅ Follow User
✅ Unfollow User
✅ Follow Request
✅ Accept Request
✅ Reject Request
✅ Private Account Support
✅ Followers List
✅ Following List
✅ Followers Count
✅ Following Count

Relationship
users.id

|

|----< follows.follower



users.id

|

|----< follows.following

This schema is scalable and is the standard way to model followers/following relationships in a social media application like EchoSphere.
*/

const Follow = mongoose.model("Follow", followSchema);

export default Follow;
