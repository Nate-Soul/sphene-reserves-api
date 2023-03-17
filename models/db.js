import mongoose from "mongoose";

const port = process.env.PORT || 5000;


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Server connected to database");
    } catch(err) {
        throw err;
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("Database connection distorted");
});