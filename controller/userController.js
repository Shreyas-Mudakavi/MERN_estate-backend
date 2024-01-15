import User from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../utils/catchAsyncError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = catchAsyncError(async (req, res, next) => {
  const { username, email, password } = req.body;

  const usernameCheck = await User.findOne({ username: username });
  if (usernameCheck) {
    return next(new ErrorHandler("Please use a different username!", 409));
  }

  const emailCheck = await User.findOne({ email: email });
  if (emailCheck) {
    return next(new ErrorHandler("Email already exists!", 409));
  }

  if (password.length < 6) {
    return next(
      new ErrorHandler("Password should be atlest 6 characters long!", 422)
    );
  }

  const salt = await bcrypt.genSaltSync(10);
  const hashedPwd = await bcrypt.hashSync(password, salt);

  const user = await User.create({
    username: username,
    email: email,
    password: hashedPwd,
  });

  await user.save();

  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "2d",
  });

  res
    .status(201)
    .json({ msg: "Registration successful!", user: user, token: token });

  // example for the custom error handler in index.js
  // when using try catch we can just pass the error from catch like this: next(error).
  // it will then send the error in a more formatted way.
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    return next(new ErrorHandler("Invalid email or password!", 404));
  }

  const isPasswordValid = await bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return next(new ErrorHandler("Invalid email or password!", 404));
  }

  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "2d",
  });

  res
    .cookie("access_token", token, { httpOnly: true })
    .status(201)
    .json({ msg: "Welcome back!", user: user, token: token });
});
