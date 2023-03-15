import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  IPatientAppointment,
  PatientAppointmentsSortField,
  PatientAppointmentStatuses
} from '@axios/booking/managerBookingTypes';
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
import { patientsMiddleware, patientsSlice } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { usePatientProfileNavigatorContext } from 'context/PatientProfileNavigatorContext';
import { PatientProfilePageName } from 'context/types/PatientProfileNavigatorContextTypes';
import { timeAdjuster } from 'helpers/timeAdjuster';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware } from 'redux/slices/views';
import { paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';
import { SortOrder } from 'types/patient';
import { AppointmentType } from 'types/patientProfile';

import SubCardStyled from '@ui-component/cards/SubCardStyled';

interface AppointmentsCardProps {
  appointmentType: AppointmentType;
  appointmentsList: IPatientAppointment[] | null;
  filterId: string;
  sortByField: PatientAppointmentsSortField;
  sortOrder: SortOrder;
}

const { setPatientAppointmentsOrderBy, setPatientAppointmentsOrder } = patientsSlice.actions;

const AppointmentsCard = ({
  appointmentType,
  appointmentsList,
  filterId,
  sortByField,
  sortOrder
}: AppointmentsCardProps) => {
  const [t] = useTranslation();
  const theme = useTheme();
  const { navigateTo } = usePatientProfileNavigatorContext();
  const appointmentDetails = useAppSelector(bookingSelector.appointmentDetails);
  const serviceProviderId = useAppSelector(bookingSelector.serviceProviderId);
  const customizedSortOrder = sortOrder.toLowerCase() as SortOrder;

  const currentAppointmentType =
    appointmentType === AppointmentType.Upcoming
      ? t(Translation.PAGE_PATIENT_PROFILE_UPCOMING_APPOINTMENTS)
      : t(Translation.PAGE_PATIENT_PROFILE_PAST_APPOINTMENTS);

  const onViewAllClick = () => {
    navigateTo(PatientProfilePageName.AppointmentsList, {
      filterIds: filterId
    });
    dispatch(patientsMiddleware.resetAppointmentsList());
    dispatch(patientsMiddleware.setCurrentAppointmentType(currentAppointmentType));
    dispatch(setPatientAppointmentsOrderBy(sortByField));
    dispatch(setPatientAppointmentsOrder(customizedSortOrder));
  };

  useEffect(() => {
    if (serviceProviderId) {
      dispatch(bookingMiddleware.getServiceTypes({ resourceId: serviceProviderId }));
    }
  }, [serviceProviderId]);

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

  useEffect(() => {
    if (appointmentDetails?.provider) {
      dispatch(bookingMiddleware.applyResource(appointmentDetails.provider.id));
    }
  }, [appointmentDetails?.provider]);

  const onOpenAppointmentsModalAdd = useCallback(() => {
    dispatch(viewsMiddleware.openModal({ name: ModalName.AddPatientAppointmentsModal, props: {} }));
  }, []);

  return (
    <SubCardStyled
      title={currentAppointmentType}
      secondary={
        appointmentType === AppointmentType.Upcoming && (
          <IconButton onClick={onOpenAppointmentsModalAdd}>
            <AddIcon />
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
          {appointmentsList && appointmentsList.length > 3 && (
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
