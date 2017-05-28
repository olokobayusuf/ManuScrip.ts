/*
*   ManuScripts
*   CS 61 - 17S
*/

import { Document, Model, Schema } from 'mongoose';
import { db } from "../db"

// Schema
const UserSchema : Schema = new Schema({
    role : String, // ["author","editor","reviewer"],
    password : String,
    fname : String,
    lname : String,
    address : String,
    email : String,
    affiliation : String,
    ricodes : [Number]
});

// Functional interface
export class IUser {
    role : string;
    password : string;
    fname : string;
    lname : string;
    address : string;
    email : string;
    affiliation : string;
    ricodes : [number]
}

interface IUserModel extends IUser, Document {
    // Custom methods go here
}

// Create the model
export const User : Model<IUserModel> = db.model<IUserModel>("user", UserSchema);