import React, { SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { OrderListSortFields } from '@axios/results/resultsManagerTypes';
import { headCellsData } from '@components/PatientOrders/PatientOrdersHeadCellMockData';
import { PatientOrdersListHeadCell } from '@components/PatientOrders/PatientOrdersListHeadCell';
import { Table, TableBody, TableHead, TableRow } from '@mui/material';
import { resultsSelector } from '@redux/slices/results';
import { useAppSelector } from 'redux/hooks';
import { IHeadCell, SortOrder } from 'types/patient';
import { IOrdersListItem } from 'types/reduxTypes/resultsStateTypes';

import PatientOrdersListRow from './PatientOrdersListRow';

export interface OrdersTableProps {
  setSortField: React.Dispatch<SetStateAction<OrderListSortFields>>;
  setSortOrder: React.Dispatch<SetStateAction<SortOrder>>;
  sortOrder: SortOrder;
  sortField: OrderListSortFields;
}

const PatientOrdersTable = ({ setSortField, setSortOrder, sortOrder, sortField }: OrdersTableProps) => {
  const [t] = useTranslation();
  const ordersList = useAppSelector(resultsSelector.ordersList);
  const headCells = headCellsData(t) as IHeadCell[];
  const isOrdersListLoading = useAppSelector(resultsSelector.isOrdersListLoading);

  return (
    <Table aria-labelledby="tableTitle" sx={{ minWidth: 750 }}>
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <PatientOrdersListHeadCell
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
  );
};

export default PatientOrdersTable;
