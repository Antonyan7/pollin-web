import { SetStateAction } from 'react-transition-group/node_modules/@types/react';
import { IAllTestsSpecimensList, ISpecimensList } from 'types/reduxTypes/resultsStateTypes';

export const handleSelectAllClick = (
  event: React.ChangeEvent<HTMLInputElement>,
  specimensList: IAllTestsSpecimensList | ISpecimensList,
  setSelected: (item: string[]) => void,
  setSelectedStatuses: (item: string[]) => void
) => {
  if (event.target.checked) {
    const newSelectedId = specimensList?.specimens.map((specimen) => specimen.id);
    const newSelectedStatus = specimensList?.specimens.map((specimen) => specimen.status);

    setSelected(newSelectedId);
    setSelectedStatuses(newSelectedStatus);

    return;
  }

  setSelected([]);
  setSelectedStatuses([]);
};

export const onCheckboxClick = (
  event: React.MouseEvent,
  id: string,
  status: string,
  selected: string[],
  setSelected: React.Dispatch<SetStateAction<string[]>>,
  setSelectedStatuses: React.Dispatch<SetStateAction<string[]>>
) => {
  const selectedIndex = selected.indexOf(id);

  if (selectedIndex === -1) {
    setSelected((selectedItems) => [...selectedItems, id]);
    setSelectedStatuses((statuses) => [...statuses, status]);
  } else if (selectedIndex === 0) {
    setSelected((selectedItems) => selectedItems.slice(1));
    setSelectedStatuses((statuses) => statuses.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    setSelected((selectedItems) => selectedItems.slice(0, -1));
    setSelectedStatuses((statuses) => statuses.slice(0, -1));
  } else if (selectedIndex > 0) {
    setSelected((selectedItems) => [
      ...selectedItems.slice(0, selectedIndex),
      ...selectedItems.slice(selectedIndex + 1)
    ]);
    setSelectedStatuses((statuses) => [...statuses.slice(0, selectedIndex), ...statuses.slice(selectedIndex + 1)]);
  }
};
