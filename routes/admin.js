const path = require("path");

const express = require("express");

const adminController = require("../controller/admin");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

// /admin/products => GET
router.get("/products", adminController.getProdutcs);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

module.exports = router;
