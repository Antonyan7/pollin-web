import React, { useMemo } from 'react';
import { IPatientAppointment } from '@axios/booking/managerBookingTypes';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';
import { dispatch } from '@redux/hooks';
import { bookingMiddleware } from '@redux/slices/booking';
import { viewsMiddleware } from '@redux/slices/views';
import { nonEditableAppointmentStatuses } from 'helpers/constants';
import { ModalName } from 'types/modals';
import { AppointmentStatus } from 'types/reduxTypes/bookingStateTypes';

import { DateUtil } from '@utils/date/DateUtil';

const CardTable = ({ appointmentsList }: { appointmentsList: IPatientAppointment[] | null }) => {
  const theme = useTheme();

  const onRowClick = (id: string, status: AppointmentStatus) => {
    dispatch(bookingMiddleware.getAppointmentDetails(id));

    const shouldOpenDetailsModal = nonEditableAppointmentStatuses.includes(status);

    if (shouldOpenDetailsModal) {
      dispatch(
        viewsMiddleware.openModal({
          name: ModalName.DetailsAppointmentModal,
          props: { appointmentId: id }
        })
      );
    } else {
      dispatch(
        viewsMiddleware.openModal({
          name: ModalName.EditAppointmentModal,
          props: { appointmentId: id }
        })
      );
    }
  };

  const appointmentsToDisplay = useMemo(() => (appointmentsList ?? []).slice(0, 3), [appointmentsList]);

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {appointmentsToDisplay.map(({ id, status, type, date, time }) => (
            <TableRow hover key={id} onClick={() => onRowClick(id, status)}>
              <TableCell width="65%" sx={{ verticalAlign: 'middle' }}>
                <Typography
                  variant="h5"
                  sx={{
                    textDecoration: status === AppointmentStatus.Cancelled ? 'line-through' : 'auto'
                  }}
                >
                  {type}
                </Typography>
                <Typography fontWeight="400" variant="h6" color={theme.palette.grey[700]}>
                  {status}
                </Typography>
              </TableCell>
              <TableCell width="35%" sx={{ verticalAlign: 'middle' }}>
                <Typography variant="h5">{DateUtil.formatDateOnly(date)}</Typography>
                <Typography fontWeight="400" variant="h6" color={theme.palette.grey[700]}>
                  {time}
                </Typography>
              </TableCell>
              <TableCell width="10%">
                <Stack>
                  <IconButton>
                    <ChevronRightOutlinedIcon />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CardTable;
