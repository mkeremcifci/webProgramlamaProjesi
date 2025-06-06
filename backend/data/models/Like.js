import  mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isMatch: { type: Boolean, default: false }, // Eşleşme olup olmadığını takip eder
  type: { type: String, enum: ['like', 'superlike', 'dislike'], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Like', likeSchema);
