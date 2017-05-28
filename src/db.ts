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
    .connect("mongodb://Team09:jfDxyqz9RmU1RkFg@cluster0-shard-00-00-ppp7l.mongodb.net:27017,cluster0-shard-00-01-ppp7l.mongodb.net:27017,cluster0-shard-00-02-ppp7l.mongodb.net:27017/Team09DB?replicaSet=Cluster0-shard-0&ssl=true&authSource=admin")
    .connection
    .on("error", console.error.bind(console, "DB: Connection error"))
    .once("open", () =>  console.log("DB: Connection with database succeeded"));