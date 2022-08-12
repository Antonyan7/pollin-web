// TODO: update after implementing mock server
import { IServiceTypes } from '../types/create-schedule';

export const createOptionsGroup = (serviceTypes: { title: string }[]): IServiceTypes[] =>
  serviceTypes.map((option) => {
    const firstLetter = option.title[0].toUpperCase();

    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option
    };
  });
export const sortGroups = (optionsGroup: IServiceTypes[]) =>
  optionsGroup.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter));
