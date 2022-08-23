// TODO: update after implementing mock server
import { OptionsReturnProps, ServiceTypesProps } from '../types/create-schedule';

export const createOptionsGroup = (serviceTypes: ServiceTypesProps[]): OptionsReturnProps[] =>
  serviceTypes
    .map((option) => {
      const firstLetter = option.title[0].toUpperCase();

      return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...option
      };
    })
    .sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter));
