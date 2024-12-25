import { List } from '../List';
import { User } from '../User';
import { DBUserType } from '../User/schema';
export * from './queries';

export class Board {
  id: string;
  name: string;
  isPublic: boolean;
  lists: Array<List> | null;
  teamMembers: Array<User> | null;

  constructor(
    id: string,
    name: string,
    isPublic: boolean = false,
    teamMembers: Array<User>,
    lists: Array<List> | null = null
  ) {
    this.id = id;
    this.name = name;
    this.isPublic = isPublic;
    this.lists = lists;
    this.teamMembers = teamMembers;
  }

  static create(
    id: string,
    name: string,
    isPublic: boolean = false,
    teamMembers: Array<User>,
    lists: Array<List> | null = null
  ) {
    return new Board(id, name, isPublic, teamMembers, lists);
  }

  static decode(data: any): Board | null {
    data.id = data._id.toString();
    const teamMembers: Array<User> = data.teamMembers
      ? data.teamMembers.map((member: DBUserType) =>
          User.decode({ ...member, id: member._id?.toString() })
        )
      : null;
    const decodedList =
      data.lists && data.list?._id
        ? data.lists.map((list: any) => List.decode({ ...list, id: list._id }))
        : null;
    const lists: Array<List> | null = decodedList
      ? (decodedList.filter(
          (list: List | null) => list !== null
        ) as Array<List>)
      : null;
    if (
      data &&
      typeof data.id === 'string' &&
      typeof data.name === 'string' &&
      typeof data.isPublic === 'boolean' &&
      teamMembers !== null
    ) {
      return new Board(data.id, data.name, data.isPublic, teamMembers, lists);
    } else {
      console.error('Invalid board data:', data);
      return null;
    }
  }
}
