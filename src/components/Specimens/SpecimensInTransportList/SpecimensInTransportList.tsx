import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SpecimensInTransportListSortFields } from '@axios/results/resultsManagerTypes';
import { HeadCell } from '@components/Table/HeadCell';
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  useTheme
} from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { rowsPerPage } from 'helpers/constants';
import findCurrentAction from 'helpers/findCurrentAction';
import { handleSelectAllClick, onCheckboxClick } from 'helpers/handleCheckboxClick';
import { useRouter } from 'next/router';
import { IHeadCell, SortOrder } from 'types/patient';
import {
  ContextMenuAction,
  ISpecimensInTransportListItem,
  TableRowCheckboxProps
} from 'types/reduxTypes/resultsStateTypes';
import { IGetSpecimensInTransportListParams } from 'types/results';

import { ISpecimenRowProps } from '@hooks/contextMenu/types';
import useSpecimenActions from '@hooks/contextMenu/useSpecimenActions';
import CircularLoading from '@ui-component/circular-loading';
import ResultsTableRowToolbar from '@ui-component/EnhancedTableToolbar/ResultsTableRowToolbar';

import { headCellsData } from './headCellsData';
import { SpecimensInTransportListRow } from './SpecimensInTransportListRow';

const SpecimensInTransportList = () => {
  const [t] = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const [page, setPage] = useState<number>(0);
  const [sortField, setSortField] = useState<SpecimensInTransportListSortFields>(
    SpecimensInTransportListSortFields.PATIENT_NAME
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Desc);
  const specimensList = useAppSelector(resultsSelector.specimensInTransportList);
  const isLoading = useAppSelector(resultsSelector.isSpecimensInTransportListLoading);
  const actionVariations = useAppSelector(resultsSelector.specimenActions);

  const transportId = router.query.id as string;

  const headCells = headCellsData(t) as IHeadCell[];

  const [selectedRows, setSelectedRows] = useState<TableRowCheckboxProps[]>([]);
  const selectedIds = selectedRows.map((row) => row.id);
  const isSelected = (id: string) => selectedIds.indexOf(id) !== -1;
  const numSelected = selectedIds.length;
  const rowsCount = specimensList?.specimens.length;
  const isAllSelected = rowsCount > rowsPerPage ? rowsPerPage : rowsCount;
  const isAllSpecimensSelected = rowsCount > 0 && !!numSelected && !!isAllSelected;

  const rowCount = specimensList?.specimens.length;

  useEffect(() => {
    const params: IGetSpecimensInTransportListParams = {
      page: page + 1,
      sortByField: sortField,
      sortOrder
    };

    dispatch(resultsMiddleware.getSpecimensInTransportList(params, transportId));
  }, [transportId, page, sortField, sortOrder]);

  useEffect(() => {
    if (!actionVariations.length) {
      dispatch(resultsMiddleware.getSpecimenActions());
    }
  }, [actionVariations]);

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const actions = useMemo(() => {
    const statuses = selectedRows.map((row) => row.status);
    const uniqueStatuses = Array.from(new Set(statuses));

    if (uniqueStatuses.length === 1) {
      const onlyStatus = uniqueStatuses[0];
      const currentStatusActions: ContextMenuAction[] =
        actionVariations.find((variation) => variation.status === onlyStatus)?.actions ?? [];

      return currentStatusActions;
    }

    return [];
  }, [selectedRows, actionVariations]);

  const actionBindings = useSpecimenActions(selectedRows as ISpecimenRowProps[], actions, true);

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  sx={{ color: theme.palette.primary.main }}
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={isAllSpecimensSelected}
                  onChange={(e) => handleSelectAllClick(e, specimensList.specimens, setSelectedRows)}
                />
              </TableCell>

              {numSelected > 0 ? (
                <TableCell padding="none" colSpan={6}>
                  <ResultsTableRowToolbar actionBindings={actionBindings} selectionCount={numSelected} />
                </TableCell>
              ) : null}

              {numSelected <= 0 && (
                <>
                  {headCells.map((headCell) => (
                    <HeadCell
                      headCell={headCell}
                      key={headCell.id}
                      sortOrder={sortOrder}
                      sortField={sortField}
                      setSortOrder={setSortOrder}
                      setSortField={setSortField}
                    />
                  ))}
                  <TableCell padding="none" colSpan={6} />
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableBody />
            {specimensList?.specimens?.map((row: ISpecimensInTransportListItem, index: number) => {
              const filteredSpecimenActions = findCurrentAction(actionVariations, row);
              const isItemSelected = isSelected(row.id);
              const isContextMenuAvailable = filteredSpecimenActions && numSelected < 2;
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <SpecimensInTransportListRow
                  row={row}
                  key={row.id}
                  actions={isContextMenuAvailable ? filteredSpecimenActions.actions : []}
                  isItemSelected={isItemSelected}
                  onClick={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onCheckboxClick(e, row, selectedRows, setSelectedRows)
                  }
                  labelId={labelId}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {isLoading ? <CircularLoading /> : null}
      <TablePagination
        component="div"
        count={specimensList.totalItems}
        rowsPerPage={specimensList.pageSize}
        page={page}
        onPageChange={handleChangePage}
      />
    </>
  );
};

export default SpecimensInTransportList;
