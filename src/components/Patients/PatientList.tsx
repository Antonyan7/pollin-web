import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PatientFilters from '@components/Patients/PatientFilters';
import { headCellsListMockData } from '@components/Patients/PatientHeadCellMockData';
import { PatientListStyled } from '@components/Patients/PatientListStyled';
import PatientTableRow from '@components/Patients/PatientTableRow';
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { Translation } from 'constants/translations';
import { IPatient, IPatientsFilterOption, IPatientsReqBody, PatientListField, SortOrder } from 'types/patient';
import { IPatientListData } from 'types/reduxTypes/patient-emr';

import { dispatch, useAppSelector } from '../../redux/hooks';
import { patientsMiddleware, patientsSelector } from '../../redux/slices/patients';

import { PatientListHeadCell } from './PatientListHeadCell';

const PatientList = () => {
  const [rows] = useState<IPatient[]>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(25);
  const [searchValue, setSearchValue] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESCENDING);
  const [sortField, setSortField] = useState<PatientListField>(PatientListField.CYCLE_STATUS);
  const [filters, setFilters] = useState<IPatientsFilterOption[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const { t } = useTranslation();

  const headCells = headCellsListMockData;
  const emptyRows = useMemo(
    () => (page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0),
    [page, rowsPerPage, rows.length]
  );
  const patientsList = useAppSelector(patientsSelector.patientsList);
  const isPatientListLoading = useAppSelector(patientsSelector.isPatientsListLoading);

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
          {isPatientListLoading ? (
            <Box sx={{ display: 'grid', justifyContent: 'center', alignItems: 'center' }}>
              <p style={{ margin: 'auto' }}>
                <CircularProgress />
              </p>
            </Box>
          ) : (
            <>
              <TableHead>
                <TableRow>
                  {headCells.map((headCell) => (
                    <PatientListHeadCell
                      headCell={headCell}
                      sortOrder={sortOrder}
                      setSortOrder={setSortOrder}
                      sortField={sortField}
                      setSortField={setSortField}
                      key={headCell.id}
                    />
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {patientsList.patients
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: IPatientListData, index) => (
                    <PatientTableRow row={row} index={index} key={row.id} />
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
            </>
          )}
        </Table>
      </TableContainer>

      <TablePagination
        labelRowsPerPage={<>{t(Translation.COMMON_PAGINATION_ROWS_COUNT)}</>}
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
