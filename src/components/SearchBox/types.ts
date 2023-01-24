export interface SearchBoxProps {
  onSearch: (values: string[]) => void;
  placeholder: string;
  invalidSearchedItems?: string[];
}

export interface SearchBoxItemsProps {
  currentSearchboxValues: string[];
  searchboxValueDeleteHandler: (value: string) => void;
  invalidSearchedItems?: string[];
}
