import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/hello", (req, res) => {
    res.json(req.body);
});

//new user
router.post("/register", register);
router.post("/login", login);

export default router;