import mongoose from 'mongoose'

const familyMemberSchema = new mongoose.Schema({
  name: String,
  baptism:String,
  dob:String,
  confirmation: String,
});

const userSchema = new mongoose.Schema({
    name: String,
    address:String,
    number:Number,
    dob:String,
    email: String,
    weddingDte: String,
    baptism: String,
    confirmation: String,
    house: {
      type: String
    },
    role:  String,
    password: String,
    createdAt: Date,
    familyMembers: [familyMemberSchema]
});

const User = mongoose.model('users', userSchema);

export default User;