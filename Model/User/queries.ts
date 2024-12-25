import { DBUser, DBUserType } from './schema';

export async function findOrCreateRow(
  name: string,
  email: string
): Promise<DBUserType | null> {
  try {
    let user = await DBUser.findOne({ email });

    if (user) {
      return user.toObject();
    }

    user = new DBUser({
      name,
      email,
    });

    await user.save();
    return user.toObject();
  } catch (err) {
    console.error('Error creating user:', err);
    return null;
  }
}

export async function getWithId(id: string): Promise<DBUserType | null> {
  try {
    const user = await DBUser.findById(id);
    return user ? user.toObject() : null;
  } catch (err) {
    console.error('Error reading user:', err);
    return null;
  }
}
