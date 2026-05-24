import mongoose, { model, models, Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
    },

    details: {
      type: String,
      required: [true, "Product details is required"],
      trim: true,
    },

    colors: {
      type: [String],
      default: [],
    },

    sizes: {
      type: [String],
      default: [],
    },

    discount: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    new_price:{
      type: Number,
    },

    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
      default: 1,
    },

    images: [
      {
        image_url: {
          type: String,
          required: true,
        },

        image_id: {
          type: String,
          required: true,
        },
      },
    ],

    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    views:{
        type:Number,
        default:0
    },
    payment:{
      type:String,
      enum:["cash","advance","delivery"],
      required:true
    }
  },
  {
    timestamps: true,
  }
);

const Product =
  models.Product || model("Product", productSchema);

export default Product;