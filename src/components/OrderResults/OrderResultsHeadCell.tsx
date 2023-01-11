import React, { useCallback } from 'react';
import { OrderResultsSortFields } from '@axios/results/resultsManagerTypes';
import { TableCell, TableSortLabel, tableSortLabelClasses } from '@mui/material';
import { margins } from 'themes/themeConstants';
import { IHeadCell, SortOrder } from 'types/patient';

interface OrderResultsHeadCellProps {
  headCell: IHeadCell;
  setSortField: (value: OrderResultsSortFields) => void;
  setSortOrder: (value: SortOrder) => void;
  sortOrder: SortOrder | null;
  sortField: OrderResultsSortFields | null;
}

export const OrderResultsHeadCell = ({
  headCell,
  setSortField,
  setSortOrder,
  sortOrder,
  sortField
}: OrderResultsHeadCellProps) => {
  const onSort = useCallback(
    (field: OrderResultsSortFields) => {
      setSortField(field);
      setSortOrder(sortOrder === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc);
    },
    [setSortField, setSortOrder, sortOrder]
  );

  return (
    <TableCell
      key={headCell.id}
      align={headCell.align}
      sx={(theme) => ({
        fontSize: theme.typography.pxToRem(16),
        lineHeight: '140%',
        fontWeight: 400
      })}
    >
      {headCell.isSortable ? (
        <TableSortLabel
          direction={sortField === headCell.id ? (sortOrder as SortOrder) : SortOrder.Asc}
          active={sortField === headCell.id}
          sx={(theme) => ({
            paddingLeft: headCell.paddingLeft,
            [`&.${tableSortLabelClasses.root}`]: {
              color: theme.palette.secondary[800],
              [`& > svg`]: {
                marginLeft: margins.left12,
                fill: theme.palette.primary.main,
                fontSize: theme.typography.pxToRem(18)
              }
            }
          })}
          onClick={() => onSort(headCell.id as OrderResultsSortFields)}
        >
          {headCell.label}
        </TableSortLabel>
      ) : (
        <TableSortLabel
          hideSortIcon
          sx={{
            paddingLeft: headCell.paddingLeft
          }}
        >
          {headCell.label}
        </TableSortLabel>
      )}
    </TableCell>
  );
};
