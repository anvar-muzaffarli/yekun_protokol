import express from "express"
import { register, loginUser, logoutUser, forgetPassword, resetPassword, getUserProfile, updatePassword } from "../controllers/authController.js"
import { isAuthenticatedUser } from "../middleware/auth.js"
const router = express.Router()

// router
router.post("/register", register)
router.post("/login", loginUser)

router.get('/logout', logoutUser)

router.post("/password/forget", forgetPassword)
router.put("/password/reset/:token", resetPassword)


// bura daha sonra qayit (22 Iyun)
router.get("/me", isAuthenticatedUser,getUserProfile)
router.put("/password/update", isAuthenticatedUser, updatePassword)




export default router