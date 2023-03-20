import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITransportListReqBody, TransportsSortFields } from '@axios/results/resultsManagerTypes';
import { HeadCell } from '@components/Table/HeadCell';
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { Translation } from 'constants/translations';
import findCurrentAction from 'helpers/findCurrentAction';
import { paddings } from 'themes/themeConstants';
import { IHeadCell, SortOrder } from 'types/patient';
import { ITransportListFolderProps } from 'types/reduxTypes/resultsStateTypes';

import CircularLoading from '@ui-component/circular-loading';

import useTestResultPopupMessage from './hooks/useTransportsToast';
import { headCellsData } from './headCellsData';
import Header from './Header';
import { TransportsListRow } from './TransportsListRow';

const TransportsList = () => {
  const [t] = useTranslation();
  const theme = useTheme();
  const [page, setPage] = useState<number>(0);
  const [sortField, setSortField] = useState<TransportsSortFields | null>(TransportsSortFields.STATUS);
  const [sortOrder, setSortOrder] = useState<SortOrder | null>(SortOrder.Asc);
  const [searchedItems, setSearchedItems] = useState<string[]>([]);
  const calendarDate = useAppSelector(resultsSelector.transportListDate);
  const transportList = useAppSelector(resultsSelector.transportList);
  const isLoading = useAppSelector(resultsSelector.isTransportListLoading);
  const actionVariations = useAppSelector(resultsSelector.transportActions);

  const headCells = headCellsData(t) as IHeadCell[];

  useTestResultPopupMessage();

  useEffect(() => {
    const data: ITransportListReqBody = {
      date: calendarDate,
      page: page + 1,
      ...(searchedItems.length > 0 ? { specimens: searchedItems.map((identifier) => ({ identifier })) } : {}),
      ...(sortField ? { sortByField: sortField } : {}),
      ...(sortOrder ? { sortOrder } : {})
    };

    dispatch(resultsMiddleware.getTransportList(data));
  }, [calendarDate, page, searchedItems, sortField, sortOrder]);

  useEffect(() => {
    if (!actionVariations.length) {
      dispatch(resultsMiddleware.getTransportActions());
    }
  }, [actionVariations]);

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };
  const searchByIdsHandler = (newSearchedItems: string[]) => {
    setSearchedItems(newSearchedItems);
    setPage(0);
  };

  return (
    <>
      <Header searchedItems={searchedItems} searchByIdsHandler={searchByIdsHandler} />
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

          {!isLoading && (
            <TableBody>
              {transportList?.folders?.map((row: ITransportListFolderProps) => {
                const filteredActions = findCurrentAction(actionVariations, row);

                return (
                  <TransportsListRow row={row} key={row.id} actions={filteredActions ? filteredActions.actions : []} />
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {isLoading && (
        <CircularLoading
          sx={{
            py: paddings.topBottom16
          }}
        />
      )}
      {!transportList?.folders.length && !isLoading ? (
        <>
          <Grid container justifyContent="center" padding="20px">
            <Grid item>
              <Typography color={theme.palette.primary.main} variant="h4">
                {!searchedItems.length
                  ? t(Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_EMPTY_TABLE)
                  : t(Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_EMPTY_TABLE_FILTER)}
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
