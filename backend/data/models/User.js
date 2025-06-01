import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  age: { type: Number, required: true },
  gender: { type: String, trim: true, required: true },
  bio: { type: String, trim: true }, 
  location: { type: String, trim: true, required: true },
  interests: {
    type: [String],
    validate: {
      validator: function (arr) {
        return arr.length > 0;
      },
      message: 'En az bir ilgi alanı seçilmelidir.'
    },
    required: true
  }
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
    profile: {
        type: profileSchema,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'editor', 'admin'],
        default: 'user',
        required: true
    },
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

export default User;
