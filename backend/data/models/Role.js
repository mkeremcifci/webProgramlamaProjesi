import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['user', 'editor', 'admin'],
    required: true,
    unique: true
  }
});

const Role = mongoose.model('Role', roleSchema);

export default Role;
