import { ISingleTemplate } from 'types/create-schedule';

export interface TimePeriodsFieldProps {
  index: number;
  updateInputValue: (
    input: keyof ISingleTemplate,
    value: string | undefined | boolean | string[],
    itemIndex: number,
    indexOfDay?: number
  ) => void;
}
