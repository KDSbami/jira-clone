import { Board, createRow, getAll, getById } from '../../Model/Board';
import { List } from '../../Model/List';
import { User } from '../../Model/User';
import { findByList } from '../Card';

export async function create(
  name: string,
  isPublic: boolean,
  teamMembers: Array<string>,
  lists: Array<List> | null
): Promise<Board | null> {
  try {
    const newBoard = await createRow(name, isPublic, teamMembers, lists);
    if (!newBoard) {
      return null;
    }
    return Board.decode({ ...newBoard, id: newBoard._id?.toString() });
  } catch (err) {
    return null;
  }
}

export async function find(id: string): Promise<Board | null> {
  try {
    const board = await getById(id);
    if (!board) {
      return null;
    }

    return Board.decode({ ...board, id: board._id?.toString() });
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function findAll(): Promise<Array<Board> | null> {
  try {
    const boards = await getAll();
    if (!boards) {
      return null;
    }

    const unfilteredBoards = boards.map((board) =>
      Board.decode({ ...board, id: board._id?.toString() })
    );
    const filteredBoards = unfilteredBoards.filter(
      (board) => board !== null
    ) as Array<Board>;
    return filteredBoards;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getAllBoardEntities(): Promise<Array<Board> | null> {
  try {
    const boards = await getAll();
    if (!boards) {
      return null;
    }

    const unfilteredBoards = boards.map((board) =>
      Board.decode({ ...board, id: board._id?.toString() })
    );
    const filteredBoards = unfilteredBoards.filter(
      (board) => board !== null
    ) as Array<Board>;

    filteredBoards.forEach((board) => {
      board.lists?.forEach(async (list) => {
        const cards = await findByList(list.id);
        list.cards = cards;
      });
    });
    return filteredBoards;
  } catch (err) {
    console.error(err);
    return null;
  }
}
