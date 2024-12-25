import { Board } from '.';
import { DBBoard, DBBoardType } from './schema';
import { List } from '../List';

export async function createRow(
  name: string,
  isPublic: boolean,
  teamMembers: Array<string>,
  lists: Array<List> | null
): Promise<DBBoardType | null> {
  try {
    const board = new DBBoard({
      name: name,
      isPublic: isPublic,
      lists: [],
      teamMembers: teamMembers,
    });
    const newBoard = await board.save();
    const boardWithUsers = await newBoard.populate({
      path: 'teamMembers',
      model: 'User',
    });
    const boardWithList = await boardWithUsers.populate({
      path: 'lists',
      model: 'List',
    });
    return boardWithList.toObject();
  } catch (err) {
    return null;
  }
}

export async function getById(id: string): Promise<DBBoardType | null> {
  try {
    const dbBoard = await DBBoard.findById(id).exec();
    return dbBoard ? dbBoard.toObject() : null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getAll(): Promise<Array<DBBoardType> | null> {
  try {
    const dbBoards = await DBBoard.find()
      .populate({ path: 'lists', model: 'List' })
      .populate({ path: 'teamMembers', model: 'User' })
      .exec();
    return dbBoards ? dbBoards.map((board) => board.toObject()) : null;
  } catch (err) {
    console.error(err);
    return null;
  }
}
