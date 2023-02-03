import React from 'react';
import { useTranslation } from 'react-i18next';
import { HeadCell } from '@components/Table/HeadCell';
import { IHeadCell } from 'types/patient';

import useSpecimensListContext from './hooks/useSpecimensListContext';
import { headCellsData } from './data';

const SpecimenListHeaderCell = () => {
  const [t] = useTranslation();
  const headCells = headCellsData(t) as IHeadCell[];

  const { callbacks, inHouseSpecimensList } = useSpecimensListContext();
  const { handleSortOrderChange, handleSortFieldChange } = callbacks;
  const { sortOrder, sortField } = inHouseSpecimensList;

  return (
    <>
      {headCells.map((headCell) => (
        <HeadCell
          headCell={headCell}
          key={headCell.id}
          sortOrder={sortOrder}
          sortField={sortField}
          setSortOrder={handleSortOrderChange}
          setSortField={handleSortFieldChange}
        />
      ))}
    </>
  );
};

export default SpecimenListHeaderCell;
