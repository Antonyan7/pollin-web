import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IOrderResultsListReqBody, OrderResultsSortFields } from '@axios/results/resultsManagerTypes';
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { margins } from 'themes/themeConstants';
import { IHeadCell, SortOrder } from 'types/patient';
import { IOrderResultsByPatientItem } from 'types/reduxTypes/resultsStateTypes';
import { IOrderResultsFilterOptions } from 'types/results';

import AutocompleteWrapper from './AutocompleteWrapper';
import { OrderResultsHeadCell } from './OrderResultsHeadCell';
import { headCellsData } from './OrderResultsHeadCellMockData';
import { OrderResultsRow } from './OrderResultsRow';

const OrderResults = () => {
  const [page, setPage] = useState<number>(0);
  const [sortField, setSortField] = useState<OrderResultsSortFields | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder | null>(SortOrder.Desc);
  const [selectedFilters, setSelectedFilters] = useState<IOrderResultsFilterOptions[]>([]);
  const orderResultsByPatientList = useAppSelector(resultsSelector.orderResultsByPatientList);
  const isOrderResultsByPatientListLoading = useAppSelector(resultsSelector.isOrderResultsByPatientListLoading);
  const filtersList = useAppSelector(resultsSelector.orderResultsFilters);
  const isFiltersLoading = useAppSelector(resultsSelector.isOrderResultsFiltersLoading);

  const statuses = useAppSelector(resultsSelector.orderResultsStatuses);

  const [t] = useTranslation();
  const headCells = headCellsData(t) as IHeadCell[];

  const router = useRouter();

  const patientId = router.query.id as string;

  const filterLabel = t(Translation.PAGE_PATIENT_ORDER_RESULTS_FILTER_LABEL);

  useEffect(() => {
    dispatch(resultsMiddleware.getOrderResultsFilters());
    dispatch(resultsMiddleware.getOrderResultsStatuses());
  }, []);

  useEffect(() => {
    const data: IOrderResultsListReqBody = {
      ...(selectedFilters.length > 0 ? { filters: selectedFilters.map(({ type, id }) => ({ type, id })) } : {}),
      ...(sortField ? { sortByField: sortField } : {}),
      ...(sortField && sortOrder ? { sortOrder } : {}),
      page: page + 1
    };

    dispatch(resultsMiddleware.getOrderResultsListForPatient(data, patientId));
  }, [page, selectedFilters, sortField, sortOrder, patientId]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const filterChangeHandler = useCallback((curFilters: IOrderResultsFilterOptions[]) => {
    setPage(0);
    setSelectedFilters(curFilters);
  }, []);

  return (
    <>
      <AutocompleteWrapper
        onChange={filterChangeHandler}
        label={filterLabel}
        filtersList={filtersList}
        loading={isFiltersLoading}
      />

      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <OrderResultsHeadCell
                  headCell={headCell}
                  key={headCell.id}
                  sortOrder={sortOrder}
                  sortField={sortField}
                  setSortOrder={setSortOrder}
                  setSortField={setSortField}
                />
              ))}
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {orderResultsByPatientList?.testResults?.map((row: IOrderResultsByPatientItem) => {
              const actions = statuses.find((item) => item.status === row.status)?.possibleActions ?? [];

              return <OrderResultsRow row={row} key={row.id} actions={actions} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {isOrderResultsByPatientListLoading ? (
        <Box sx={{ display: 'grid', justifyContent: 'center', alignItems: 'center', marginTop: margins.top16 }}>
          <CircularProgress sx={{ margin: margins.auto }} />
        </Box>
      ) : null}
      <TablePagination
        component="div"
        count={orderResultsByPatientList.totalItems}
        rowsPerPage={orderResultsByPatientList.pageSize}
        page={orderResultsByPatientList.currentPage - 1}
        onPageChange={handleChangePage}
      />
    </>
  );
};

export default OrderResults;
