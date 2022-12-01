import React from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox, TableCell, TableRow, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import { IAllTestsSpecimensListItem, SpecimenActionsValues } from 'types/reduxTypes/resultsStateTypes';

import ContextMenu from '@ui-component/contextMenu';
import Chip from '@ui-component/patient/Chip';

interface AllTestsRowProps {
  row: IAllTestsSpecimensListItem;
  actions: SpecimenActionsValues[];
  isItemSelected: boolean;
  onClick: (event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>, name: string) => void;
  labelId: string;
}

export const AllTestsRow = ({ row, actions, isItemSelected, onClick, labelId }: AllTestsRowProps) => {
  const [t] = useTranslation();
  const theme = useTheme();

  return (
    <TableRow role="checkbox" hover key={row.id}>
      <TableCell
        padding="checkbox"
        onClick={(event) => {
          event.stopPropagation();
          onClick(event, row.id);
        }}
      >
        <Checkbox
          sx={{ color: theme.palette.primary.main }}
          checked={isItemSelected}
          inputProps={{
            'aria-labelledby': labelId
          }}
          key={row.id}
        />
      </TableCell>
      <TableCell>{row.titles?.join(', ')}</TableCell>
      <TableCell>{row.identifier}</TableCell>
      <TableCell>{row.status}</TableCell>
      <TableCell>{row.labName}</TableCell>
      <TableCell align="center">
        <Chip label={`${row.age} ${t(Translation.PAGE_RESULTS_LIST_ITEM_DAYS)}`} size="small" chipColor="notActive" />
      </TableCell>
      <TableCell align="left" onClick={(e) => e.stopPropagation()}>
        <ContextMenu actions={actions} row={row} />
      </TableCell>
    </TableRow>
  );
};
