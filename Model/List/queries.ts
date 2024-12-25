import { DBBoard } from '../Board/schema';
import { Card } from '../Card';
import { DBList, DBListType } from './schema';

export async function createRow(
  name: string,
  boardId: string,
  cards: Array<Card> | null
): Promise<DBListType | null> {
  try {
    const list = new DBList({
      name,
      board: boardId,
      cards,
    });

    await (
      await (await list.save()).populate({ path: 'board', model: 'Board' })
    )
      .populate({ path: 'board.teamMembers', model: 'User' })
      .then((savedList) =>
        DBBoard.findByIdAndUpdate(boardId, {
          $push: { lists: savedList._id },
        }).then(() => savedList)
      );
    return list.toObject();
  } catch (err) {
    console.error('Error writing list:', err);
    return null;
  }
}

export async function getById(id: string): Promise<DBListType | null> {
  try {
    const list = await DBList.findById(id);
    return list ? list.toObject() : null;
  } catch (err) {
    console.error('Error reading list:', err);
    return null;
  }
}

export async function getByBoard(
  boardId: string
): Promise<Array<DBListType> | null> {
  try {
    const lists = await DBList.find({ board: boardId });
    return lists ? lists.map((list) => list.toObject()) : null;
  } catch (err) {
    console.error('Error reading list:', err);
    return null;
  }
}
