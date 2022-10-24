import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import bookingHelpers from '@axios/booking/bookingHelpers';
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
  const [orderBy, setOrderBy] = useState<Exclude<HeadCell['id'], 'time'> | undefined>();
  const [order, setOrder] = useState<SortOrder | undefined>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  const [tableData, setTableData] = useState<IPatientAppointment[]>([]);
  const [isTableDataLoading, setIsTableDataLoading] = useState(false);

  useEffect(() => {
    if (!isTableDataLoading) {
      bookingHelpers.getAppointmentsListFromParams().then((response) => {
        if (response) {
          const { data, totalItems } = response;

          setTableData(data?.appointments ?? []);
          setRowsPerPage(data?.appointments.length ?? 0);
          setTotalRows(totalItems);
        }
      });
      setIsTableDataLoading(false);
    }
  }, [isTableDataLoading]);

  const onTableHeadCellClick = async (newOrderBy: Exclude<HeadCell['id'], 'time'>) => {
    const newOrder = order === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc;
    const response = await bookingHelpers.getAppointmentsListFromParams({
      search: '',
      page,
      order: orderBy === newOrderBy ? newOrder : SortOrder.Asc,
      orderBy: newOrderBy
    });

    if (response) {
      const { data } = response;

      if (orderBy === newOrderBy) {
        setOrder(newOrder);
      } else {
        setOrderBy(newOrderBy);
        setOrder(SortOrder.Asc);
      }

      setTableData(data.appointments);
    }
  };

  const onTablePageChange: TablePaginationProps['onPageChange'] = async (_e, newPage) => {
    const response = await bookingHelpers.getAppointmentsListFromParams({
      search: '',
      page: newPage,
      order,
      orderBy
    });

    if (response) {
      const { data } = response;

      setPage(newPage);
      setTableData(data.appointments);
      setRowsPerPage(data.appointments.length);
    }
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  onClick={() => headCell.id !== 'time' && onTableHeadCellClick(headCell.id)}
                >
                  {headCell.id !== 'time' ? (
                    <TableSortLabel direction={headCell.id === orderBy ? order : undefined}>
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
            {tableData.map(({ id, type, date, time, status }) => (
              <TableRow key={id}>
                <TableCell>{type}</TableCell>
                <TableCell>{format(new Date(date), 'MMM dd, yyyy')}</TableCell>
                <TableCell>{time}</TableCell>
                <TableCell>{status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[rowsPerPage]}
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onTablePageChange}
      />
    </>
  );
};

export default AppointmentsListTable;
