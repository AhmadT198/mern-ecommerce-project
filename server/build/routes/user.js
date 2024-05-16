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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const errors_1 = require("../errors");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
exports.userRouter = router;
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield user_1.UserModel.findOne({ username });
        if (user) {
            return res.status(400).json({ type: errors_1.UserErrors.USERNAME_ALREADY_EXISTS });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new user_1.UserModel({ username, password: hashedPassword });
        yield newUser.save();
        res.json({ message: "User registered successfully" });
    }
    catch (err) {
        res.status(500).json({ type: JSON.stringify(err) });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield user_1.UserModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ type: errors_1.UserErrors.NO_USER_FOUND });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ type: errors_1.UserErrors.WRONG_CREDENTIALS });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token, userID: user._id });
    }
    catch (err) {
        res.status(500).json({ type: err });
    }
}));
router.get("/available-money/:userID", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.params;
    try {
        const user = yield user_1.UserModel.findById(userID);
        if (!user) {
            return res.status(400).json({ type: errors_1.UserErrors.NO_USER_FOUND });
        }
        res.json({ availableMoney: user.availableMoney });
    }
    catch (err) {
        res.status(500).json({ err });
    }
}));
