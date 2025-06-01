import { Schema, model } from 'mongoose';

const interestSchema = new Schema({
  name: { type: String, required: true }
});

const Interest = model('Interest', interestSchema);
export default Interest;
