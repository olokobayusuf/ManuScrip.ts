/*
*   ManuScripts
*   CS 61 - 17S
*/

import { Document, Model, Schema } from 'mongoose';
import { db } from "../db"


const ManuscriptSchema : Schema = new Schema({
    author : { type: Schema.Types.ObjectId, ref: 'user' },
    ricode : Number,
    title : String,
    contributors : [String],
    status : { type: Number, default: 0 },
    timestamp : { type : Date, default: Date.now },
    pageCount : Number,
    issue : { type: Schema.Types.ObjectId, ref: 'issue' },
});

export interface IManuscript {
    author : Schema.Types.ObjectId;
    ricode : number;
    title : string;
    contributors : [string];
    status? : number; // ["submitted", "underreview", "accepted", "rejected", "typeset", "scheduled", "published"]
    timestamp? : Date;
    pageCount? : number;
    issue? : Schema.Types.ObjectId;
}

interface IManuscriptModel extends IManuscript, Document {
    // Custom methods go here
}

export const Manuscript : Model<IManuscriptModel> = db.model<IManuscriptModel>('manuscript', ManuscriptSchema);