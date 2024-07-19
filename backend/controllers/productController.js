import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Product from "../models/Product.js";
import ErrorHandler from "../utils/errorHandler.js";

// Get all products => /api/v1/products
export const getProducts = catchAsyncErrors(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    products,
  });
});

// Create new product => /api/v1/admin/products
export const newProduct = catchAsyncErrors(async (req, res) => {
  const { name, price, description, category, seller, stock } = req.body;

  let images = [];
  if (req.files) {
    images = req.files.map(file => ({
      public_id: file.filename,
      url: file.path
    }));
  }

  const product = await Product.create({
    name,
    price,
    description,
    category,
    seller,
    stock,
    images,
  });

  res.status(201).json({
    success: true,
    product,
  });
});

// Get single product details => /api/v1/products/:id
export const getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Mehsul bazada tapilmadi", 404));
  }

  res.status(200).json({
    product,
  });
});

// Update product details => /api/v1/admin/product/:id
export const updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Mehsul bazada tapilmadi ve ya link bozukdur", 404));
  }

  const { name, price, description, category, seller, stock } = req.body;

  let images = product.images;
  if (req.files && req.files.length > 0) {
    images = req.files.map(file => ({
      public_id: file.filename,
      url: file.path
    }));
  }

  product.name = name;
  product.price = price;
  product.description = description;
  product.category = category;
  product.seller = seller;
  product.stock = stock;
  product.images = images;

  await product.save();

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete product => /api/v1/admin/product/:id
export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Indiki mehsulu silmek mumkun deyil", 404));
  }

  await product.deleteOne();

  res.status(200).json({
    message: "Product Deleted",
  });
});
