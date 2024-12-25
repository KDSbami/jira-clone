export * from './queries';

export class User {
  static getWithId(id: string) {
    throw new Error('Method not implemented.');
  }
  id: string;
  name: string;
  email: string;

  constructor(id: string, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  static create(id: string, name: string, email: string) {
    return new User(id, name, email);
  }

  static decode(data: any): User | null {
    if (
      data &&
      typeof data.id === 'string' &&
      typeof data.name === 'string' &&
      typeof data.email === 'string'
    ) {
      return new User(data.id, data.name, data.email);
    } else {
      console.error('Invalid User data:', data);
      return null;
    }
  }
}
