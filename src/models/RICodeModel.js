import mongoose, { Schema } from 'mongoose';


const RICodeSchema = new Schema({
  id: Number,
  interest: String,
});

const RICodeModel = mongoose.model('RICode', RICodeSchema);

export default RICodeModel;
