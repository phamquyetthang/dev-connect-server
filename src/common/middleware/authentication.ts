import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
//Bắt token
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization deneid." });
  } else {
    try {
      const user = jwt.verify(
        token,
        process.env.JWT_TOKEN_SECRET || "123"
      ) as { id: string };
      if (!req.user) req.user = { id: "" };

      req.user.id = user.id;
      next();
    } catch (error) {
      console.log("🚀 ~ file: authentication.ts ~ line 19 ~ authMiddleware ~ error", error)
      return res.status(401).json({ message: "Token is not valid" });
    }
  }
};

export default authMiddleware;