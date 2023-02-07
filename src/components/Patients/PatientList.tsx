import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import NoResultsFound from '@components/NoResultsFound';
import PatientFilters from '@components/Patients/PatientFilters';
import { headCellsListMockData } from '@components/Patients/PatientHeadCellMockData';
import { PatientListStyled } from '@components/Patients/PatientListStyled';
import PatientTableRow from '@components/Patients/PatientTableRow';
import { HeadCell } from '@components/Table/HeadCell';
import { Table, TableBody, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { Translation } from 'constants/translations';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';
import { paddings } from 'themes/themeConstants';
import { IPatientsFilterOption, IPatientsReqBody, PatientListField, SortOrder } from 'types/patient';
import { IPatientListData } from 'types/reduxTypes/patient-emrStateTypes';

import CircularLoading from '@ui-component/circular-loading';

const PatientList = () => {
  const [searchValue, setSearchValue] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Desc);
  const [sortField, setSortField] = useState<PatientListField>(PatientListField.CYCLE_STATUS);
  const [filters, setFilters] = useState<Omit<IPatientsFilterOption, 'title'>[]>([]);
  const [page, setPage] = React.useState(0);
  const [t] = useTranslation();

  const headCells = headCellsListMockData;
  const patientsList = useAppSelector(patientsSelector.patientsList);
  const isPatientListLoading = useAppSelector(patientsSelector.isPatientsListLoading);

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    const data: IPatientsReqBody = {
      searchString: searchValue,
      sortByField: sortField,
      sortOrder,
      page: page + 1,
      ...(filters.length > 0 ? { filters } : {})
    };

    dispatch(patientsMiddleware.getPatientsList(data));
  }, [filters, page, searchValue, sortField, sortOrder]);

  useEffect(() => {
    setPage(0);
  }, [filters, searchValue]);

  const areNotAnyAvailableResults = patientsList.totalItems === 0;
  const notAvailableResultsLabel = t(Translation.PAGE_PATIENT_LIST_NOT_AVAILABLE);
  const notFoundAnyResultsLabel = t(Translation.PAGE_PATIENT_LIST_NOT_FOUND);
  const areNotFoundAnyResults = (searchValue || filters.length) && areNotAnyAvailableResults;

  return (
    <PatientListStyled>
      <PatientFilters setSearchValue={setSearchValue} setFiltersChange={setFilters} />
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <HeadCell
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
          {!isPatientListLoading && (
            <TableBody>
              {patientsList.patients.map((row: IPatientListData, index) => (
                <PatientTableRow row={row} index={index} key={row.id} />
              ))}
            </TableBody>
          )}
        </Table>
        {isPatientListLoading ? (
          <CircularLoading sx={{ py: paddings.topBottom32 }} />
        ) : (
          areNotAnyAvailableResults && (
            <NoResultsFound
              label={areNotFoundAnyResults ? notFoundAnyResultsLabel : notAvailableResultsLabel}
              pt={paddings.top24}
            />
          )
        )}
      </TableContainer>
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
