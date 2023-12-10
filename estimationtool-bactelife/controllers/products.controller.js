import Product from "../models/products.model.js";

export const addProduct = async (req, res) => {
  const {
    Gal_Product,
    Oz_Product,
    ml_Product,
    Gal_Water,
    L_Water,
    Acre,
    Ha,
    Price,
  } = req.body;
  try {
    const newProduct = new Product({
      Gal_Product,
      Oz_Product,
      ml_Product,
      Gal_Water,
      L_Water,
      Acre,
      Ha,
      Price,
    });
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an internal server error" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an internal server error" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "this product does not exist" });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ error: "this product does not exist" });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json("this product does not exist");
    }
    res.json("product deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an internal server error" });
  }
};
