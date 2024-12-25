import { getAllBoardEntities, create } from './Controller/Board';
import { createCard } from './Controller/Card';
import { createList } from './Controller/List';
import { createUser } from './Controller/User';
import connectToMongoDB from './Utilities/Database/Connector';

connectToMongoDB();

const newUser = await createUser('Test User', 'karam@gmail.com');
if (!newUser) {
  console.error('Error creating user');
  process.exit(1);
}
const newBoard = await create('Test Board', false, [newUser.id], null);
if (!newBoard) {
  console.error('Error creating board');
  process.exit(1);
}

const listB1 = await createList('Test List1', newBoard.id);
const list2B1 = await createList('Test List2', newBoard.id);
const list3B1 = await createList('Test List3', newBoard.id);
if (!listB1 || !list2B1 || !list3B1) {
  console.error('Error creating list');
  process.exit(1);
}

const card1 = await createCard('Test Card P2', newUser.id, 'P2', listB1.id);
const card2 = await createCard('Test Card P1', newUser.id, 'P1', listB1.id);
const card0 = await createCard('Test Card P0', newUser.id, 'P0', list3B1.id);
const boards = await getAllBoardEntities();
console.log(boards);
