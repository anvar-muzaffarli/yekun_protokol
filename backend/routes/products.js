import express from "express";
import { deleteProduct, getProductDetails, getProducts, newProduct, updateProduct } from "../controllers/productController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";
import { upload } from "../config/cloudinaryConfig.js";

const router = express.Router();

// HTTP requests GET, PUT, POST, DELETE
// Endpoint

router.get('/products', isAuthenticatedUser, getProducts);
router.post('/admin/product', isAuthenticatedUser, authorizeRoles("admin"), upload.array("images", 5), newProduct);
router.delete('/admin/product/:id', isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
router.put("/admin/product/:id", isAuthenticatedUser, authorizeRoles("admin"), upload.array("images", 5), updateProduct);
router.get("/products/:id", isAuthenticatedUser, getProductDetails);

export default router;
