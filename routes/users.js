import express from "express";
import {
  getUser,
  google,
  login,
  register,
} from "../controller/userController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/google", google);

router.get("/get-user/:id", auth, getUser);

export default router;
