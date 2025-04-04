import { ArrangementOrder, KeyedObject } from 'types';

export const descendingComparator = <T>(a: T, b: T, orderBy: string) => {
  if (b[orderBy as keyof typeof b] < a[orderBy as keyof typeof a]) {
    return -1;
  }

  if (b[orderBy as keyof typeof b] > a[orderBy as keyof typeof a]) {
    return 1;
  }

  return 0;
};

export const getComparator = <T = KeyedObject>(order: ArrangementOrder, orderBy: string) =>
  order === 'desc'
    ? (a: T, b: T) => descendingComparator<T>(a, b, orderBy)
    : (a: T, b: T) => -descendingComparator<T>(a, b, orderBy);

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
