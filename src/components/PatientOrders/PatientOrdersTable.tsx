import React, { SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { OrderListSortFields } from '@axios/results/resultsManagerTypes';
import { headCellsData } from '@components/PatientOrders/PatientOrdersHeadCellMockData';
import { HeadCell } from '@components/Table/HeadCell';
import { Divider,Grid, Table, TableBody, TableHead, TableRow, Typography, useTheme } from '@mui/material';
import { ordersSelector } from '@redux/slices/orders';
import { Translation } from 'constants/translations';
import { useAppSelector } from 'redux/hooks';
import { margins, paddings } from 'themes/themeConstants';
import { IHeadCell, SortOrder } from 'types/patient';
import { IOrdersListItem } from 'types/reduxTypes/ordersStateTypes';

import PatientOrdersListRow from './PatientOrdersListRow';

export interface OrdersTableProps {
  setSortField: React.Dispatch<SetStateAction<OrderListSortFields>>;
  setSortOrder: React.Dispatch<SetStateAction<SortOrder>>;
  sortOrder: SortOrder;
  sortField: OrderListSortFields;
}

const PatientOrdersTable = ({ setSortField, setSortOrder, sortOrder, sortField }: OrdersTableProps) => {
  const [t] = useTranslation();
  const ordersList = useAppSelector(ordersSelector.ordersList);
  const headCells = headCellsData(t) as IHeadCell[];
  const isOrdersListLoading = useAppSelector(ordersSelector.isOrdersListLoading);
  const theme = useTheme();

  return (
    <>
      <Table aria-labelledby="tableTitle" sx={{ minWidth: 750, marginTop: margins.top20 }}>
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <HeadCell
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
          {!isOrdersListLoading
            ? ordersList.orders.map((orderRow: IOrdersListItem) => (
                <PatientOrdersListRow row={orderRow} key={orderRow.id} />
              ))
            : null}
        </TableBody>
      </Table>
      {!isOrdersListLoading && !ordersList.orders.length ? (
        <>
          <Grid container justifyContent="center" padding={paddings.all20}>
            <Grid item>
              <Typography color={theme.palette.primary.main} variant="h4">
                {t(Translation.PAGE_ORDER_DETAILS_THERE_ARE_NO_AVAILABLE_ORDERS)}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
        </>
      ) : null}
    </>
  );
};

export default PatientOrdersTable;
