import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: String,
    address:String,
    number:Number,
    dob:String,
    email: {
        type: String,
        unique: true,
        minLength: 3,
        maxLength: 30,
      },
    weddingDte: String,
    baptism: String,
    confirmation: String,
    role:  String,
    password: String,
    createdAt: Date
});

const User = mongoose.model('users', userSchema);

export default User;