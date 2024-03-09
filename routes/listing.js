import express from "express";

import {
  createListing,
  deleteListing,
  getAllUserListings,
  getHomeListing,
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

router.get("/getSearch", getListings);

router.get("/getHomeListing", getHomeListing);

export default router;
