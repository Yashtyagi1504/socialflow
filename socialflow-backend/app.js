// import express from "express";
// import mongoose from "mongoose";

// import "./models/user.js"; // load
// import authRouter from "./routes/auth.js";
const express = require("express");
const mongoose = require("mongoose");

require("./models/user.js"); // load
require("./models/post.js"); // load
require("./models/comment.js"); // load

const authRouter = require("./routes/auth.js");
const postRouter = require("./routes/post.js");
const commentRouter = require("./routes/comment.js");
const userRouter = require("./routes/user.js");

const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000



mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.log(err.message);
})

// Middleware: 
app.use(cors());
app.use(express.json()) 
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);

app.get("/", (req, res) => {
    res.send("Hello world to this insta app, Its a backend app so no output here");
})



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


// Add with other route middleware
app.use("/api/comment", commentRouter);



// Add with other route middleware
app.use("/api/user", userRouter);