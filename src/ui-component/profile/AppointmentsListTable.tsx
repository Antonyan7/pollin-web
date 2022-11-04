import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IPatientAppointment } from '@axios/booking/managerBookingTypes';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TablePaginationProps,
  TableRow,
  TableSortLabel,
  Typography
} from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { format } from 'date-fns';
import { SortOrder } from 'types/patient';

interface HeadCell {
  id: keyof IPatientAppointment;
  label: string;
}

const headCells: HeadCell[] = [
  {
    id: 'type' as const,
    label: Translation.PAGE_PATIENT_PROFILE_APPOINTMENTS_LIST_TABLE_HEADER_APPOINTMENT
  },
  {
    id: 'date' as const,
    label: Translation.PAGE_PATIENT_PROFILE_APPOINTMENTS_LIST_TABLE_HEADER_DATE
  },
  {
    id: 'time' as const,
    label: Translation.PAGE_PATIENT_PROFILE_APPOINTMENTS_LIST_TABLE_HEADER_TIME
  },
  {
    id: 'status' as const,
    label: Translation.PAGE_PATIENT_PROFILE_APPOINTMENTS_LIST_TABLE_HEADER_STATUS
  }
];

const AppointmentsListTable = () => {
  const [t] = useTranslation();

  const { list, orderBy, order, search, filterId } = useAppSelector(patientsSelector.patientAppointments);
  const { appointments: tableData, totalItems, pageSize, currentPage } = list;

  useEffect(() => {
    if (tableData === null) {
      dispatch(patientsMiddleware.getInitialPatientAppointments());
    }
  }, [tableData]);

  const onTableHeadCellClick = async (newOrderBy: Exclude<HeadCell['id'], 'time'>) => {
    const newOrder = order === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc;

    dispatch(
      patientsMiddleware.getPatientAppointments(
        search,
        filterId,
        currentPage,
        orderBy === newOrderBy ? newOrder : SortOrder.Asc,
        newOrderBy
      )
    );
  };

  const onTablePageChange: TablePaginationProps['onPageChange'] = async (_e, newPage) => {
    dispatch(patientsMiddleware.getPatientAppointments(search, filterId, newPage + 1, order, orderBy));
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell key={headCell.id}>
                  {headCell.id !== 'time' ? (
                    <TableSortLabel
                      direction={headCell.id === orderBy && order ? order : undefined}
                      onClick={() => onTableHeadCellClick(headCell.id as Exclude<HeadCell['id'], 'time'>)}
                    >
                      <Typography fontWeight="bold">{t(headCell.label)}</Typography>
                    </TableSortLabel>
                  ) : (
                    <Typography fontWeight="bold" sx={{ userSelect: 'none' }}>
                      {t(headCell.label)}
                    </Typography>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData &&
              tableData.map(({ id, type, date, time, status }) => (
                <TableRow key={id}>
                  <TableCell>{type}</TableCell>
                  <TableCell>{format(new Date(date), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>{time}</TableCell>
                  <TableCell>{status}</TableCell>
                </TableRow>
              ))}
            {Array.from({ length: pageSize - (tableData?.length ?? 0) }, (_, i) => (
              <TableRow key={`placeholder-${i}`}>
                <TableCell sx={{ borderColor: 'transparent', userSelect: 'none' }}>&nbsp;</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[pageSize]}
        component="div"
        count={totalItems}
        rowsPerPage={pageSize}
        page={currentPage - 1}
        onPageChange={onTablePageChange}
      />
    </>
  );
};

export default AppointmentsListTable;
