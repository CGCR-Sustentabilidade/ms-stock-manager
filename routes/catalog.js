const express = require("express");
const router = express.Router();

// Require controller modules.
const product_controller = require("../controllers/productController");

/// PRODUCT ROUTES ///

// GET catalog home page.
router.get("/", product_controller.index);

// GET request for creating a Product. NOTE This must come before routes that display Product (uses id).
router.get("/one-product", product_controller.get_one_product);
// GET request for list of all Product items.
router.get("/list-products", product_controller.list_products);
// POST request for creating Product.
router.post("/product", product_controller.post_product);
// DELETE request to delete Product.
router.post("/product/:id/delete", product_controller.post_product_delete);
// UPDATE request to update Product.
router.post("/product/:id/update", product_controller.post_update_product);

module.exports = router;
