import { List, createRow, getByBoard, getById } from '../../Model/List';

export async function createList(
  name: string,
  board: string
): Promise<List | null> {
  try {
    const list = await createRow(name, board, null);
    if (!list) {
      console.error('Error creating list');
      return null;
    }

    const decodedList = List.decode({
      ...list,
      id: list._id,
      board: list.board[0],
    });
    return decodedList;
  } catch (err) {
    console.error('Error creating list:', err);
    return null;
  }
}

export async function findList(id: string): Promise<List | null> {
  try {
    const list = await getById(id);
    if (!list) {
      console.error('Error getting list');
      return null;
    }

    return List.decode({ ...list, id: list._id });
  } catch (err) {
    console.error('Error reading list:', err);
    return null;
  }
}

export async function findByBoard(
  boardId: string
): Promise<Array<List> | null> {
  try {
    const lists = await getByBoard(boardId);
    if (!lists) {
      console.error('Error getting lists');
      return null;
    }

    const unfilteredLists = lists.map((list) =>
      List.decode({ ...list, id: list._id })
    );
    const filteredLists = unfilteredLists.filter(
      (list) => list !== null
    ) as Array<List>;
    return filteredLists;
  } catch (err) {
    console.error('Error reading list:', err);
    return null;
  }
}
