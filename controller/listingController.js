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

export const getListings = catchAsyncError(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 9;
  const startIndex = parseInt(req.query.startIndex) || 0;
  // let discount = req.query.discount
  let furnished = req.query.furnished;
  let parking = req.query.parking;
  let type = req.query.type;
  const searchTerm = req.query.searchTerm || "";
  const sort = req.query.sort || "createdAt";
  const order = req.query.order || "desc";

  // if (discount === undefined || discount === false) {
  //   discount = undefined
  // }

  if (furnished === undefined || furnished === "false") {
    furnished = { $in: [false, true] };
  }

  if (parking === undefined || parking === "false") {
    parking = { $in: [false, true] };
  }

  if (type === undefined || type === "all") {
    type = { $in: ["Rent", "Sell"] };
  } else {
    type = type?.charAt(0).toUpperCase() + type?.slice(1);
  }

  const listings = await Listing.find({
    name: { $regex: searchTerm, $options: "i" },
    "features.furnished": furnished,
    "features.parking": parking,
    type,
  })
    .sort({ [sort]: order })
    .limit(limit)
    .skip(startIndex);

  if (listings?.length === 0) {
    return next(new ErrorHandler("No Listings!", 404));
  }

  res.status(200).json({ msg: "Listings found.", listings: listings });
});

export const getHomeListing = catchAsyncError(async (req, res, next) => {
  const limit = parseInt(req.query.limit);

  const discountListings = await Listing.find({
    discountPrice: { $gt: 0 },
  }).limit(limit);

  const rentListings = await Listing.find({
    type: "Rent",
  }).limit(limit);

  const sellListings = await Listing.find({
    type: "Sell",
  }).limit(limit);

  if (
    discountListings?.length === 0 &&
    rentListings?.length === 0 &&
    sellListings?.length === 0
  ) {
    return next(new ErrorHandler("No Listings!", 404));
  }

  res.status(200).json({
    msg: "Listings found.",
    listings: { discountListings, rentListings, sellListings },
  });
});

export const getListing = catchAsyncError(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id).populate("user");
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
