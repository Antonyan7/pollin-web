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
import { IPatientContactInformationModalProps } from 'types/reduxTypes/resultsStateTypes';
import { IResultsFilterOption } from 'types/results';

import SpecimensStatsView from '@ui-component/profile/SpecimensStatsView';

const PendingTestResultList = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<SortOrder | null>(null);
  const [sortField, setSortField] = useState<TestResultsListSortFields | null>(null);
  const [filters, setFilters] = useState<Omit<IResultsFilterOption, 'title'>[]>([]);
  const [page, setPage] = useState<number>(0);
  const [t] = useTranslation();

  const resultsList = useAppSelector(resultsSelector.resultsList);
  const isResultsLoading = useAppSelector(resultsSelector.isResultsLoading);
  const pendingTestStats = useAppSelector(resultsSelector.pendingTestStats);

  const headCells = headCellsData(t) as IHeadCell[];

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleFiltersUpdate = (updatedFilters: IResultsFilterOption[]) => {
    const filtersWithoutTitle = updatedFilters.map((filter: Partial<IResultsFilterOption>) => ({
      id: filter.id,
      type: filter.type
    }));

    setFilters(filtersWithoutTitle as Omit<IResultsFilterOption, 'title'>[]);
  };

  useEffect(() => {
    dispatch(resultsMiddleware.getPendingTestStats());
  }, []);

  useEffect(() => {
    const data: IResultsReqBody = {
      ...(searchValue ? { searchString: searchValue } : {}),
      ...(sortField ? { sortByField: sortField } : {}),
      ...(sortOrder ? { sortOrder } : {}),
      ...(filters.length > 0 ? { filters } : {}),
      page: page + 1
    };

    dispatch(resultsMiddleware.getResultsList(data));
  }, [filters, page, searchValue, sortField, sortOrder]);

  useEffect(() => {
    dispatch(resultsMiddleware.getSpecimenActions());
  }, []);

  const specimenActions = useAppSelector(resultsSelector.specimenActions);

  return (
    <PatientListStyled>
      <Box sx={{ marginBottom: margins.bottom32 }}>
        <SpecimensStatsView stats={pendingTestStats} />
      </Box>
      <ResultFilters setSearchValue={setSearchValue} setFiltersChange={handleFiltersUpdate} />
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
            {resultsList?.testResults?.map((row: IPatientContactInformationModalProps, index: number) => {
              const actions = specimenActions.filter((item) => item.status === row.status);

              return (
                <PendingTestResultRow
                  row={row}
                  index={index}
                  key={row.id}
                  actions={actions.length ? actions[0].actions : []}
                />
              );
            })}
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
        count={resultsList.totalItems}
        rowsPerPage={resultsList.pageSize}
        page={resultsList.currentPage - 1}
        onPageChange={handleChangePage}
      />
    </PatientListStyled>
  );
};

export default PendingTestResultList;
