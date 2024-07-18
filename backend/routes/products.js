import express from "express"
import { deleteProduct, getProductDetails, getProducts, newProduct, updateProduct } from "../controllers/productController.js"
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js"

const router = express.Router()


//HTTP requests GET, PUT, POST, DELETE
//endpoint

router.get('/products',  getProducts)
router.post('/admin/product', isAuthenticatedUser, authorizeRoles("admin"), newProduct)
router.delete('/admin/product/:id', isAuthenticatedUser, authorizeRoles("admin"),  deleteProduct)
router.put("/admin/product/:id", isAuthenticatedUser, authorizeRoles("admin"),  updateProduct)
router.get("/products/:id", getProductDetails)

// router.get('/', filanFunksiya)



export default router