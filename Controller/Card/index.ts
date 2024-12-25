import { Card, createRow, getById, getByList } from '../../Model/Card';
import { decodePriority, Priority } from '../../Model/Commons';
import { List } from '../../Model/List';

export async function createCard(
  title: string,
  assignedUser: string,
  priority: string,
  list: string
): Promise<Card | null> {
  try {
    const decodedPriority = decodePriority(priority);
    const dbCard = await createRow(list, assignedUser, decodedPriority);
    if (!dbCard) {
      console.error('Error creating card');
      return null;
    }
    return Card.decode({
      ...dbCard,
      id: dbCard._id,
      taskList: dbCard.taskList[0],
    });
  } catch (err) {
    console.error('Error creating card:', err);
    return null;
  }
}

export async function findCardWithId(id: string): Promise<Card | null> {
  try {
    const dbCard = await getById(id);
    if (!dbCard) {
      console.error('Error getting card');
      return null;
    }
    return Card.decode({ ...dbCard, id: dbCard._id });
  } catch (err) {
    console.error('Error reading card:', err);
    return null;
  }
}

export async function findByList(
  listId: string,
  priorityArray: Array<Priority> = [Priority.P2, Priority.P1, Priority.P0]
): Promise<Array<Card> | null> {
  try {
    const dbCards = await getByList(listId);
    if (!dbCards) {
      console.error('Error getting cards');
      return null;
    }
    const unfilteredCards = dbCards.map((dbCard) =>
      Card.decode({ ...dbCard, id: dbCard._id })
    );
    const cards = unfilteredCards.filter(
      (card) => card !== null
    ) as Array<Card>;
    return Card.sortCardsByPriority(cards, priorityArray);
  } catch (err) {
    console.error('Error reading card:', err);
    return null;
  }
}
