import mongoose from "mongoose";

const reportSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    summary: String,
    tags: String, // Changed from String to Array of Strings
    content: String,
    userId: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "draft",
      enum: ["draft", "under_review", "published", "archived"],
    },
    view: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

export const Reports = mongoose.model("Report", reportSchema);
