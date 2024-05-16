import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    jwt.verify(authHeader, process.env.JWT_SECRET, (err) => {
      if (err) {
        return res.status(403);
      }

      next();
    });
  } else {
    return res.status(401);
  }
};
