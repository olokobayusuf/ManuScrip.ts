/*
*   ManuScripts
*   CS 61 - 17S
*/

import { Document, Model, Schema } from 'mongoose';
import { db } from "../db"

const RICodeSchema = new Schema({
	id: Number,
	interest: String,
});

export class IRICode {
	id : number;
	interest : string;
}

interface IRICodeModel extends IRICode, Document {

}

export const RICode : Model<IRICodeModel> = db.model<IRICodeModel>('ricode', RICodeSchema);