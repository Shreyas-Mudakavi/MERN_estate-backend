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
    propertyType,
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

  const listing = await Listing.create({
    user: req.userId,
    name: name,
    description: description,
    address: address,
    regularPrice: regularPrice,
    discountPrice: discountPrice,
    price: price,
    bathrooms: bathrooms,
    bedrooms: bedrooms,
    type: propertyType,
    availableFrom: availableFrom,
    features: {
      hydro: hydro,
      heat: heat,
      water: water,
      internet: internet,
      petsAllowed: petsAllowed,
      furnished: furnished,
      parking: parking,
    },
    imageUrls: imageUrls,
  });

  const savedListing = await listing.save();

  res.status(201).json({
    msg: "Listing created!",
    listing: savedListing,
  });
});

export const getAllUserListings = catchAsyncError(async (req, res, next) => {
  const listings = await Listing.find({ user: req.userId });

  if (listings?.length === 0) {
    return next(new ErrorHandler("No Listings!", 404));
  }

  res.status(200).json({ msg: "Listings found.", listings: listings });
});

export const getListing = catchAsyncError(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(new ErrorHandler("Listing not found!", 404));
  }

  res.status(200).json({ msg: "Listing found!", listing: listing });
});

export const updateListing = catchAsyncError(async (req, res, next) => {
  const {
    name,
    description,
    address,
    regularPrice,
    discountPrice,
    price,
    bathrooms,
    bedrooms,
    propertyType,
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

  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(new ErrorHandler("Listing not found!", 404));
  }

  if (req.userId !== listing.user?.toString()) {
    return next(
      new ErrorHandler("You are only allowed to update your listings.", 403)
    );
  }

  const updatedListing = await Listing.findByIdAndUpdate(
    req.params.id,
    {
      name: name,
      description: description,
      address: address,
      regularPrice: regularPrice,
      discountPrice: discountPrice,
      price: price,
      bathrooms: bathrooms,
      bedrooms: bedrooms,
      type: propertyType,
      availableFrom: availableFrom,
      features: {
        hydro: hydro,
        heat: heat,
        water: water,
        internet: internet,
        petsAllowed: petsAllowed,
        furnished: furnished,
        parking: parking,
      },
      imageUrls: imageUrls,
    },
    { new: true, runValidators: true }
  );

  const listings = await Listing.find({ user: req.userId });

  res.status(200).json({ msg: "Listing updated.", listing: listings });
});

export const deleteListing = catchAsyncError(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(new ErrorHandler("No Listing!", 404));
  }

  await Listing.findByIdAndDelete(req.params.id);

  const listings = await Listing.find({ user: req.userId });

  res.status(200).json({ msg: "Listing deleted.", listings: listings });
});
