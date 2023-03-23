import { DialogContent, Grid } from '@mui/material';

import { AddAppointmentSources } from '@components/Modals/Booking/AddAppointmentModal/types';
import AppointmentDescription from '../fields/AppointmentDescription';
import DateAndStartTime from '../fields/DateAndStartTime';
import DisabledPatientId from '@components/Modals/Booking/EditAppointmentsModal/fields/DisabledPatient';
import { ModalName } from 'types/modals';
import PatientId from '../fields/PatientId';
import React from 'react';
import Resource from '../fields/Resource';
import ServiceType from '../fields/ServiceType';
import { paddings } from 'themes/themeConstants';
import { useAppSelector } from '@redux/hooks';
import { viewsSelector } from '@redux/slices/views';

const FormBody = () => {
  const modals = useAppSelector(viewsSelector.modals);
  const addAppointmentModalProps = modals.find((modalProps) => modalProps.name === ModalName.AddAppointmentModal);

  const isProfile = addAppointmentModalProps?.props.source === AddAppointmentSources.Profile;

  const patient = addAppointmentModalProps?.props.patient;

  return (
    <DialogContent sx={{ padding: `${paddings.top32} ${paddings.right32} ${paddings.bottom24} ${paddings.left32}` }}>
      <Grid container spacing={3}>
        {isProfile && <Resource />}
        <ServiceType />
        {isProfile ? <DisabledPatientId patient={patient} /> : <PatientId />}
        <AppointmentDescription />
        <DateAndStartTime />
      </Grid>
    </DialogContent>
  );
};

export default FormBody;
