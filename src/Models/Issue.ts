/*
*   ManuScripts
*   CS 61 - 17S
*/

import { Document, Model, Schema } from 'mongoose';
import { db } from "../db"

// Schema
const IssueSchema : Schema = new Schema({
    year: Number,
    period: Number,
    published: Boolean,
    publishDate: Date
});

// Functional interface
export class IIssue {
    year : number;
    period : number;
    published : boolean;
    publishedDate : Date;
}

interface IIssueModel extends IIssue, Document {
    // Custom methods go here
}

// Create the model
export const Issue : Model<IIssueModel> = db.model<IIssueModel>('issue', IssueSchema);