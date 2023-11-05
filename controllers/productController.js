const Product = require("../models/product");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
});

// Display detail page for a specific product.
exports.get_one_product = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Get ONE Product detail: ${req.params.id}`);
});
// Display list of all products.
exports.list_products = asyncHandler(async (req, res, next) => {
  // res.send("NOT IMPLEMENTED: Get Product list");

  const allProducts = await Product.find({}, "brand created_at description expiration_date quantity status title type updated_at")
  .sort({ title: 1 })
  .exec();

  res.send("product_list", { title: "Product List", product_list: allProducts });
});
// Handle product create on POST.
exports.post_product = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Create one Product POST");
});
// Handle product delete on POST.
exports.post_delete_product = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Delete one Product POST");
});
// Display product update form on POST.
exports.post_update_product = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Update one Product POST");
});
