import mongoose, { Schema } from 'mongoose';


const IssueSchema = new Schema({
    year: Number,
    period: Number,
    published: Boolean,
    publishDate: Date,
});

const IssueModel = mongoose.model('Issue', IssueSchema);

export default IssueModel;
