import { Button, CardActions, Grid, IconButton, Typography } from '@mui/material';
import { IPatientAppointment, PatientAppointmentsSortField } from '@axios/booking/managerBookingTypes';
import React, { useCallback, useEffect } from 'react';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector, patientsSlice } from '@redux/slices/patients';

import { AddAppointmentSources } from '@components/Modals/Booking/AddAppointmentModal/types';
import AddIcon from '@mui/icons-material/Add';
import { AppointmentType } from 'types/patientProfile';
import CardTable from '@ui-component/profile/appointmentCard/CardTable';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { ModalName } from 'types/modals';
import { PatientProfilePageName } from 'context/types/PatientProfileNavigatorContextTypes';
import { SortOrder } from 'types/patient';
import SubCardStyled from '@ui-component/cards/SubCardStyled';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';
import { usePatientProfileNavigatorContext } from 'context/PatientProfileNavigatorContext';
import { useTranslation } from 'react-i18next';
import { viewsMiddleware } from 'redux/slices/views';

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
  const { navigateTo } = usePatientProfileNavigatorContext();
  const appointmentDetails = useAppSelector(bookingSelector.appointmentDetails);
  const serviceProviderId = useAppSelector(bookingSelector.serviceProviderId);
  const customizedSortOrder = sortOrder.toLowerCase() as SortOrder;
  const patientProfile = useAppSelector(patientsSelector.patientProfile);

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

  useEffect(() => {
    if (appointmentDetails?.provider) {
      dispatch(bookingMiddleware.updateBookingResourceId(appointmentDetails.provider.id));
    }
  }, [appointmentDetails?.provider]);

  const onOpenAppointmentsModalAdd = useCallback(() => {
    dispatch(
      viewsMiddleware.openModal({
        name: ModalName.AddAppointmentModal,
        props: {
          patient: {
            id: patientProfile?.id,
            name: patientProfile?.title
          },
          source: AddAppointmentSources.Profile
        }
      })
    );
  }, [patientProfile]);

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
          <CardTable appointmentsList={appointmentsList} appointmentType={appointmentType} />
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
