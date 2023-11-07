const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { DateTime } = require("luxon");

exports.index = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
});

// Display detail for a specific product.
exports.get_one_product = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).exec();

  if (product === null) {
    const err = new Error("Product not found");
    err.status = 404;
    return next(err);
  }

  return res.status(200).json(product)
});

// Display list of all products.
exports.list_products = asyncHandler(async (req, res, next) => {
  const allProducts = await Product.find({}, "brand created_at description expiration_date name quantity status type updated_at")
    .sort({ name: 1 })
    .exec();

  return res.status(200).json(allProducts)
});

// Handle product create on POST.
exports.post_product = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name can't be empty.")
    .isAlpha()
    .withMessage("Name must be alphabet letters."),

  asyncHandler(async (req, res, next) => {

    const errors = validationResult(req);
    const product = new Product({
      brand: req.body.product.brand,
      created_at: req.body.product.created_at,
      description: req.body.product.description,
      expiration_date: req.body.product.expiration_date,
      name: req.body.product.name,
      quantity: req.body.product.quantity,
      status: req.body.product.status,
      type: req.body.product.type,
      updated_at: req.body.product.updated_at
    });

    // Handle empty date values
    if (product != null) {
      if (!product.created_at)
        product.created_at = DateTime.now()
      if (!product.expiration_date)
        product.expiration_date = DateTime.now()
      if (!product.updated_at)
        product.updated_at = DateTime.now()
    }

    if (errors.isEmpty()) {
      const err = new Error("Invalid Product fields!");
      err.status = 400;
      return next(err);
    } else {
      const productExists = await Product.findOne({ name: req.body.product.name }).exec();
      if (productExists) {
        const err = new Error("Product already exists!");
        err.status = 400;
        return next(err);
      } else {
        await product.save();
        res.status(200).json(product)
      }
    }
  }),
];

// Handle product delete on POST.
exports.post_delete_product = asyncHandler(async (req, res, next) => {

  const product = await Product.findById(req.params.id).exec();

  if (product === null) {
    const err = new Error("Product doesn't exists.");
    err.status = 404;
    return next(err);
  }

  await Product.findByIdAndRemove(req.body.product._id);
  res.status(204).send(body)
});

// Handle product update on POST.
exports.post_update_product = [
  (req, res, next) => {
    if (!(req.body.product instanceof Array)) {
      if (typeof req.body.product === "undefined") {
        req.body.product = [];
      } else {
        req.body.product = new Array(req.body.product);
      }
    }
    next();
  },

  // Validate and sanitize fields.
  body("name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Product object with escaped/trimmed data and old id.
    const product = new Product({
      brand: req.body.product.brand,
      created_at: req.body.product.created_at,
      description: req.body.product.description,
      expiration_date: req.body.product.expiration_date,
      name: req.body.product.name,
      quantity: req.body.product.quantity,
      status: req.body.product.status,
      type: req.body.product.type,
      updated_at: req.body.product.updated_at,
      _id: req.params.product.id // This is required, or a new ID will be assigned!
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      const err = new Error("Invalid Product fields to update!");
      err.status = 400;
      return next(err);
    } else {
      // Data from form is valid. Update the item.
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, product, {});

      var body = ({ title: "Product", updatedProduct: updatedProduct });
      res.status(201).send(body)
    }
  }),
];
