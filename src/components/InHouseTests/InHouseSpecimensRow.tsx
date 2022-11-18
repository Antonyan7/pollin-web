import React from 'react';
import { useTranslation } from 'react-i18next';
import { TableCell, TableRow } from '@mui/material';
import { ISpecimensListItem } from 'types/reduxTypes/resultsStateTypes';

import Chip from '@ui-component/patient/Chip';

import { Translation } from '../../constants/translations';

interface InHouseSpecimensRowProps {
  row: ISpecimensListItem;
}

export const InHouseSpecimensRow = ({ row }: InHouseSpecimensRowProps) => {
  const [t] = useTranslation();

  return (
    <TableRow hover role="checkbox" key={row.id}>
      <TableCell>{row.titles?.join(', ')}</TableCell>
      <TableCell>{row.id}</TableCell>
      <TableCell>{row.machine}</TableCell>
      <TableCell>{row.status}</TableCell>
      <TableCell align="center">
        <Chip label={`${row.age} ${t(Translation.PAGE_RESULTS_LIST_ITEM_DAYS)}`} size="small" chipColor="notActive" />
      </TableCell>
    </TableRow>
  );
};
