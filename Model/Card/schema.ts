import Mongoose from 'mongoose';
import { Priority } from '../Commons';

const CardSchema = new Mongoose.Schema({
  _id: {
    type: Mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  taskList: {
    type: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'List' }],
    required: true,
  },
  assignedUser: {
    type: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  priority: {
    type: String,
    enum: Object.values(Priority),
    required: true,
  },
});

export type DBCardType = Mongoose.InferSchemaType<typeof CardSchema>;
export const DBCard = Mongoose.model('Card', CardSchema);
