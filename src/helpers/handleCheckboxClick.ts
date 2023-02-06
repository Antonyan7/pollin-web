import React from 'react';
import { TableRowCheckboxProps } from 'types/reduxTypes/resultsStateTypes';

export const handleSelectAllClick = (
  event: React.ChangeEvent<HTMLInputElement>,
  specimensList: TableRowCheckboxProps[],
  setSelectedRows: React.Dispatch<React.SetStateAction<TableRowCheckboxProps[]>>
) => {
  if (event.target.checked) {
    setSelectedRows(specimensList);
  } else {
    setSelectedRows([]);
  }
};

// TODO: remove this callback which used react local state in outside https://fhhealth.atlassian.net/browse/PCP-2409
export const onCheckboxClick = (
  _event: React.ChangeEvent<HTMLInputElement>,
  row: TableRowCheckboxProps,
  selectedRow: TableRowCheckboxProps[],
  setSelectedRows: React.Dispatch<React.SetStateAction<TableRowCheckboxProps[]>>
) => {
  const selectedIds = selectedRow.map((specimen) => specimen.id);
  const selectedIndex = selectedIds.indexOf(row.id);

  if (selectedIndex === -1) {
    setSelectedRows((selectedItems) => [...selectedItems, row]);
  } else if (selectedIndex === 0) {
    setSelectedRows((selectedItems) => selectedItems.slice(1));
  } else if (selectedIndex === selectedRow.length - 1) {
    setSelectedRows((selectedItems) => selectedItems.slice(0, -1));
  } else if (selectedIndex > 0) {
    setSelectedRows((selectedItems) => [
      ...selectedItems.slice(0, selectedIndex),
      ...selectedItems.slice(selectedIndex + 1)
    ]);
  }
};
