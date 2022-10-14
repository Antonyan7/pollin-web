import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel, useTheme } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { Translation } from 'constants/translations';
import { rowsPerPage } from 'helpers/constants';
import { EnhancedTableHeadProps, HeadCell } from 'types';
import { SortOrder } from 'types/patient';
import EnhancedTableToolbar from 'ui-component/EnhancedTableToolbar';

import useScheduledTemplatesListContext from '@hooks/useScheduledTemplatesListContext';

// table header options
const headCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    label: Translation.PAGE_SCHEDULING_TEMPLATES_TABLE_HEADER_NAME,
    align: 'left'
  },
  {
    id: 'duration',
    numeric: true,
    label: Translation.PAGE_SCHEDULING_TEMPLATES_TABLE_HEADER_DURATION,
    align: 'left'
  },
  {
    id: 'lastSavedOn',
    numeric: true,
    label: Translation.PAGE_SCHEDULING_TEMPLATES_TABLE_HEADER_LAST,
    align: 'right'
  },
  {
    id: 'status',
    numeric: true,
    label: Translation.PAGE_SCHEDULING_TEMPLATES_TABLE_HEADER_STATUS,
    align: 'center'
  },
  {
    id: 'action',
    numeric: false,
    label: Translation.PAGE_SCHEDULING_TEMPLATES_TABLE_HEADER_ACTION,
    align: 'center'
  }
];

// ==============================|| TABLE HEADER ||============================== //

const ScheduleTemplatesHead = ({
  onSelectAllClick,
  order,
  orderBy,
  rowCount,
  onRequestSort
}: EnhancedTableHeadProps) => {
  const theme = useTheme();
  const [t] = useTranslation();
  const handleSort = (property: string) => (event: React.SyntheticEvent) => {
    onRequestSort(event, property);
  };

  const { selected } = useScheduledTemplatesListContext();
  const numSelected = selected.length;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            sx={{ color: theme.palette.primary.main }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowsPerPage}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell>
        {numSelected > 0 && (
          <TableCell padding="none" colSpan={6}>
            <EnhancedTableToolbar />
          </TableCell>
        )}
        {numSelected <= 0 &&
          headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.align}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : SortOrder.Asc}
                onClick={handleSort(headCell.id)}
              >
                {t(headCell.label)}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === SortOrder.Desc ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
};

export default ScheduleTemplatesHead;
