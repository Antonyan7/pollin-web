import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { SortOrder } from 'types/patient';

// table header options
const headCells = [
  {
    id: 'appointment',
    label: 'Appointment'
  },
  {
    id: 'date',
    label: 'Date'
  },
  {
    id: 'time',
    label: 'Time'
  },
  {
    id: 'status',
    label: 'Statue'
  }
];

const AppointmentsListTable = () => (
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell key={headCell.id}>
              <TableSortLabel direction={SortOrder.Asc}>{headCell.label}</TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Care Plan Follow Up</TableCell>
          <TableCell>Jan 15, 2022</TableCell>
          <TableCell>12:30 P.M.</TableCell>
          <TableCell>Confirmed</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
);

export default AppointmentsListTable;
