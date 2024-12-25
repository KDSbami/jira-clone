import Mongoose from 'mongoose';

const UserSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  _id: {
    type: String,
    auto: true,
  },
});

export type DBUserType = Mongoose.InferSchemaType<typeof UserSchema>;
export const DBUser = Mongoose.model('User', UserSchema);
