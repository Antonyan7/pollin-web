import { OptionsReturnProps, OptionsReturnPropsPatient } from 'types/create-schedule';
import { IUniqueItem, IUniqueItemPatient } from 'types/reduxTypes/bookingStateTypes';

export const createOptionsGroup = <T extends IUniqueItem>(items: T[]): OptionsReturnProps<T>[] =>
  items?.map((item) => ({
    firstLetter: item.title[0].toUpperCase(),
    item
  })) ?? [];

export const createOptionsGroupPatients = <T extends IUniqueItemPatient>(items: T[]): OptionsReturnPropsPatient<T>[] =>
  items?.map((item) => ({
    firstLetter: item.name[0].toUpperCase(),
    item
  })) ?? [];
