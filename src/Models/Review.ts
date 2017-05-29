/*
*   ManuScripts
*   CS 61 - 17S
*/

import { Document, Model, Schema } from 'mongoose';
import { db } from "../db"

const ReviewSchema : Schema = new Schema({
	manuscript : { type: Schema.Types.ObjectId, ref: 'manuscript' },
	reviewer : { type: Schema.Types.ObjectId, ref: 'user' },
	dateSent : { type : Date, default: Date.now },
	appropriateness : Number,
	clarity : Number,
	methodology : Number,
	contribution : Number,
	recommendation : Boolean
});

export interface IReview {
	manuscript : Schema.Types.ObjectId;
	reviewer : Schema.Types.ObjectId;
	dateSent? : Date;
	appropriateness : number;
	clarity : number;
	methodology : number;
	contribution : number;
	recommendation : boolean;
}

interface IReviewModel extends IReview, Document {
    // Custom methods go here
}

export const Review : Model<IReviewModel> = db.model<IReviewModel>('review', ReviewSchema);