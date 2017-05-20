/*
*   ManuScripts
*   CS 61 - 17S
*/

import { Schema } from "mongoose";

export const UserSchema : Schema = new Schema({
    role : String, //["author","editor","reviewer"],
    password : String,
    fname : String,
    lname : String,
    address : String,
    email : String,
    affiliation : String,
    ricodes : [Number]
});
