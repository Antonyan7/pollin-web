import React, { useEffect, useMemo, useState } from 'react';
import PatientFilters from '@components/Patients/PatientFilters';
import { headCellsListMockData } from '@components/Patients/PatientHeadCellMockData';
import { PatientListStyled } from '@components/Patients/PatientListStyled';
import PatientTableRow from '@components/Patients/PatientTableRow';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';

import { dispatch, useAppSelector } from '../../redux/hooks';
import { patientsMiddleware, patientsSelector } from '../../redux/slices/patients';
import { IPatient, IPatientsReqBody, PatientListField, SortOrder } from '../../types/patient';

import { PatientListHeadCell } from './PatientListHeadCell';

const PatientList = () => {
  const [rows] = useState<IPatient[]>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(25);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filters, setFilters] = useState<any[]>([]);
  const [sortOrder] = useState<SortOrder>(SortOrder.ASCENDING);
  const [sortField] = useState<PatientListField>(PatientListField.CYCLE_STATUS);
  const [page, setPage] = React.useState<number>(0);
  const headCells = headCellsListMockData;
  const emptyRows = useMemo(
    () => (page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0),
    [page, rowsPerPage, rows.length]
  );
  const patientsList = useAppSelector(patientsSelector.patientsList);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    if (event?.target.value) {
      setRowsPerPage(parseInt(event?.target.value, 10));
    }

    setPage(0);
  };

  useEffect(() => {
    const data: IPatientsReqBody = {
      searchString: searchValue,
      sortByField: sortField,
      sortOrder,
      filters,
      page: page + 1
    };

    dispatch(patientsMiddleware.getPatientsList(data));
  }, [filters, page, searchValue, sortField, sortOrder]);

  return (
    <PatientListStyled>
      <PatientFilters setSearchValue={setSearchValue} setFiltersChange={setFilters} />
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <PatientListHeadCell headCell={headCell} />
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {patientsList.patients
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: IPatient, index) => (
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
