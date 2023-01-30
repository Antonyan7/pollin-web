import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITransportListReqBody, TransportsSortFields } from '@axios/results/resultsManagerTypes';
import { HeadCell } from '@components/Table/HeadCell';
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme} from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { bookingSelector } from '@redux/slices/booking';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { Translation } from 'constants/translations';
import { format } from 'date-fns';
import findCurrentAction from 'helpers/findCurrentAction';
import { margins } from 'themes/themeConstants';
import { IHeadCell, SortOrder } from 'types/patient';
import { ITransportListFolderProps } from 'types/reduxTypes/resultsStateTypes';

import useTestResultPopupMessage from './hooks/useTransportsToast';
import { headCellsData } from './headCellsData';
import Header from './Header';
import { TransportsListRow } from './TransportsListRow';

const TransportsList = () => {
  const [page, setPage] = useState<number>(0);
  const [sortField, setSortField] = useState<TransportsSortFields | null>(TransportsSortFields.STATUS);
  const [sortOrder, setSortOrder] = useState<SortOrder | null>(SortOrder.Desc);
  const transportList = useAppSelector(resultsSelector.transportList);
  const calendarDate = useAppSelector(bookingSelector.calendarDate);
  const isTransportListLoading = useAppSelector(resultsSelector.isTransportListLoading);
  const [t] = useTranslation();
  const headCells = headCellsData(t) as IHeadCell[];
  const theme = useTheme();

  useTestResultPopupMessage();

  useEffect(() => {
    const data: ITransportListReqBody = {
      date: format(new Date(calendarDate), "yyyy-MM-dd'T'HH:mm:ss+00:00"),
      page: page + 1,
      ...(sortField ? { sortByField: sortField } : {}),
      ...(sortOrder ? { sortOrder } : {})
    };

    dispatch(resultsMiddleware.getTransportList(data));
  }, [calendarDate, page, sortField, sortOrder]);

  useEffect(() => {
    dispatch(resultsMiddleware.getTransportActions());
  }, []);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };
  const transportActions = useAppSelector(resultsSelector.transportActions);
  const handlePageChange = () => {
    setPage(page);
  };

  return (
    <>
      <Header handlePageChange={handlePageChange} />
      <TableContainer>
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
            </TableRow>
          </TableHead>
          <TableBody>
            <TableBody />
            {isTransportListLoading ? (
              <Box sx={{ display: 'grid', justifyContent: 'center', alignItems: 'center', marginTop: margins.top16 }}>
                <CircularProgress sx={{ margin: margins.auto }} />
              </Box>
            ) : null}
            {transportList?.folders?.map((row: ITransportListFolderProps) => {
              const filteredSpecimenAction = findCurrentAction(transportActions, row);

              return (
                <TransportsListRow
                  row={row}
                  key={row.id}
                  actions={filteredSpecimenAction ? filteredSpecimenAction.actions : []}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {!transportList?.folders.length && !isTransportListLoading ? (
        <>
          <Grid container justifyContent="center" padding="20px">
            <Grid item>
              <Typography color={theme.palette.primary.main} variant="h4">
                {t(Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_EMPTY_TABLE)}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
        </>
      ) : null}
      <TablePagination
        component="div"
        count={transportList.totalItems}
        rowsPerPage={transportList.pageSize}
        page={transportList.currentPage - 1}
        onPageChange={handleChangePage}
      />
    </>
  );
};

export default TransportsList;
