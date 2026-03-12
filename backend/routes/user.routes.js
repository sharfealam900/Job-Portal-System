import express from "express"
import { Login,register,updateProfile,logout } from "../controllers/user.controller.js"
import isAuthenticated from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router=express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(Login);
router.route("/logout").post(logout);
router.route("/update/Profile").post(isAuthenticated, singleUpload,updateProfile);

export default router;