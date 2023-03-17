import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./models/db.js";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";
dotenv.config();

const app  = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Welcome to Sphene reserves API");
});


//middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);

app.use((err, req, res, next) => {
    const errorStatus  = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        message: errorMessage,
        status: errorStatus,
        stack: err.stack
    }); 
});

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
});