import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IPatientAppointment, PatientAppointmentStatuses } from '@axios/booking/managerBookingTypes';
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
  const currentPatientId = useAppSelector(patientsSelector.currentPatientId);
  const { list, orderBy, order, selectedFilters, filters } = useAppSelector(patientsSelector.patientAppointments);
  const { appointments: tableData, totalItems, pageSize, currentPage } = list;

  useEffect(() => {
    if (tableData === null && filters !== null && currentPage) {
      dispatch(
        patientsMiddleware.getPatientAppointments(currentPatientId, currentPage, order, orderBy, selectedFilters)
      );
    }
  }, [currentPage, selectedFilters, order, orderBy, tableData, filters, currentPatientId]);

  const onTableHeadCellClick = async (newOrderBy: Exclude<HeadCell['id'], 'time'>) => {
    const switchOrder = order === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc;
    const newOrder = orderBy === newOrderBy ? switchOrder : SortOrder.Asc;

    dispatch(
      patientsMiddleware.getPatientAppointments(currentPatientId, currentPage, newOrder, newOrderBy, selectedFilters)
    );
  };

  const onTablePageChange: TablePaginationProps['onPageChange'] = async (_e, newPage) => {
    dispatch(patientsMiddleware.getPatientAppointments(currentPatientId, newPage + 1, order, orderBy, selectedFilters));
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => {
                const isDirectionMatch = headCell.id === orderBy?.toLowerCase() && order;

                return (
                  <TableCell key={headCell.id}>
                    {headCell.id !== 'time' ? (
                      <TableSortLabel
                        direction={isDirectionMatch ? order : undefined}
                        onClick={() => onTableHeadCellClick(headCell.id as Exclude<HeadCell['id'], 'time'>)}
                      >
                        <Typography fontWeight={500}>{t(headCell.label)}</Typography>
                      </TableSortLabel>
                    ) : (
                      <Typography fontWeight={500} sx={{ userSelect: 'none' }}>
                        {t(headCell.label)}
                      </Typography>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData &&
              tableData.map(({ id, type, date, time, status }) => {
                const appointmentTypeStyle = status === PatientAppointmentStatuses.Cancelled ? 'line-through' : 'auto';

                return (
                  <TableRow key={id}>
                    <TableCell sx={{ textDecoration: appointmentTypeStyle }}>{type}</TableCell>
                    <TableCell>{format(new Date(date), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>{time}</TableCell>
                    <TableCell>{status}</TableCell>
                  </TableRow>
                );
              })}
            {Array.from({ length: pageSize - (tableData?.length ?? 0) }, (_, i) => (
              <TableRow key={`placeholder-${i}`}>
                <TableCell sx={{ borderColor: 'transparent', userSelect: 'none' }}>&nbsp;</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalItems}
        rowsPerPage={pageSize}
        page={Math.max(0, currentPage - 1)}
        onPageChange={onTablePageChange}
      />
    </>
  );
};

export default AppointmentsListTable;
