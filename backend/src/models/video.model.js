import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema(
  {
    videoFile: {
      type: String, // cloudinary url
      required: [true, "Video is Required"],
    },
    thumbnail: {
      type: String, // cloudinary url
      required: [true, "Thumbnail is Required"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Title is Required"],
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    duration: {
      type: Number, // cloudinary se as cloudinary file upload ke baad kaafi info bhejta hai
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// we use aggregate paginate as a plugin in our schema
videoSchema.plugin(mongooseAggregatePaginate);

const Video = mongoose.model("Video", videoSchema);
export default Video;
