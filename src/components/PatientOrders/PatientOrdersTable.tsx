import React, { SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { OrderListSortFields } from '@axios/results/resultsManagerTypes';
import { headCellsData } from '@components/PatientOrders/PatientOrdersHeadCellMockData';
import { PatientOrdersListHeadCell } from '@components/PatientOrders/PatientOrdersListHeadCell';
import { Table, TableBody, TableHead, TableRow } from '@mui/material';
import { resultsSelector } from '@redux/slices/results';
import { useAppSelector } from 'redux/hooks';
import { IHeadCell, SortOrder } from 'types/patient';

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
    <Table aria-labelledby="tableTitle">
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
          ? ordersList.orders.map(
              () =>
                // const orderLabelId = `orders-list-table-item-${index}`;
                // ticket responsible for creating layout, next ticket will cover all.
                null
            )
          : null}
      </TableBody>
    </Table>
  );
};

export default PatientOrdersTable;
