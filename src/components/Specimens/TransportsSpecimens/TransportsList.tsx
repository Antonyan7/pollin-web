import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITransportListReqBody, TransportsSortFields } from '@axios/results/resultsManagerTypes';
import { SeveritiesType } from '@components/Scheduling/types';
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
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { margins } from 'themes/themeConstants';
import { IHeadCell, SortOrder } from 'types/patient';
import { ITransportListFolderProps } from 'types/reduxTypes/resultsStateTypes';

import { headCellsData } from './headCellsData';
import { TransportsHeadCell } from './TransportsHeadCell';
import { TransportsListRow } from './TransportsListRow';

const TransportsList = () => {
  const [page, setPage] = useState<number>(0);
  const [sortField, setSortField] = useState<TransportsSortFields | null>(TransportsSortFields.STATUS);
  const [sortOrder, setSortOrder] = useState<SortOrder | null>(SortOrder.Desc);
  const transportList = useAppSelector(resultsSelector.transportList);
  const allTestsSpecimensListLoading = useAppSelector(resultsSelector.isAllTestsSpecimensListLoading);
  const [t] = useTranslation();
  const headCells = headCellsData(t) as IHeadCell[];

  useEffect(() => {
    const data: ITransportListReqBody = {
      date: '2020-12-12T16:53:10+01:00',
      page: page + 1,
      ...(sortField ? { sortByField: sortField } : {}),
      ...(sortOrder ? { sortOrder } : {})
    };

    dispatch(resultsMiddleware.getTransportList(data));
  }, [page, sortField, sortOrder]);

  useEffect(() => {
    dispatch(resultsMiddleware.getTransportActions());
  }, []);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };
  const transportActions = useAppSelector(resultsSelector.transportActions);
  const testResultStateStatus = useAppSelector(resultsSelector.testResultStateStatus);

  useEffect(() => {
    if (testResultStateStatus.success) {
      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.success,
            description: t(Translation.PAGE_SCHEDULING_APPLY_ALERT_SUCCESS)
          }
        })
      );
    } else if (testResultStateStatus.fail) {
      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.error,
            description: t(Translation.PAGE_SCHEDULING_APPLY_ALERT_ERROR)
          }
        })
      );
    }

    dispatch(resultsMiddleware.resetTestResultsState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testResultStateStatus.success, testResultStateStatus.fail]);

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TransportsHeadCell
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
            {transportList?.folders?.map((row: ITransportListFolderProps) => {
              const filteredSpecimenActions = transportActions.find((item) => item.status === row.status);

              return (
                <TransportsListRow
                  row={row}
                  key={row.id}
                  actions={filteredSpecimenActions ? filteredSpecimenActions.actions : []}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {allTestsSpecimensListLoading ? (
        <Box sx={{ display: 'grid', justifyContent: 'center', alignItems: 'center', marginTop: margins.top16 }}>
          <CircularProgress sx={{ margin: margins.auto }} />
        </Box>
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
