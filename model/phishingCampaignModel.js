const mongoose = require("mongoose");

const phishingCampaignSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    emailSubject: {
      type: String,
      required: true,
      trim: true,
    },

    emailTemplate: {
      type: String,
      required: true, 
    },

    sentTo: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },

        email: {
          type: String,
          required: true,
          lowercase: true,
        },

        opened: {
          type: Boolean,
          default: false,
          index: true,
        },

        openedAt: {
          type: Date,
        },

        emailSent: {
          type: Boolean,
          default: true,
        },

        sentAt: {
          type: Date,
        },
      },
    ],

    status: {
      type: String,
      enum: ["draft", "sent"],
      default: "sent",
    },

    sentAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

phishingCampaignSchema.index({
  vendorId: 1,
  "sentTo.opened": 1,
});

module.exports = mongoose.model("PhishingCampaign", phishingCampaignSchema);
