import express from "express";
import {
  deleteUser,
  getUser,
  google,
  login,
  register,
  updateUser,
} from "../controller/userController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/google", google);

router.get("/get-user/:id", auth, getUser);

router.put("/update-user/:id", auth, updateUser);

router.delete("/delete-user/:id", auth, deleteUser);

export default router;
