import React from 'react';
import { AddAppointmentSources } from '@components/Modals/Booking/AddAppointmentModal/types';
import DisabledPatientId from '@components/Modals/Booking/EditAppointmentsModal/fields/DisabledPatient';
import { DialogContent, Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { viewsSelector } from '@redux/slices/views';
import { paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import AppointmentDescription from '../fields/AppointmentDescription';
import DateAndStartTime from '../fields/DateAndStartTime';
import PatientId from '../fields/PatientId';
import Resource from '../fields/Resource';
import ServiceType from '../fields/ServiceType';

const FormBody = () => {
  const modals = useAppSelector(viewsSelector.modals);
  const addAppointmentModalProps = modals.find((modalProps) => modalProps.name === ModalName.AddAppointmentModal);

  const isProfile = addAppointmentModalProps?.props.source === AddAppointmentSources.Profile;

  const patient = addAppointmentModalProps?.props.patient;

  return (
    <DialogContent sx={{ padding: `${paddings.top32} ${paddings.right32} ${paddings.bottom24} ${paddings.left32}` }}>
      <Grid container spacing={3}>
        {isProfile && <Resource />}
        <ServiceType isProviderRequired />
        {isProfile ? <DisabledPatientId patient={patient} /> : <PatientId />}
        <AppointmentDescription />
        <DateAndStartTime />
      </Grid>
    </DialogContent>
  );
};

export default FormBody;
