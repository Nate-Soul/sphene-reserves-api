import { createError } from "./error.js";
import jwt from "jsonwebtoken"


export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401, "You are not authenticated!"));
    }  else {
        jwt.verify(token, process.env.SECRET_KEY, (err, authData) => {
            if (err) return next(createError(403, "invalid token!"));
            req.user = authData;
            next();
        });
    }
}


export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.params.id === req.user.id || req.user.isAdmin){ 
            next();
        } else {
            return next(createError(403, "You are not authorized"));
        }
    });
}


export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.isAdmin){
            next();
        } else {
            return next(createError(403, "You are not authorized"));
        }
    });
}