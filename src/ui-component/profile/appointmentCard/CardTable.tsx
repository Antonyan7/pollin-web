import { IPatientAppointment, PatientAppointmentStatuses } from '@axios/booking/managerBookingTypes';
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
import React, { useMemo } from 'react';

import { AppointmentType } from 'types/patientProfile';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { ModalName } from 'types/modals';
import { bookingMiddleware } from '@redux/slices/booking';
import { dispatch } from '@redux/hooks';
import { timeAdjuster } from 'helpers/timeAdjuster';
import { viewsMiddleware } from '@redux/slices/views';

const CardTable = ({
  appointmentsList,
  appointmentType
}: {
  appointmentsList: IPatientAppointment[] | null;
  appointmentType: AppointmentType;
}) => {
  const theme = useTheme();

  const onRowClick = (id: string, status: PatientAppointmentStatuses) => {
    dispatch(bookingMiddleware.getAppointmentDetails(id));

    const shouldOpenDetailsModal =
      status === PatientAppointmentStatuses.Cancelled || appointmentType === AppointmentType.Past;

    if (shouldOpenDetailsModal) {
      dispatch(
        viewsMiddleware.openModal({
          name: ModalName.DetailsAppointmentModal,
          props: { appointmentId: id }
        })
      );

      return;
    }

    if (appointmentType === AppointmentType.Upcoming) {
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
                    textDecoration: status === PatientAppointmentStatuses.Cancelled ? 'line-through' : 'auto'
                  }}
                >
                  {type}
                </Typography>
                <Typography fontWeight="400" variant="h6" color={theme.palette.grey[700]}>
                  {status}
                </Typography>
              </TableCell>
              <TableCell width="35%" sx={{ verticalAlign: 'middle' }}>
                <Typography variant="h5">{timeAdjuster(new Date(date)).customizedDate}</Typography>
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
