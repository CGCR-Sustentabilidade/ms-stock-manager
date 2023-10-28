const Product = require("../models/product");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
});

// Display list of all products.
exports.list_products = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Product list");
});
// Display detail page for a specific product.
exports.get_one_product = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Product detail: ${req.params.id}`);
});
// Handle product create on POST.
exports.post_product = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Product create POST");
});
// Handle product delete on POST.
exports.post_product_delete = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Product delete POST");
});
// Display product update form on POST.
exports.post_update_product = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Product update POST");
});
