import { User, findOrCreateRow, getWithId } from '../../Model/User';

export async function createUser(
  name: string,
  email: string
): Promise<User | null> {
  try {
    const newUser = await findOrCreateRow(name, email);
    if (!newUser) {
      return null;
    }

    const decodedUser = User.decode({
      ...newUser,
      id: newUser._id?.toString(),
    });
    return decodedUser;
  } catch (err) {
    console.error('Error creating user:', { err });
    return null;
  }
}

export async function getUser(id: string): Promise<User | null> {
  try {
    const user = await getWithId(id);
    if (!user) {
      return null;
    }

    const decodedUser = User.decode({ ...user, id: user._id?.toString() });
    return decodedUser;
  } catch (err) {
    console.error('Error reading user:', err);
    return null;
  }
}
