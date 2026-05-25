import mongoose, { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
    {
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },

                title: {
                    type: String,
                    required: true,
                },

                image: {
                    type: String,
                    required: true,
                },

                color: {
                    type: String,
                },

                size: {
                    type: String,
                },

                price: {
                    type: Number,
                    required: true,
                },

                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },

                subtotal: {
                    type: Number,
                    required: true,
                },
            },
        ],

        shippingAddress: {
            fullName: {
                type: String,
                required: true,
            },

            phone: {
                type: String,
                required: true,
            },

            address: {
                type: String,
                required: true,
            },

            Division: {
                type: String,
                required: true,
            },

            District: {
                type: String,
            },

            Upazila: {
                type: String,
            },
        },
        paymentInfo: {
            method: {
                type: String,
                enum: ["cash", "bkash", "nagad"],
                default: "cash",
            },
            send_number: {
                type: String,
            },
            transaction_id: {
                type: String,
            },
        },
        orderStatus: {
            type: String,
            enum: [
                "pending",
                "confirmed",
                "processing",
                "shipped",
                "delivered",
                "cancelled",
            ],
            default: "pending",
        },

        totalPrice: {
            type: Number,
            required: true,
        },

        shippingCharge: {
            type: Number,
            default: 0,
        },
        finalAmount: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Order = models.Order || model("Order", OrderSchema);

export default Order;