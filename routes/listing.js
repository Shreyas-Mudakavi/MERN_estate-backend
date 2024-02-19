import express from "express";

import { createListing } from "../controller/listingController.js";

import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create-listing", createListing);

export default router;
