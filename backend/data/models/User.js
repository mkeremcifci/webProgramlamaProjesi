import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
    age: { type: Number },
    gender: { type: String, trim: true },
    bio: { type: String, trim: true },
    location: { type: String, trim: false }, 
    interests: [{ type: String, trim: true }],
}, { _id: false });

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    hashed_password: {
        type: String,
        required: true,
    },
    profile: profileSchema,
    is_online: {
        type: Boolean,
        default: false,
    },
},  {
    timestamps: true,
    toJSON: { virtuals: true},
    toObject: { virtuals: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;