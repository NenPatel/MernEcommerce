import express from "express";
import { forgotPassword, getAllOrdersController, getOrdersController, getUsersController, loginController, orderStatusController, registerController, resetPassword, testController, updateProfileController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post("/register",registerController)

router.post("/login",loginController)

router.get("/test",requireSignIn,isAdmin,testController)

router.get("/user-auth",requireSignIn,(req,res) => {
    res.status(200).send({ok:true})
})

router.post("/forgotpassword",forgotPassword)

router.post("/resetpassword/:id/:token",resetPassword)

router.get("/admin-auth",requireSignIn,isAdmin,(req,res) => {
    res.status(200).send({ok:true})
})

router.put("/profile",requireSignIn,updateProfileController)

router.get("/orders",requireSignIn,getOrdersController)

router.get("/users",requireSignIn,isAdmin,getUsersController)

router.get("/all-orders",requireSignIn,getAllOrdersController)

router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController)

export default router;