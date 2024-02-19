import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import { error } from "./middlewares/error.js";
import userRoutes from "./routes/users.js";
import listingRoutes from "./routes/listing.js";

dotenv.config();
connectDB();
const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.status(200).json({ msg: "Shreyas Estate backend!!" });
});

app.use("/api/user", userRoutes);
app.use("/api/listing", listingRoutes);
app.use(error);

// custom middleware for error
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const msg = err.message || "Internal server error!";

//   return res
//     .status(statusCode)
//     .json({ success: false, message: msg, statusCode: statusCode });
// });
// see in user controller for example how to use this

app.listen(process.env.PORT || 5000, () => {
  //   connect();
  console.log("Server running on PORT: ", process.env.PORT);
});
