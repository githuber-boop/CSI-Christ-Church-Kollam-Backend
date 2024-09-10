import mongoose from 'mongoose'

const familyMemberSchema = new mongoose.Schema({
  name: String,
  baptism: {
    type: String,
  },
  dob:String,
  confirmation: String,
});

const userSchema = new mongoose.Schema({
    name: String,
    address:String,
    number:Number,
    dob:String,
    email: {
        type: String,
    },
    weddingDte: String,
    baptism: {
      type: String,
    },

    confirmation: String,
    role:  String,
    password: String,
    createdAt: Date,
    familyMembers: [familyMemberSchema]
});

const User = mongoose.model('users', userSchema);

export default User;