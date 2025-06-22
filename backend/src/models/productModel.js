const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true
    },
    slug: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: [true, "Please enter product description"]
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"],
        maxLength: [8, "Price cannot exceed 8 digits"]
    },
    discountPercentage: {
        type: Number,
        required: [true, "Please enter product discount"],
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            type: String, 
            required: true
        }
    ],
    category:{
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: true
    },
    stock:{
        type: Number,
        required: [true, "Please enter product stock"],
        maxLength: [4, "stock cannot exceed 4 characters"],
        default: 1
    },
    numOfReviews:{
        type: Number,
        default: 0
    },
    reviews: [
        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name:{
                type: String, 
                required: true
            },
            rating:{
                type: Number, 
                required: true
            },
            comment:{
                type: String, 
                required: true
            }
        }
    ],

    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Product", productSchema)