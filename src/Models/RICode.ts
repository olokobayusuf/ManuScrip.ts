/*
*   ManuScripts
*   CS 61 - 17S
*/

import { Document, Model, Schema } from 'mongoose';
import { db } from "../db"

const RICodeSchema = new Schema({
	id: { type: Number, index: true },
	interest: String,
});

export interface IRICode {
	id : number;
	interest : string;
}

interface IRICodeModel extends IRICode, Document {

}

export const RICode : Model<IRICodeModel> = db.model<IRICodeModel>('ricode', RICodeSchema);
