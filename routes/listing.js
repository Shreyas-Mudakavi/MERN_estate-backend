import express from "express";

import { createListing } from "../controller/listingController.js";

import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create-listing", auth, createListing);

export default router;
