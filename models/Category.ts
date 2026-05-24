import mongoose, { Schema, model, models } from "mongoose";
import { unique } from "next/dist/build/utils";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique:true
    },

    description: {
      type: String,
      required: [true, "Category description is required"],
      trim: true,
    },

    image: {
      type: String,
      required: [true, "Category image is required"],
    },
    image_id:{
      type:String,
    }
  },
  {
    timestamps: true,
  }
);

const Category =
  models.Category || model("Category", categorySchema);

export default Category;