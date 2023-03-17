import hotelsModel from "../models/hotels.model.js";

export const createHotel = async (req, res, next) => {
    const newHotel = new hotelsModel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch(err) {
        next(err);
    }
}

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await hotelsModel.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new: true}
        );
        res.status(200).json(updatedHotel); 
    } catch(err) {
        next(err);
    }
}

export const deleteHotel = async (req, res, next) => {
    try{
        await hotelsModel.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json({msg: "Hotel deleted!"});
    } catch(err) {
        next(err);
    }
}

export const getHotel = async (req, res, next) => {
    try {
        const hotel = await hotelsModel.findById(req.params.id);
        res.status(200).json(hotel); 
    } catch(err) {
        next(err);
    }
}

export const getHotels = async (req, res, next) => {
    try {
        const hotels = await hotelsModel.find();
        res.status(200).json(hotels);
    } catch(err) {
        next(err);
    }
}

export const countByCities = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(cities.map(city=>{
            return hotelsModel.countDocuments({city});
        }));
        res.status(200).json(list);
    } catch(err) {
        next(err);
    }

}
export const countByTypes = async (req, res, next) => {
    try{
    const hotelCount    = await hotelsModel.countDocuments({type: "hotel"});
    const motelCount    = await hotelsModel.countDocuments({type: "motel"});
    const brothelCount  = await hotelsModel.countDocuments({type: "brothel"});
    const resortCount   = await hotelsModel.countDocuments({type: "resort"});
    res.status(200).json([
        {type: "hotels", count: hotelCount},
        {type: "motels", count: motelCount},
        {type: "brothels", count: brothelCount},
        {type: "resorts", count: resortCount},
    ]);
    } catch(err) {
        next(err);
    }
}
