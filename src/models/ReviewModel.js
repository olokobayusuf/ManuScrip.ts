import mongoose, { Schema } from 'mongoose';


const ReviewSchema = new Schema({
  manuscript: { type: Schema.Types.ObjectId, ref: 'Manuscript' },
  reviewer: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: { type : Date, default: Date.now },
  appropriateness: Number,
  clarity: Number,
  methodology: Number,
  contribution: Number,
  recommendation: Boolean
});

const ReviewModel = mongoose.model('Review', ReviewSchema);

export default ReviewModel;
