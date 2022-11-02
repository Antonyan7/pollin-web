import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ICreatedAppointmentBody } from '@axios/booking/managerBookingTypes';
import { Divider } from '@mui/material';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware } from 'redux/slices/views';
import { margins } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import FormActions from './FormActions';
import FormBody from './FormBody';

const AddAppointmentsModalForm = () => {
  const { handleSubmit } = useFormContext<ICreatedAppointmentBody>();
  const providerId = useAppSelector(bookingSelector.serviceProviderId);

  const onClose = () => {
    dispatch(viewsMiddleware.closeModal(ModalName.AddPatientAppointmentsModal));
    dispatch(bookingMiddleware.getPatients(null));
  };

  const onSubmit = (values: ICreatedAppointmentBody) => {
    const body: ICreatedAppointmentBody = {
      ...values,
      providerId
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
