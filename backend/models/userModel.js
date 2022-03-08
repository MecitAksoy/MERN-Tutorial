import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please add a firstname']
    }, 
    lastname: {
        type: String,
        required: [true, 'Please add a lastname']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    }
},
{
    timestamps: true,
})

export default mongoose.model('User', userSchema)