import React from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox, TableCell, TableRow, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import { IAllTestsSpecimensListItem } from 'types/reduxTypes/resultsStateTypes';

import Chip from '@ui-component/patient/Chip';

interface AllTestsRowProps {
  row: IAllTestsSpecimensListItem;
}

export const AllTestsRow = ({ row }: AllTestsRowProps) => {
  const [t] = useTranslation();
  const theme = useTheme();

  return (
    <TableRow role="checkbox" hover key={row.id}>
      <TableCell padding="checkbox">
        <Checkbox sx={{ color: theme.palette.primary.main }} key={row.id} />
      </TableCell>
      <TableCell>{row.titles?.join(', ')}</TableCell>
      <TableCell>{row.identifier}</TableCell>
      <TableCell>{row.status}</TableCell>
      <TableCell>{row.labName}</TableCell>
      <TableCell align="center">
        <Chip label={`${row.age} ${t(Translation.PAGE_RESULTS_LIST_ITEM_DAYS)}`} size="small" chipColor="notActive" />
      </TableCell>
    </TableRow>
  );
};
