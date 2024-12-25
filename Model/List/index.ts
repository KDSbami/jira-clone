import { Board } from '../Board';
import { Card } from '../Card';
export * from './queries';

export class List {
  id: string;
  name: string;
  board: Board;
  cards: Array<Card> | null;

  constructor(
    id: string,
    name: string,
    board: Board,
    cards: Array<Card> | null = null
  ) {
    this.id = id;
    this.name = name;
    this.cards = cards;
    this.board = board;
  }

  static create(
    id: string,
    name: string,
    board: Board,
    cards: Array<Card> | null = null
  ) {
    return new List(id, name, board, cards);
  }

  static decode(data: any): List | null {
    data.id = data._id.toString();
    const undecodedBoard = data.board;
    const board = Board.decode(undecodedBoard);
    const cards = data.cards
      ? data.cards.map((card: any) => Card.decode(card))
      : null;
    if (
      data &&
      typeof data.id === 'string' &&
      typeof data.name === 'string' &&
      board !== null
    ) {
      return new List(data.id, data.name, board, cards);
    } else {
      console.error('Invalid list data:', data);
      return null;
    }
  }
}
