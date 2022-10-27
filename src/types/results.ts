import { IResultsFilterCategory } from 'types/reduxTypes/resultsStateTypes';

export interface IResultsFiltersResponse {
  filters: IResultsFilterCategory[];
}

export interface IResultsFilterOption {
  type: string;
  id: string;
  title: string;
}
