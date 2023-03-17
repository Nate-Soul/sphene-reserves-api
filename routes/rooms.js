import express from "express";
import { 
    createRoom, deleteRoom, getRoom, getRooms, updateRoom
} from "../controllers/rooms.controller.js";
import { verifyAdmin } from "../utils/token.js";

const router = express.Router();

//get rooms
router.get("/", getRooms);

//get room
router.get("/:id", getRoom);

//create room
router.post("/:hotelid", verifyAdmin, createRoom);

//update room
router.put("/:id", verifyAdmin, updateRoom);

//delete room
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

export default router;