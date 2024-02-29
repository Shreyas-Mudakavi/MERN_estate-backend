import express from "express";

import {
  createListing,
  deleteListing,
  getAllUserListings,
  getListing,
  getListings,
  updateListing,
} from "../controller/listingController.js";

import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create-listing", auth, createListing);

router.get("/getAll-listings", auth, getAllUserListings);

router.get("/get-listing/:id", auth, getListing);

router.delete("/delete-listing/:id", auth, deleteListing);

router.put("/update-listing/:id", auth, updateListing);

router.get("/get", getListings);

export default router;
