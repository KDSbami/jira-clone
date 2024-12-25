import Mongoose from 'mongoose';

const ListSchema = new Mongoose.Schema({
  _id: {
    type: Mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
  },
  cards: {
    type: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Card' }],
    default: [],
  },
  board: {
    type: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Board' }],
    required: true,
  },
});

export type DBListType = Mongoose.InferSchemaType<typeof ListSchema>;
export const DBList = Mongoose.model('List', ListSchema);
