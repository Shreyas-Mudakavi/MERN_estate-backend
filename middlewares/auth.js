import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";

export const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return next(
        new ErrorHandler(
          "Unauthorized.Please Send token in request header",
          401
        )
      );
    }

    const { userId } = await jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY
    );

    console.log("auth id ", userId);

    req.userId = userId;

    next();
  } catch (error) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
};
