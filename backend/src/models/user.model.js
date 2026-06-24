import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,

      required: [true, "First name is required"],

      trim: true,

      lowercase: true,

      minlength: [2, "First name must be at least 2 characters"],

      maxlength: [50, "First name can be at most 50 characters"],
    },

    lastName: {
      type: String,

      trim: true,

      lowercase: true,

      maxlength: [50, "Last name can be at most 50 characters"],

      default: "",
    },

    username: {
      type: String,

      required: [true, "Username is required"],

      unique: true,

      trim: true,

      lowercase: true,

      minlength: [3, "Username must be at least 3 characters"],

      maxlength: [30, "Username can be at most 30 characters"],
    },

    email: {
      type: String,

      required: [true, "Email is required"],

      unique: true,

      trim: true,

      lowercase: true,

      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,

        "Please enter a valid email",
      ],
    },

    password: {
      type: String,

      required: [true, "Password is required"],

      minlength: [8, "Password must be at least 8 characters"],

      maxlength: [100, "Password is too long"],
    },

    avatar: {
      type: String,

      required: [true, "Avatar is required"],
    },

    coverImage: {
      type: String,

      default: "",
    },

    bio: {
      type: String,

      trim: true,

      maxlength: [250, "Bio can be at most 250 characters"],

      default: "",
    },

    website: {
      type: String,

      trim: true,

      maxlength: [200, "Website URL is too long"],

      default: "",
    },

    location: {
      type: String,

      trim: true,

      maxlength: [100, "Location is too long"],

      default: "",
    },

    dob: {
      type: Date,
    },

    phoneNumber: {
      type: String,

      match: [/^[0-9]{10}$/, "Invalid phone number"],
    },

    whatsappNumber: {
      type: String,

      match: [/^[0-9]{10}$/, "Invalid WhatsApp number"],
    },

    followersCount: {
      type: Number,

      default: 0,
    },

    followingCount: {
      type: Number,

      default: 0,
    },

    postCount: {
      type: Number,

      default: 0,
    },

    isVerified: {
      type: Boolean,

      default: false,
    },

    isPrivate: {
      type: Boolean,

      default: false,
    },

    isOnline: {
      type: Boolean,

      default: false,
    },

    lastSeen: {
      type: Date,

      default: null,
    },

    refreshToken: {
      type: String,

      default: null,
    },
  },

  {
    timestamps: true,

    toJSON: {
      virtuals: true,
    },

    toObject: {
      virtuals: true,
    },
  }
);

// Virtuals Properties
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.virtual("age").get(function () {
  if (!this.dob) return null;

  return new Date().getFullYear() - this.dob.getFullYear();
});

// Model
const User = mongoose.model("User", userSchema);

export default User;

/* 
userSchema.pre("save")        -> Hash Password

userSchema.methods.comparePassword()

userSchema.methods.generateAccessToken()

userSchema.methods.generateRefreshToken()
*/
