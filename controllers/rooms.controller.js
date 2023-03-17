import hotelsModel from "../models/hotels.model.js";
import roomsModel from "../models/rooms.model.js";

export const createRoom = async (req, res, next) => {

    const hotelID = req.params.hotelid;
    const newRoom = new roomsModel(req.body);

    try{
        const savedRoom = await newRoom.save();
        try{
            await hotelsModel.findByIdAndUpdate(hotelID, {$push: {rooms: savedRoom._id}});
        } catch(err) {
            next(err);
        }
        res.status(200).json({msg: "Room saved successfully", savedRoom});
    } catch(err) {
        next(err);
    }
}

export const updateRoom = async (req, res, next) => {
    try{
        const updatedRoom = await roomsModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedRoom);
    } catch(err) {
        next(err);
    }
}

export const deleteRoom = async (req, res, next) => {
    const hotelID = req.params.hotelid;
    const roomID  = req.params.id;
    try{ 
        await roomsModel.findByIdAndDelete(roomID);
        try{
            await hotelsModel.findByIdAndUpdate(hotelID, {$pull: {rooms: roomID}});
        } catch(err) {
            next(err); 
        }
        res.status(200).json({msg: "room deleted"});
    } catch(err) {
        next(err);
    }
}

export const getRoom = async (req, res, next) => {
    try{
        const room = await roomsModel.findById(req.params.id);
        res.status(200).json(room._doc);
    } catch(err) {
        next(err);
    }
}

export const getRooms = async (req, res, next) => {
    try{
        const rooms = await roomsModel.find();
        res.status(200).json(rooms);
    } catch(err) {
        next(err);
    }
}