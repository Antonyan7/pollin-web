import React, { useEffect, useState } from 'react';
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
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { Translation } from 'constants/translations';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';
import { margins } from 'themes/themeConstants';
import { IPatientsFilterOption, IPatientsReqBody, PatientListField, SortOrder } from 'types/patient';
import { IPatientListData } from 'types/reduxTypes/patient-emrStateTypes';

import { PatientListHeadCell } from './PatientListHeadCell';

const PatientList = () => {
  const [searchValue, setSearchValue] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Desc);
  const [sortField, setSortField] = useState<PatientListField>(PatientListField.CYCLE_STATUS);
  const [filters, setFilters] = useState<IPatientsFilterOption[]>([]);
  const [page, setPage] = React.useState(0);
  const [t] = useTranslation();

  const headCells = headCellsListMockData;
  const patientsList = useAppSelector(patientsSelector.patientsList);
  const isPatientListLoading = useAppSelector(patientsSelector.isPatientsListLoading);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    const data: IPatientsReqBody = {
      searchString: searchValue,
      sortByField: sortField,
      sortOrder,
      page: page + 1
    };

    if (filters.length) {
      data.filters = filters;
    }

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
            {patientsList.patients.map((row: IPatientListData, index) => (
              <PatientTableRow row={row} index={index} key={row.id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isPatientListLoading ? (
        <Box sx={{ display: 'grid', justifyContent: 'center', alignItems: 'center', marginTop: margins.top16 }}>
          <CircularProgress sx={{ margin: margins.auto }} />
        </Box>
      ) : null}
      <TablePagination
        labelRowsPerPage={<>{t(Translation.COMMON_PAGINATION_ROWS_COUNT)}</>}
        component="div"
        count={patientsList.totalItems}
        rowsPerPage={patientsList.pageSize}
        page={patientsList.currentPage - 1}
        onPageChange={handleChangePage}
      />
    </PatientListStyled>
  );
};

export default PatientList;
