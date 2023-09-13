import express from "express";
import { createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFiltersController, productListController, productPaymentController, productPhotoController, relatedProductController, searchProductController, updateProductController } from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable"

const router = express.Router()

router.post("/create-product",requireSignIn,isAdmin,formidable(),createProductController)

router.get("/get-product",getProductController)

router.put("/update-product/:pid",requireSignIn,isAdmin,formidable(),updateProductController)

router.get("/get-product/:slug",getSingleProductController)

// router.get("/get-productinfo/:slug",getSingleProductInfoController)

router.get("/product-photo/:pid",productPhotoController)

router.delete("/delete-product/:pid",deleteProductController)

router.post("/product-filters",productFiltersController)

router.get("/product-count",productCountController)

router.get("/product-list/:page",productListController)

router.get("/search/:keyword",searchProductController)

router.get("/related-product/:pid/:cid",relatedProductController)

router.get("/product-category/:slug",productCategoryController)

router.post("/product-payment",requireSignIn,productPaymentController)

export default router