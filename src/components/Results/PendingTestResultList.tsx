import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IResultsReqBody, TestResultsListSortFields } from '@axios/results/resultsManagerTypes';
import { PatientListStyled } from '@components/Patients/PatientListStyled';
import { PendingTestResultHeadCell } from '@components/Results/PendingTestResultHeadCell';
import { headCellsData } from '@components/Results/PendingTestResultHeadCellMockData';
import PendingTestResultRow from '@components/Results/PendingTestResultRow';
import ResultFilters from '@components/Results/ResultFilters';
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { dispatch, useAppSelector } from 'redux/hooks';
import { margins } from 'themes/themeConstants';
import { IHeadCell, SortOrder } from 'types/patient';
import { IExternalResultListData } from 'types/reduxTypes/resultsStateTypes';

const PendingTestResultList = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<SortOrder | null>(null);
  const [sortField, setSortField] = useState<TestResultsListSortFields | null>(null);
  const [filterId, setFilterId] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [t] = useTranslation();

  const resultsList = useAppSelector(resultsSelector.resultsList);
  const isResultsLoading = useAppSelector(resultsSelector.isResultsLoading);

  const headCells = headCellsData(t) as IHeadCell[];

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    const data: IResultsReqBody = {
      ...(searchValue ? { searchString: searchValue } : {}),
      ...(sortField ? { sortByField: sortField } : {}),
      ...(sortOrder ? { sortOrder } : {}),
      ...(filterId ? { filterId } : {}),
      page: page + 1
    };

    dispatch(resultsMiddleware.getResultsList(data));
  }, [filterId, page, searchValue, sortField, sortOrder]);

  return (
    <PatientListStyled>
      <ResultFilters setSearchValue={setSearchValue} setFiltersChange={setFilterId} />
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <PendingTestResultHeadCell
                  headCell={headCell}
                  sortOrder={sortOrder}
                  sortField={sortField}
                  setSortOrder={setSortOrder}
                  setSortField={setSortField}
                  key={headCell.id}
                />
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {resultsList?.testResults?.map((row: IExternalResultListData, index: number) => (
              <PendingTestResultRow row={row} index={index} key={row.id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isResultsLoading ? (
        <Box sx={{ display: 'grid', justifyContent: 'center', alignItems: 'center', marginTop: margins.top16 }}>
          <CircularProgress sx={{ margin: margins.auto }} />
        </Box>
      ) : null}
      <TablePagination
        component="div"
        rowsPerPageOptions={[]}
        count={resultsList.totalItems}
        rowsPerPage={resultsList.pageSize}
        page={resultsList.currentPage - 1}
        onPageChange={handleChangePage}
      />
    </PatientListStyled>
  );
};

export default PendingTestResultList;
