import React, { useState } from 'react';
import PatientFilters from '@components/Patients/PatientFilters';
import { headCellsListMockData } from '@components/Patients/PatientHeadCellMockData';
import { rowsMock } from '@components/Patients/PatientListMockData';
import { PatientListStyled } from '@components/Patients/PatientListStyled';
import PatientTableRow from '@components/Patients/PatientTableRow';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from '@mui/material';

import { IPatient } from '../../types/patient';

const PatientList = () => {
  const [rows] = useState<IPatient[]>(rowsMock);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(25);
  const [page, setPage] = React.useState<number>(0);
  const headCells = headCellsListMockData;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    if (event?.target.value) {
      setRowsPerPage(parseInt(event?.target.value, 10));
    }

    setPage(0);
  };

  return (
    <PatientListStyled>
      <PatientFilters />
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell key={headCell.id} align={headCell.align}>
                  {headCell.label ? (
                    <TableSortLabel
                      sx={{
                        paddingLeft: headCell.paddingLeft
                      }}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  ) : (
                    <TableSortLabel
                      hideSortIcon
                      sx={{
                        paddingLeft: headCell.paddingLeft
                      }}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: IPatient, index) => (
              <PatientTableRow row={row} index={index} />
            ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[25, 40, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </PatientListStyled>
  );
};

export default PatientList;
