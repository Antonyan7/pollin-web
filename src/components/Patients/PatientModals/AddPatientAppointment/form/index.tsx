import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ICreateAppointmentBody } from '@axios/booking/managerBookingTypes';
import { Divider } from '@mui/material';
import { patientsSelector } from '@redux/slices/patients';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware } from 'redux/slices/booking';
import { viewsMiddleware } from 'redux/slices/views';
import { margins } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import FormActions from './FormActions';
import FormBody from './FormBody';

const AddAppointmentsModalForm = () => {
  const { handleSubmit } = useFormContext<ICreateAppointmentBody>();
  const currentPatientId = useAppSelector(patientsSelector.currentPatientId);

  const onClose = () => {
    dispatch(viewsMiddleware.closeModal(ModalName.AddPatientAppointmentsModal));
    dispatch(bookingMiddleware.getPatients(null));
  };

  const onSubmit = (values: ICreateAppointmentBody) => {
    const body: ICreateAppointmentBody = {
      ...values,
      patientId: currentPatientId
    };

    dispatch(bookingMiddleware.createAppointment(body));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormBody />
      <Divider sx={{ margin: `${margins.top0} ${margins.right32} ${margins.bottom16} ${margins.left32}` }} />
      <FormActions />
    </form>
  );
};

export default AddAppointmentsModalForm;
