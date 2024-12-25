export enum Priority {
  P0 = 'P0',
  P1 = 'P1',
  P2 = 'P2',
}

export function decodePriority(data: string): Priority {
  switch (data) {
    case 'P0':
      return Priority.P0;
    case 'P1':
      return Priority.P1;
    case 'P2':
      return Priority.P2;
    default:
      return Priority.P0;
  }
}
