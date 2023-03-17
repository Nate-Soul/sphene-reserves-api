import express from "express";
import { 
    deleteUser, getUser, getUsers, updateUser 
} from "../controllers/users.controller.js";
import { verifyToken, verifyAdmin, verifyUser } from "../utils/token.js";

const router = express.Router();

// check authentication
// router.get("/checkauth", verifyToken, (req, res, next) => {
//     res.send("you're now logged in");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("you're now logged in and can manage this account");
//     console.log(req.user.isAdmin);
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("you're now logged in and can manage all accounts");
// });

//get all users
router.get("/", verifyAdmin, getUsers);

//get user
router.get("/:id", verifyUser, getUser);

//update user
router.put("/:id", verifyUser, updateUser);

//delete user
router.delete("/:id", verifyUser, deleteUser);

export default router;