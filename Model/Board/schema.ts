import Mongoose from 'mongoose';

const BoardSchema = new Mongoose.Schema({
  _id: {
    type: Mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  lists: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'List' }],
  teamMembers: {
    type: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'User' }],
    required: true,
  },
});

export type DBBoardType = Mongoose.InferSchemaType<typeof BoardSchema>;
export const DBBoard = Mongoose.model('Board', BoardSchema);
