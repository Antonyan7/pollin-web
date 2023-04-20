import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IOrderResultsListReqBody, OrderResultsSortFields } from '@axios/results/resultsManagerTypes';
import { HeadCell } from '@components/Table/HeadCell';
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { ordersMiddleware, ordersSelector } from '@redux/slices/orders';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { margins, paddings } from 'themes/themeConstants';
import { IHeadCell, SortOrder } from 'types/patient';
import { IOrderResultsByPatientItem } from 'types/reduxTypes/ordersStateTypes';
import { IOrderResultsFilterOptions } from 'types/results';

import EmrOrdersAndResultsTabs from '../../layout/PatientOrdersAndResultsLayout';

import AutocompleteWrapper from './AutocompleteWrapper';
import { headCellsData } from './OrderResultsHeadCellMockData';
import { OrderResultsRow } from './OrderResultsRow';

const OrderResults = () => {
  const theme = useTheme();
  const router = useRouter();
  const patientId = router.query.id as string;
  const [page, setPage] = useState<number>(0);
  const [sortField, setSortField] = useState<OrderResultsSortFields | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder | null>(SortOrder.Desc);
  const [selectedFilters, setSelectedFilters] = useState<IOrderResultsFilterOptions[]>([]);
  const orderResultsByPatientList = useAppSelector(ordersSelector.orderResultsByPatientList);
  const isOrderResultsByPatientListLoading = useAppSelector(ordersSelector.isOrderResultsByPatientListLoading);
  const shouldUpdateOrderResultsList = useAppSelector(ordersSelector.shouldUpdateOrderResultsList);
  const filtersList = useAppSelector(ordersSelector.orderResultsFilters);
  const isFiltersLoading = useAppSelector(ordersSelector.isOrderResultsFiltersLoading);

  const statuses = useAppSelector(ordersSelector.orderResultsStatuses);

  const [t] = useTranslation();
  const headCells = headCellsData(t) as IHeadCell[];

  const filterLabel = t(Translation.PAGE_PATIENT_ORDER_RESULTS_FILTER_LABEL);

  const orderResultsListRequestBody: IOrderResultsListReqBody = useMemo(
    () => ({
      patientId,
      ...(selectedFilters.length > 0 ? { filters: selectedFilters.map(({ type, id }) => ({ type, id })) } : {}),
      ...(sortField ? { sortByField: sortField } : {}),
      ...(sortField && sortOrder ? { sortOrder } : {}),
      page: page + 1
    }),
    [page, selectedFilters, sortField, sortOrder, patientId]
  );

  useEffect(() => {
    dispatch(ordersMiddleware.getOrderResultsFilters());
    dispatch(ordersMiddleware.getOrderResultsStatuses());
  }, []);

  useEffect(() => {
    dispatch(ordersMiddleware.getOrderResultsListForPatient(orderResultsListRequestBody));
  }, [orderResultsListRequestBody]);

  useEffect(() => {
    if (shouldUpdateOrderResultsList) {
      if (orderResultsListRequestBody.page === 1) {
        dispatch(ordersMiddleware.getOrderResultsListForPatient(orderResultsListRequestBody));
      } else {
        setPage(0);
      }

      dispatch(ordersMiddleware.setShouldUpdateOrderResultsList(false));
    }
  }, [shouldUpdateOrderResultsList, orderResultsListRequestBody]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const filterChangeHandler = useCallback((curFilters: IOrderResultsFilterOptions[]) => {
    setPage(0);
    setSelectedFilters(curFilters);
  }, []);

  return (
    <>
      <EmrOrdersAndResultsTabs />
      <AutocompleteWrapper
        onChange={filterChangeHandler}
        label={filterLabel}
        filtersList={filtersList}
        loading={isFiltersLoading}
        data-cy={CypressIds.PAGE_ORDER_RESULTS_FILER_RESULTS}
      />

      <TableContainer
        sx={{
          pt: paddings.top42
        }}
      >
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
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
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {orderResultsByPatientList?.testResults?.map((row: IOrderResultsByPatientItem) => {
              const actions = statuses.find((item) => item.status === row.status)?.actions ?? [];

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
      {!isOrderResultsByPatientListLoading && orderResultsByPatientList.totalItems === 0 ? (
        <>
          <Grid container justifyContent="center" padding={paddings.all20}>
            <Grid item>
              <Typography color={theme.palette.primary.main} variant="h4">
                {t(Translation.PAGE_PATIENT_TEST_RESULTS_NO_AVAILABLE_TEST_RESULTS)}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
        </>
      ) : null}
      <TablePagination
        labelRowsPerPage={`${t(Translation.COMMON_PAGINATION_ROWS_COUNT)} :`}
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
