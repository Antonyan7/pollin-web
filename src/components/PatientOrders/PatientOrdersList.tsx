import React, { useEffect, useState } from 'react';
import {
  OrderListDataFilter,
  OrderListSortFields,
  OrdersFilterOption,
  OrdersListDataProps
} from '@axios/results/resultsManagerTypes';
import { Box, CircularProgress, Grid, TableContainer, TablePagination } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { margins } from 'themes/themeConstants';
import { ISortOrder, SortOrder } from 'types/patient';

import { capitalizeFirst } from '@utils/stringUtils';

import CreateNewOrderButton from './PatientCreateNewOrderButton';
import PatientOrdersFilters from './PatientOrdersFilters';
import PatientOrdersTable from './PatientOrdersTable';

const PatientOrdersList = () => {
  const ordersList = useAppSelector(resultsSelector.ordersList);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Asc);
  const [sortField, setSortField] = useState<OrderListSortFields>(OrderListSortFields.Status);
  const [filters, setFilters] = useState<OrderListDataFilter[]>([]);
  const [page, setPage] = useState<number>(0);
  const isOrdersListLoading = useAppSelector(resultsSelector.isOrdersListLoading);

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleFiltersUpdate = (updatedFilters: OrdersFilterOption[]) => {
    const filtersWithoutTitle = updatedFilters.map((filter: OrdersFilterOption) => ({
      id: filter.id
    }));

    setFilters(filtersWithoutTitle);
  };

  useEffect(() => {
    const capitalizedSortOrder = capitalizeFirst<ISortOrder>(sortOrder);
    const capitalizedSortField = capitalizeFirst<OrderListSortFields>(sortField);
    const data: OrdersListDataProps = {
      sortByField: capitalizedSortField,
      sortOrder: capitalizedSortOrder,
      ...(filters.length > 0 ? { filters } : {}),
      page: page + 1
    };

    dispatch(resultsMiddleware.getOrdersList(data));
  }, [filters, page, sortField, sortOrder]);

  useEffect(() => {
    dispatch(resultsMiddleware.getOrderStatuses());
  }, []);

  return (
    <Box>
      <Grid container xs={12}>
        <Grid item xs={10} pr={3}>
          <PatientOrdersFilters setFiltersChange={handleFiltersUpdate} />
        </Grid>
        <Grid item xs={2}>
          <CreateNewOrderButton />
        </Grid>
      </Grid>
      <TableContainer>
        <PatientOrdersTable
          setSortField={setSortField}
          setSortOrder={setSortOrder}
          sortField={sortField}
          sortOrder={sortOrder}
        />
      </TableContainer>
      {isOrdersListLoading ? (
        <Box sx={{ display: 'grid', justifyContent: 'center', alignItems: 'center', marginTop: margins.top16 }}>
          <CircularProgress sx={{ margin: margins.auto }} />
        </Box>
      ) : null}
      <TablePagination
        component="div"
        count={ordersList.totalItems}
        rowsPerPage={ordersList.pageSize}
        page={ordersList.currentPage - 1}
        onPageChange={handleChangePage}
      />
    </Box>
  );
};

export default PatientOrdersList;
