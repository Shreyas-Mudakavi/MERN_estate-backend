import Listing from "../models/Listing.js";
import catchAsyncError from "../utils/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createListing = catchAsyncError(async (req, res, next) => {
  const {
    name,
    description,
    address,
    regularPrice,
    discountPrice,
    price,
    bathrooms,
    bedrooms,
    type,
    availableFrom,
    furnished,
    parking,
    hydro,
    heat,
    water,
    internet,
    petsAllowed,
    imageUrls,
  } = req.body;

  console.log("create lisitng userId ", req.userId);
  console.log("create lisitng body ", req.body);

  //   const listing = await Listing.create({
  //     user: req.userId,
  //     name: name,
  //     description: description,
  //     address: address,
  //     regularPrice: regularPrice,
  //     discountPrice: discountPrice,
  //     price: price,
  //     bathrooms: bathrooms,
  //     bedrooms: bedrooms,
  //     type: type,
  //     availableFrom: availableFrom,
  //     features: {
  //       hydro: hydro,
  //       heat: heat,
  //       water: water,
  //       internet: internet,
  //       petsAllowed: petsAllowed,
  //       furnished: furnished,
  //       parking: parking,
  //     },
  //     imageUrls: imageUrls,
  //   });

  //   const savedListing = await listing.save();

  res.status(201).json({
    msg: "Listing created!",
    //   listing: savedListing
  });
});
