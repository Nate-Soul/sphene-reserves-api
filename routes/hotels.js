import express from "express";
import { 
    countByTypes,
    countByCities,
    createHotel, deleteHotel, getHotel, getHotels, updateHotel 
} from "../controllers/hotels.controller.js";
import { verifyAdmin } from "../utils/token.js";

const router =  express.Router();

//create new hotel
router.post("/", verifyAdmin, createHotel);

//update hotel
router.put("/:id", verifyAdmin, updateHotel);

//delete hotel
router.delete("/:id", verifyAdmin, deleteHotel);

//get hotel
router.get("/find/:id", getHotel);

//get hotels
router.get("/", getHotels);

//get hotels by city
router.get("/count", countByCities);

//get hotels by type
router.get("/by/type", countByTypes);

export default router;