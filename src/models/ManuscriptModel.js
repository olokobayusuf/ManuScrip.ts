import mongoose, { Schema } from 'mongoose';


const ManuscriptSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  ricode: Number,
  title: String,
  contributors: [
    {
      fname: String,
      lname: String
    }
  ],
  status: String,
  timestamp: { type : Date, default: Date.now },
  pageCount: Number,
  issue: { type: Schema.Types.ObjectId, ref: 'Issue' },
  sortNum: Number,
});

const ManuscriptModel = mongoose.model('Manuscript', ManuscriptSchema);

export default ManuscriptModel;
