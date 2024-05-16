"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const product_1 = require("../models/product");
const auth_1 = require("../middleware/auth");
const user_1 = require("../models/user");
const errors_1 = require("../errors");
const router = (0, express_1.Router)();
exports.productRouter = router;
router.get("/", auth_1.verifyToken, (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.ProductModel.find();
        res.json({ products });
    }
    catch (err) {
        res.status(500).json({ err });
    }
}));
router.post("/checkout", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerID, cartItems } = req.body;
    try {
        const user = yield user_1.UserModel.findById(customerID);
        const productIDs = Object.keys(cartItems);
        const products = yield product_1.ProductModel.find({
            _id: {
                $in: productIDs,
            },
        });
        if (!user)
            return res.status(400).json({ type: errors_1.UserErrors.NO_USER_FOUND });
        if (products.length !== productIDs.length) {
            return res.status(400).json({ type: errors_1.ProductErrors.NO_PRODUCT_FOUND });
        }
        let totalPrice = 0;
        for (const item in cartItems) {
            const product = products.find((product) => String(product._id) === item);
            if (!product) {
                return res.status(400).json({ type: errors_1.ProductErrors.NO_PRODUCT_FOUND });
            }
            if (product.stockQuantity < cartItems[item]) {
                return res.status(400).json({ type: errors_1.ProductErrors.NOT_ENOUGH_STOCK });
            }
            totalPrice += product.price * cartItems[item];
            if (user.availableMoney < totalPrice) {
                return res.status(400).json({ type: errors_1.ProductErrors.NOT_ENOUGH_MONEY });
            }
        }
        //Need a transaction here?
        user.availableMoney -= totalPrice;
        user.purchasedItems.push(...productIDs);
        yield user.save();
        for (const [productID, quantity] of Object.entries(cartItems)) {
            yield product_1.ProductModel.updateOne({ _id: productID }, { $inc: { stockQuantity: -quantity } });
        }
        //Logic to mark the product as out of stock?
        res.json({ purchasedItems: user.purchasedItems });
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
router.get("/purchased-items/:customerID", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerID } = req.params;
    try {
        const user = yield user_1.UserModel.findById(customerID);
        if (!user) {
            return res.status(400).json({ type: errors_1.UserErrors.NO_USER_FOUND });
        }
        const products = yield product_1.ProductModel.find({
            _id: { $in: user.purchasedItems },
        });
        res.json({ purchasedItems: products });
    }
    catch (err) {
        res.status(500).json({ err });
    }
}));
