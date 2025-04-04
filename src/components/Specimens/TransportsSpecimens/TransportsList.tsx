import React, { useEffect, useMemo, useState } from 'react';
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
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import findCurrentAction from 'helpers/findCurrentAction';
import { paddings } from 'themes/themeConstants';
import { IHeadCell, SortOrder } from 'types/patient';
import { ITransportListFolderProps } from 'types/reduxTypes/resultsStateTypes';

import CircularLoading from '@ui-component/circular-loading';

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
  const shouldRefetchTransportsList = useAppSelector(resultsSelector.shouldRefetchTransportsList);

  const headCells = headCellsData(t) as IHeadCell[];

  const listFetchParams: ITransportListReqBody = useMemo(
    () => ({
      date: calendarDate,
      page: page + 1,
      ...(searchedItems.length > 0 ? { specimens: searchedItems.map((identifier) => ({ identifier })) } : {}),
      ...(sortField ? { sortByField: sortField } : {}),
      ...(sortOrder ? { sortOrder } : {})
    }),
    [calendarDate, page, searchedItems, sortField, sortOrder]
  );

  useEffect(() => {
    dispatch(resultsMiddleware.getTransportList(listFetchParams));
  }, [listFetchParams]);

  useEffect(() => {
    if (shouldRefetchTransportsList) {
      if (listFetchParams.page === 1) {
        dispatch(resultsMiddleware.getTransportList(listFetchParams));
      } else {
        setPage(0);
      }

      dispatch(resultsMiddleware.setShouldRefetchTransportsList(false));
    }
  }, [listFetchParams, shouldRefetchTransportsList]);

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
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          data-cy={CypressIds.PAGE_SPECIMEN_TRACKING_TRANSPORT_LIST}
        >
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
              {transportList?.folders?.map((row: ITransportListFolderProps, index: number) => {
                const filteredActions = findCurrentAction(actionVariations, row);

                return (
                  <TransportsListRow
                    row={row}
                    key={row.id}
                    index={index}
                    actions={filteredActions ? filteredActions.actions : []}
                  />
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
        labelRowsPerPage={`${t(Translation.COMMON_PAGINATION_ROWS_COUNT)} :`}
        component="div"
        count={transportList.totalItems}
        rowsPerPage={transportList.pageSize}
        page={transportList.currentPage > 1 ? transportList.currentPage - 1 : 0}
        onPageChange={handleChangePage}
      />
    </>
  );
};

export default TransportsList;
