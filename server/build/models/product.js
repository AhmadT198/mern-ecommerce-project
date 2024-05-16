"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    productName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
    price: {
        type: Number,
        required: true,
        min: [1, "Price must be at least 1"],
    },
    description: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
    stockQuantity: {
        type: Number,
        required: true,
        min: [0, "Stock quantity must be at least 0"],
    },
});
exports.ProductModel = (0, mongoose_1.model)("Product", ProductSchema);
