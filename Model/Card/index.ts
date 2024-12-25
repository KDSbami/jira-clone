import { decodePriority, Priority } from '../Commons';
import { List } from '../List';
export { createRow, getById, getByList } from './queries';

export class Card {
  id: string;
  taskList: List;
  assignedUser: string | null;
  priority: Priority;

  constructor(
    id: string,
    taskList: List,
    priority: Priority,
    assignedUser: string | null = null
  ) {
    this.id = id;
    this.taskList = taskList;
    this.assignedUser = assignedUser;
    this.priority = priority;
  }

  static create(
    id: string,
    taskList: List,
    priority: Priority,
    assignedUser: string | null = null
  ) {
    return new Card(id, taskList, priority, assignedUser);
  }

  static decode(data: any): Card | null {
    data.id = data._id;
    console.log('data', data);
    const taskList: List | null = List.decode(data.taskList);
    console.log('taskList', taskList);
    const priority: Priority = decodePriority(data.priority);
    if (
      data &&
      typeof data.id === 'string' &&
      taskList !== null &&
      typeof priority === 'string'
    ) {
      return new Card(data.id, data.taskList, priority, data.assignedUser);
    } else {
      console.error('Invalid card data:', data);
      return null;
    }
  }

  static sortCardsByPriority(
    cards: Array<Card>,
    customPriorityOrder: Array<Priority>
  ): Array<Card> {
    const priorityMap = customPriorityOrder.reduce(
      (acc: { [key: string]: any }, priority, index) => {
        const decodedPriority = decodePriority(priority);
        acc[decodedPriority] = index;
        return acc;
      },
      {}
    );

    return cards.sort(
      (a, b) =>
        (priorityMap[a.priority] || Infinity) -
        (priorityMap[b.priority] || Infinity)
    );
  }
}
