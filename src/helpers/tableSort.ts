import { GetComparator, KeyedObject } from 'types';

export const descendingComparator = (a: KeyedObject, b: KeyedObject, orderBy: string) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
};

export const getComparator: GetComparator = (order, orderBy) =>
  order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

export const stableSort = <T>(array: T[], comparator: (a: T, b: T) => number) => {
  const stabilizedThis = array.map((el: T, index: number) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0] as T, b[0] as T);

    if (order !== 0) {
      return order;
    }

    return (a[1] as number) - (b[1] as number);
  });

  return stabilizedThis.map((el) => el[0]);
};
