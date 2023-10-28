const express = require("express");
const router = express.Router();

// Require controller modules.
const product_controller = require("../controllers/productController");

/// PRODUCT ROUTES ///

// GET catalog home page.
router.get("/", product_controller.index);

// GET request for getting one Product.
router.get("/one-product", product_controller.get_one_product);
// GET request for list of all Product items.
router.get("/list-products", product_controller.list_products);
// POST request for creating a Product.
router.post("/create-product", product_controller.post_product);
// DELETE request to delete Product.
router.post("/delete-product/:id", product_controller.post_delete_product);
// UPDATE request to update Product.
router.post("/update-product/:id", product_controller.post_update_product);

module.exports = router;
