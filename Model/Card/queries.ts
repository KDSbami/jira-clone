import { Priority } from '../Commons';
import { DBList } from '../List/schema';
import { DBCard, DBCardType } from './schema';

export async function createRow(
  listId: string,
  assignedUser: string,
  priority: Priority
): Promise<DBCardType | null> {
  try {
    const card = new DBCard({
      taskList: [listId],
      assignedUser: [assignedUser],
      priority: priority.toString(),
    });
    await card.save();
    const cardWtaskList = await card.populate({
      path: 'taskList',
      model: 'List',
    });
    let cardWBoard = await cardWtaskList.populate({
      path: 'taskList.board',
      model: 'Board',
    });
    cardWBoard = await cardWBoard.populate({
      path: 'taskList.board.lists',
      model: 'List',
    });
    cardWBoard = await cardWBoard.populate({
      path: 'taskList.board.teamMembers',
      model: 'User',
    });
    const cardWUser = await cardWBoard.populate({
      path: 'assignedUser',
      model: 'User',
    });
    console.log(cardWUser);
    return cardWUser.toObject();
  } catch (err) {
    console.error('Error writing card:', err);
    return null;
  }
}

export async function getById(cardId: string): Promise<DBCardType | null> {
  try {
    const card = await DBCard.findById(cardId)
      .populate('List')
      .populate('User');
    return card ? card.toObject() : null;
  } catch (err) {
    console.error('Error reading card:', err);
    return null;
  }
}

export async function getByList(
  listId: string
): Promise<Array<DBCardType> | null> {
  try {
    const cards = await DBCard.find({ taskList: listId });
    return cards ? cards.map((card) => card.toObject()) : null;
  } catch (err) {
    console.error('Error reading card:', err);
    return null;
  }
}
