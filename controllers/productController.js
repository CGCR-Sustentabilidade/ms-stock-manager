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
  res.send("NOT IMPLEMENTED: Get Product list");
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
