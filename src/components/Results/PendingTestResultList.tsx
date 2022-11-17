import React, { useEffect, useState } from 'react';
import { IResultsReqBody, TestResultsListSortFields } from '@axios/results/resultsManagerTypes';
import { PatientListStyled } from '@components/Patients/PatientListStyled';
import ResultFilters from '@components/Results/ResultFilters';
import { Box, CircularProgress, TableContainer, TablePagination } from '@mui/material';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { dispatch, useAppSelector } from 'redux/hooks';
import { margins } from 'themes/themeConstants';
import { SortOrder } from 'types/patient';
import { IResultsFilterOption } from 'types/results';

import SpecimensStatsView from '@ui-component/profile/SpecimensStatsView';

import Table from './PendingTestResultsTable';

const PendingTestResultList = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<SortOrder | null>(null);
  const [sortField, setSortField] = useState<TestResultsListSortFields | null>(null);
  const [filters, setFilters] = useState<Omit<IResultsFilterOption, 'title'>[]>([]);
  const [page, setPage] = useState<number>(0);

  const resultsList = useAppSelector(resultsSelector.resultsList);
  const isResultsLoading = useAppSelector(resultsSelector.isResultsLoading);
  const pendingTestStats = useAppSelector(resultsSelector.pendingTestStats);
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

  const [selected, setSelected] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelectedId = resultsList.testResults.map((n) => n.id);
      const newSelectedStatus = resultsList.testResults.map((n) => n.status);

      setSelected(newSelectedId);
      setSelectedStatuses(newSelectedStatus);

      return;
    }

    setSelected([]);
    setSelectedStatuses([]);
  };

  const onClick = (event: React.MouseEvent, id: string, status: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];
    let newSelectedStatus: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
      newSelectedStatus = newSelectedStatus.concat(selectedStatuses, status);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newSelectedStatus = newSelectedStatus.concat(selectedStatuses.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newSelectedStatus = newSelectedStatus.concat(selectedStatuses.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
      newSelectedStatus = newSelectedStatus.concat(
        selectedStatuses.slice(0, selectedIndex),
        selectedStatuses.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    setSelectedStatuses(newSelectedStatus);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;
  const numSelected = selected.length;
  const rowCount = resultsList.testResults.length;

  return (
    <PatientListStyled>
      <Box sx={{ marginBottom: margins.bottom32 }}>
        <SpecimensStatsView stats={pendingTestStats} />
      </Box>
      <ResultFilters setSearchValue={setSearchValue} setFiltersChange={handleFiltersUpdate} />
      <TableContainer>
        <Table
          selected={selected}
          selectedStatuses={selectedStatuses}
          isSelected={isSelected}
          numSelected={numSelected}
          rowCount={rowCount}
          onClick={onClick}
          handleSelectAllClick={handleSelectAllClick}
          setSortField={setSortField}
          setSortOrder={setSortOrder}
          sortField={sortField}
          sortOrder={sortOrder}
        />
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
