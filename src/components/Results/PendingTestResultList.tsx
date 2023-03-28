import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IResultsReqBody, TestResultsListSortFields } from '@axios/results/resultsManagerTypes';
import NoResultsFound from '@components/NoResultsFound';
import { PatientListStyled } from '@components/Patients/PatientListStyled';
import ResultFilters from '@components/Results/ResultFilters';
import { Box, CircularProgress, TableContainer, TablePagination } from '@mui/material';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { Translation } from 'constants/translations';
import { dispatch, useAppSelector } from 'redux/hooks';
import { margins } from 'themes/themeConstants';
import { SortOrder } from 'types/patient';
import { IResultsFilterOption } from 'types/results';

import SpecimensStatsView from '@ui-component/profile/SpecimensStatsView';

import Table from './PendingTestResultsTable';

const PendingTestResultList = () => {
  const [t] = useTranslation();
  const [searchValue, setSearchValue] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<SortOrder | null>(null);
  const [sortField, setSortField] = useState<TestResultsListSortFields | null>(null);
  const [filters, setFilters] = useState<Omit<IResultsFilterOption, 'title'>[]>([]);
  const [page, setPage] = useState<number>(0);
  const externalResultsEmptyStateLabel = t(Translation.PAGE_RESULTS_LIST_EMPTY_STATE_LABEL);

  const resultsList = useAppSelector(resultsSelector.resultsList);
  const isResultsLoading = useAppSelector(resultsSelector.isResultsLoading);
  const pendingTestStats = useAppSelector(resultsSelector.pendingTestStats);
  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
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

  return (
    <PatientListStyled>
      <Box sx={{ marginBottom: margins.bottom32 }}>
        <SpecimensStatsView stats={pendingTestStats} />
      </Box>
      <ResultFilters setPage={setPage} setSearchValue={setSearchValue} setFiltersChange={handleFiltersUpdate} />
      <TableContainer>
        <Table setSortField={setSortField} setSortOrder={setSortOrder} sortField={sortField} sortOrder={sortOrder} />
      </TableContainer>
      {resultsList.totalItems === 0 && !isResultsLoading && <NoResultsFound label={externalResultsEmptyStateLabel} />}
      {isResultsLoading ? (
        <Box sx={{ display: 'grid', justifyContent: 'center', alignItems: 'center', marginTop: margins.top16 }}>
          <CircularProgress sx={{ margin: margins.auto }} />
        </Box>
      ) : null}
      <TablePagination
        labelRowsPerPage={`${t(Translation.COMMON_PAGINATION_ROWS_COUNT)} :`}
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
