import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";
import router from "./router/router.js";
const io = new Server(server);
import path from "path";

// user middleware
app.use(express.json());
app.use(cors());

// api routes
app.use("/api", router);

// mongodb connection
const db = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
};

db()
    .then(() => {
        console.log("mongodb connected");
    })
    .catch((err) => {
        console.log(err);
    });

app.use(express.static(path.resolve("./client/build")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve("./client/build", "index.html"));
});

// localhost server
const port = process.env.PORT || 5001;
server.listen(port, () => {
    console.log("Server is running on port: " + port);
});
