/*
*   ManuScripts
*   CS 61 - 17S
*/

import mongoose = require("mongoose");
import { Promise } from "q";

// Use q promises
mongoose.Promise = global.Promise = Promise;
// Create the db connection
export const db : mongoose.Connection = mongoose
    .connect('mongodb://localhost:27017/manuscripts')
    .connection
    .on("error", console.error.bind(console, "DB: Connection error"))
    .once("open", () =>  console.log("DB: Connection with database succeeded"));