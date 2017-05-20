/*
*   ManuScripts
*   CS 61 - 17S
*/

import { Document, model, Model, Schema } from 'mongoose';
import { UserSchema } from "./Schemas";

export interface IUser {
    role: String,
    password: String,
    fname: String,
    lname: String,
    address: String,
    email: String,
    affiliation: String,
    ricodes: [Number]
}

export interface IUserModel extends IUser, Document { // INCOMPLETE
    // Add methods
    doStuff () : void;
}

export const User : Model<IUserModel> = model<IUserModel>("User", UserSchema);