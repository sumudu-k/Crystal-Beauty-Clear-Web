import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    isBlocked: {
        type: Boolean,
        default: false
    },

    type: {
        type: String,
        default: "customer"
    },

    profilePicture: {
        type: String,
        default: "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?t=st=1732247354~exp=1732250954~hmac=e0879e6f293628fabbb2c26855f35dd3bd96f4814ea70c76c4be643d28f47c8f&w=740"
    }
})


const User = mongoose.model('users', userSchema);

export default User;





