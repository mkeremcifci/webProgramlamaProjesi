import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  users: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Match', matchSchema);
