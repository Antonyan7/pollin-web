import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SpecimensInTransportListSortFields } from '@axios/results/resultsManagerTypes';
import { HeadCell } from '@components/Table/HeadCell';
import {
  Box,
  Checkbox,
  CircularProgress,
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
import { handleSelectAllClick, onCheckboxClick } from 'helpers/handleCheckboxClick';
import { useRouter } from 'next/router';
import { margins } from 'themes/themeConstants';
import { IHeadCell, SortOrder } from 'types/patient';
import { ISpecimensInTransportListItem, TableRowCheckboxProps } from 'types/reduxTypes/resultsStateTypes';
import { IGetSpecimensInTransportListParams } from 'types/results';

import ResultsTableRowToolbar from '@ui-component/EnhancedTableToolbar/ResultsTableRowToolbar';

import { headCellsData } from './headCellsData';
import { SpecimensInTransportListRow } from './SpecimensInTransportListRow';

const SpecimensInTransportList = () => {
  const [page, setPage] = useState<number>(0);
  const [sortField, setSortField] = useState<SpecimensInTransportListSortFields>(
    SpecimensInTransportListSortFields.PATIENT_NAME
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Desc);
  const specimensInTransportList = useAppSelector(resultsSelector.specimensInTransportList);
  const specimensInTransportListLoading = useAppSelector(resultsSelector.isSpecimensInTransportListLoading);
  const specimenActions = useAppSelector(resultsSelector.specimenActions);

  const transportId = useRouter().query.id as string;
  const [t] = useTranslation();
  const headCells = headCellsData(t) as IHeadCell[];

  useEffect(() => {
    const params: IGetSpecimensInTransportListParams = {
      page: page + 1,
      sortByField: sortField,
      sortOrder
    };

    dispatch(resultsMiddleware.getSpecimensInTransportList(params, transportId));
  }, [transportId, page, sortField, sortOrder]);

  useEffect(() => {
    dispatch(resultsMiddleware.getSpecimenActions());
  }, []);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const [selectedRows, setSelectedRows] = useState<TableRowCheckboxProps[]>([]);
  const selectedIds = selectedRows.map((row) => row.id);
  const isSelected = (id: string) => selectedIds.indexOf(id) !== -1;
  const numSelected = selectedIds.length;

  const rowCount = specimensInTransportList.pageSize;
  const theme = useTheme();

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
                  checked={rowCount > 0 && numSelected === rowsPerPage}
                  onChange={(e) => handleSelectAllClick(e, specimensInTransportList.specimens, setSelectedRows)}
                />
              </TableCell>

              {numSelected > 0 ? (
                <TableCell padding="none" colSpan={6}>
                  <ResultsTableRowToolbar
                    numSelected={numSelected}
                    specimenActions={specimenActions}
                    selectedRows={selectedRows}
                  />
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
            {specimensInTransportList?.specimens?.map((row: ISpecimensInTransportListItem, index: number) => {
              const filteredSpecimenActions = specimenActions.find((item) => item.status === row.status);
              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <SpecimensInTransportListRow
                  row={row}
                  key={row.id}
                  actions={filteredSpecimenActions ? filteredSpecimenActions.actions : []}
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
      {specimensInTransportListLoading ? (
        <Box sx={{ display: 'grid', justifyContent: 'center', alignItems: 'center', marginTop: margins.top16 }}>
          <CircularProgress sx={{ margin: margins.auto }} />
        </Box>
      ) : null}
      <TablePagination
        component="div"
        count={specimensInTransportList.totalItems}
        rowsPerPage={specimensInTransportList.pageSize}
        page={page}
        onPageChange={handleChangePage}
      />
    </>
  );
};

export default SpecimensInTransportList;
