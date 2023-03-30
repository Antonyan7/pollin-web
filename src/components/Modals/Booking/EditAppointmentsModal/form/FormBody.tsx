import React from 'react';
import DisabledPatientId from '@components/Modals/Booking/EditAppointmentsModal/fields/DisabledPatient';
import { DialogContent, Divider, Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { bookingSelector } from '@redux/slices/booking';
import { margins, paddings } from 'themes/themeConstants';

import AppointmentDescription from '../../AddAppointmentModal/fields/AppointmentDescription';
import DateAndStartTime from '../../AddAppointmentModal/fields/DateAndStartTime';
import ServiceType from '../../AddAppointmentModal/fields/ServiceType';
import StatusAppointmentLabel from '../fields/StatusAppointmentLabel';

const FormBody = () => {
  const details = useAppSelector(bookingSelector.appointmentDetails);

  return (
    <DialogContent sx={{ padding: `${paddings.top24} ${paddings.right8} ${paddings.bottom8} ${paddings.left8}` }}>
      <Grid container spacing={3}>
        <ServiceType />
        <DisabledPatientId patient={details?.patient ?? {}} />
        <AppointmentDescription edit />
        <DateAndStartTime />
        <StatusAppointmentLabel />
        <Divider sx={{ margin: `${margins.topBottom0} ${margins.leftRight24}` }} />
      </Grid>
    </DialogContent>
  );
};

export default FormBody;
