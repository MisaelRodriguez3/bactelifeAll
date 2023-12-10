import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  Gal_Product: {
    type: Number,
    required: true,
  },
  Oz_Product: {
    type: Number, 
    required: true,
  },
  ml_Product: {
    type: Number,
    required: true,
  },
  Gal_Water: {
    type: Number,
    required: true,
  },
  L_Water: {
    type: Number,
    required: true,
  },
  Acre: {
    type: Number,
    required: true,
  },
  Ha: {
    type: Number,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Product', productSchema);
