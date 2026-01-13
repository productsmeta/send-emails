const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email required"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },

    whatsapp: {
      type: String,
      required: [true, "Whatsapp number is required"],
      trim: true,
    },
    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    portfolioLinks: {
      type: [String],
    },
    joiningDate: {
      type: Date,
      default: Date.now,
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },

    status: {
      type: String,
      required: [true, "status is required"],
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
    role: {
      type: String,
      default: 'USER',
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
