import mongoose, { Schema } from 'mongoose';


const UserSchema = new Schema({
  role: String, //["author","editor","reviewer"],
  password: String,
  fname: String,
  lname: String,
  address: String,
  email: String,
  affiliation: String,
  ricodes: [Number]
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
