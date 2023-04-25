import React from 'react';
import { useTranslation } from 'react-i18next';
import { HeadCell } from '@components/Table/HeadCell';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { bookingSelector } from '@redux/slices/booking';
import { tasksSelector } from '@redux/slices/tasks';
import { IHeadCell } from 'types/patient';
import { ICheckInAppointment } from 'types/reduxTypes/bookingStateTypes';

import CheckInRow from './CheckInRow';
import { headCellsData } from './HeadCellData';

const TableComponent = () => {
  const [t] = useTranslation();
  const isTasksLoading = useAppSelector(tasksSelector.isTasksLoading);
  const appointments = useAppSelector(bookingSelector.checkInAppointmentsList);
  const headCells = headCellsData(t) as IHeadCell[];

  return (
    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
      <TableHead>
        <TableRow>
          <TableCell />
          {headCells.map((headCell) => (
            <HeadCell headCell={headCell} key={headCell.id} />
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {!isTasksLoading
          ? appointments?.map((row: ICheckInAppointment) => <CheckInRow key={row.id} row={row} />)
          : null}
      </TableBody>
    </Table>
  );
};

export default TableComponent;
