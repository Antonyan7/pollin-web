import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { IPatientAppointment } from '@axios/booking/managerBookingTypes';
import AddIcon from '@mui/icons-material/Add';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import {
  Button,
  CardActions,
  Grid,
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
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { usePatientProfileNavigatorContext } from 'context/PatientProfileNavigatorContext';
import { PatientProfilePageName } from 'context/types/PatientProfileNavigatorContextTypes';
import { timeAdjuster } from 'helpers/timeAdjuster';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware } from 'redux/slices/views';
import { paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';
import { AppointmentType } from 'types/patientProfile';

import SubCardStyled from '@ui-component/cards/SubCardStyled';

interface Props {
  appointmentType: AppointmentType;
  appointmentsList: IPatientAppointment[] | null;
  filterId: string;
}

const AppointmentsCard = ({ appointmentType, appointmentsList, filterId }: Props) => {
  const [t] = useTranslation();
  const theme = useTheme();
  const { navigateTo } = usePatientProfileNavigatorContext();

  const currentAppointmentType =
    appointmentType === AppointmentType.Upcoming
      ? t(Translation.PAGE_PATIENT_PROFILE_UPCOMING_APPOINTMENTS)
      : t(Translation.PAGE_PATIENT_PROFILE_PAST_APPOINTMENTS);

  const onViewAllClick = () => {
    navigateTo(PatientProfilePageName.AppointmentsList, {
      filterIds: filterId
    });
    dispatch(patientsMiddleware.setCurrentAppointmentType(currentAppointmentType));
  };

  const serviceProviderId = useAppSelector(bookingSelector.serviceProviderId);
  const onRowClick = (id: string) => {
    if (appointmentType === AppointmentType.Upcoming) {
      dispatch(bookingMiddleware.getServiceTypes({ resourceId: serviceProviderId }));
      dispatch(
        viewsMiddleware.openModal({
          name: ModalName.EditAppointmentModal,
          props: { appointmentId: id }
        })
      );
    } else {
      dispatch(
        viewsMiddleware.openModal({
          name: ModalName.DetailsAppointmentModal,
          props: { appointmentId: id }
        })
      );
    }
  };

  const onOpenAppointmentsModalAdd = useCallback(() => {
    dispatch(viewsMiddleware.openModal({ name: ModalName.AddPatientAppointmentsModal, props: {} }));
  }, []);

  return (
    <SubCardStyled
      title={currentAppointmentType}
      secondary={
        appointmentType === AppointmentType.Upcoming && (
          <IconButton>
            <AddIcon onClick={onOpenAppointmentsModalAdd} />
          </IconButton>
        )
      }
      content={false}
    >
      {appointmentsList?.length ? (
        <>
          <TableContainer>
            <Table>
              <TableBody>
                {appointmentsList &&
                  appointmentsList.slice(0, 3).map(({ id, status, type, date, time }) => (
                    <TableRow hover key={id} onClick={() => onRowClick(id)}>
                      <TableCell width="65%" sx={{ verticalAlign: 'middle' }}>
                        <Typography variant="h5">{type}</Typography>
                        <Typography fontWeight="lighter" variant="h6" color={theme.palette.grey[700]}>
                          {status}
                        </Typography>
                      </TableCell>
                      <TableCell width="35%" sx={{ verticalAlign: 'middle' }}>
                        <Typography variant="h5">{timeAdjuster(new Date(date)).customizedDate}</Typography>
                        <Typography fontWeight="lighter" variant="h6" color={theme.palette.grey[700]}>
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
          {appointmentsList && appointmentsList.length > 0 && (
            <CardActions>
              <Grid container justifyContent="right">
                <Button variant="text" onClick={onViewAllClick}>
                  {t(Translation.COMMON_BUTTON_VIEW_ALL)}
                  <ChevronRightOutlinedIcon />
                </Button>
              </Grid>
            </CardActions>
          )}
        </>
      ) : (
        <Typography py={paddings.topBottom24} textAlign="center">
          {t(
            appointmentType === AppointmentType.Upcoming
              ? Translation.PAGE_PATIENT_WIDGET_DATA_IS_NOT_AVAILABLE
              : Translation.PAGE_PATIENT_WIDGET_DATA_NO_PAST_APPOINTMENTS
          )}
        </Typography>
      )}
    </SubCardStyled>
  );
};

export default AppointmentsCard;
