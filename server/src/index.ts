import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

import { userRouter } from "./routes/user";
import { productRouter } from "./routes/product";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/product", productRouter);
mongoose.connect(process.env.MONGO_URI);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
