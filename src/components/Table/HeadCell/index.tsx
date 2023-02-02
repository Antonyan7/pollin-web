import React from 'react';
import { TableCell, TableSortLabel, tableSortLabelClasses, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { SortOrder } from 'types/patient';

import { HeadCellProps } from './types';

export const HeadCell = <SortFieldType,>({
  headCell,
  setSortField,
  setSortOrder,
  sortOrder,
  sortField
}: HeadCellProps<SortFieldType>) => {
  const theme = useTheme();
  const router = useRouter();
  const onSort = (field: SortFieldType) => {
    setSortField(field);

    // ? Every new field which will be sorted first state(default) for that should be ASC then second click DESC for next click ASC etc.
    // ? To identify it we using this approach in bellow if it's the same field sort by ASC -> DESC or DESC -> ASC logic if it's a new sorted field first of set ASC.

    const isTheSameField = sortOrder === SortOrder.Asc && field === sortField;
    const sortDirection = isTheSameField ? SortOrder.Desc : SortOrder.Asc;

    const url = {
      pathname: router.pathname,
      query: { ...router.query, selectedSortField: field as string, selectedOrder: sortDirection }
    };

    router.push(url, undefined, { shallow: true });

    setSortOrder(sortDirection);
  };

  const tableSortLabelProps = headCell.isSortable
    ? {
        direction: sortField === headCell.id ? (sortOrder as SortOrder) : SortOrder.Asc,
        active: sortField === headCell.id,
        sx: {
          paddingLeft: headCell.paddingLeft,
          [`&.${tableSortLabelClasses.root}`]: {
            color: theme.palette.secondary[800],
            [`& > svg`]: {
              marginLeft: theme.typography.pxToRem(10.67),
              fill: theme.palette.primary.main,

              // ?: Make sort icon size according to design 10.67x10.67 ~ 1rem
              fontSize: theme.typography.pxToRem(16)
            }
          }
        },
        onClick: () => onSort(headCell.id as SortFieldType)
      }
    : {
        hideSortIcon: true,
        sx: {
          paddingLeft: headCell.paddingLeft
        }
      };

  return (
    <TableCell
      key={headCell.id}
      align={headCell.align}
      sx={{
        fontSize: theme.typography.pxToRem(16),
        lineHeight: '140%',
        fontWeight: 500
      }}
      sortDirection={(sortField === headCell.id && sortOrder) ?? undefined}
    >
      <TableSortLabel {...tableSortLabelProps}>{headCell.label}</TableSortLabel>
    </TableCell>
  );
};
