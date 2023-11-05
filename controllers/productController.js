const Product = require("../models/product");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
});

// Display detail page for a specific product.
exports.get_one_product = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Get ONE Product detail: ${req.params.id}`);
});

// Display detail page for a specific product.
exports.get_one_product = asyncHandler(async (req, res, next) => {
  const [product, propertiesInProduct] = await Promise.all([
    Product.findById(req.params.id).exec(),
    Product.find({ product: req.params.id }, "brand created_at description expiration_date quantity status title type updated_at").exec(),
  ]);
  if (product === null) {
    const err = new Error("Product not found");
    err.status = 400;
    return next(err);
  }

  var body = ({ title: "Product", product: product,  properties_in_product: propertiesInProduct });
  res.status(200).send(body)
});

// Display list of all products.
exports.list_products = asyncHandler(async (req, res, next) => {
// res.send("NOT IMPLEMENTED: Get Product list");

  const allProducts = await Product.find({}, "brand created_at description expiration_date quantity status title type updated_at")
  .sort({ title: 1 })
  .exec();

  var body = ("product_list", { title: "Product List", product_list: allProducts });
  res.status(200).send(body)
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
