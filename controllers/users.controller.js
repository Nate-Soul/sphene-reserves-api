import usersModel from "../models/users.model.js";


export const updateUser = async (req, res, next) => { 
    try {
        const updatedUser = await usersModel.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new: true}
        );
        res.status(200).json(updatedUser); 
    } catch(err) {
        next(err);
    }
}

export const deleteUser = async (req, res, next) => {
    try{
        await usersModel.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json({msg: "User deleted!"});
    } catch(err) {
        next(err);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await usersModel.findById(req.params.id);
        res.status(200).json(user); 
    } catch(err) {
        next(err);
    }
}

export const getUsers = async (req, res, next) => {
    try {
        const users = await usersModel.find();
        res.status(200).json(users);
    } catch(err) {
        next(err);
    }
}