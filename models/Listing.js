import mongoose from "mongoose";

const Schema = mongoose.Schema;

const listingSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      default: 0,
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    bathrooms: {
      type: Number,
      required: true,
      default: 1,
    },
    bedrooms: {
      type: Number,
      required: true,
      default: 1,
    },
    type: {
      type: String,
      enum: ["Rent", "Sell"],
      required: true,
    },
    availableFrom: {
      type: String,
      required: true,
    },
    activeStatus: {
      type: Boolean,
      required: true,
      default: true,
    },
    features: {
      hydro: {
        type: Boolean,
        required: true,
      },
      heat: {
        type: Boolean,
        required: true,
      },
      water: {
        type: Boolean,
        required: true,
      },
      internet: {
        type: Boolean,
        required: true,
      },
      petsAllowed: {
        type: Boolean,
        required: true,
      },
      furnished: {
        type: Boolean,
        required: true,
      },
      parking: {
        type: Boolean,
        required: true,
      },
    },
    // offer: {
    //   type: Boolean,
    //   required: true,
    // },
    imageUrls: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
