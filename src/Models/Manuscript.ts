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
    contributors : [
        {
            fname: String,
            lname: String
        }
    ],
    status : String,
    timestamp : { type : Date, default: Date.now },
    pageCount : Number,
    issue : { type: Schema.Types.ObjectId, ref: 'issue' },
    sortNum : Number,
});

export class IManuscript {
    author : Schema.Types.ObjectId;
    ricode : number;
    title : string;
    contributors : [
        {
            fname : string;
            lname : string;
        }
    ];
    status : string;
    timestamp? : Date;
    pageCount : number;
    issue : Schema.Types.ObjectId;
    sortNum : number;
}

interface IManuscriptModel extends IManuscript, Document {
    // Custom methods go here
}

export const ManuscriptModel : Model<IManuscriptModel> = db.model<IManuscriptModel>('manuscript', ManuscriptSchema);