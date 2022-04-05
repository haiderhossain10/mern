import express from "express";
import { register, login } from "../controller/authController.js";
import { jwt, verify } from "../controller/pageController.js";
import jwtMiddleware from "../middleware/jwtMiddleware.js";
import { loginValidator, regValidator } from "../validator/validator.js";
const router = express.Router();

// register & login routes
router.post("/register", regValidator, register);
router.post("/login", loginValidator, login);
router.get("/verify", verify);
router.post("/jwt", jwtMiddleware, jwt);

export default router;
