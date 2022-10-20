import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Divider } from '@mui/material';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware } from 'redux/slices/views';
import { margins } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import { mergeAppointmentDetails } from './helpers/mergeAppointmentDetails';
import FormActions from './FormActions';
import FormBody from './FormBody';
import FormHeader from './FormHeader';
import { IFormValues } from './types';

const EditAppointmentsModalForm = () => {
  const { handleSubmit, formState, reset } = useFormContext<IFormValues>();
  const { isSubmitSuccessful } = formState;
  const details = useAppSelector(bookingSelector.appointmentDetails);
  const appointmentId = details?.appointment.id ?? '';

  const onClose = () => dispatch(viewsMiddleware.closeModal(ModalName.EditAppointmentModal));

  const onSubmit = (values: IFormValues) => {
    onClose();
    dispatch(bookingMiddleware.editAppointment(appointmentId, mergeAppointmentDetails(values)));
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader />
      <FormBody />
      <Divider sx={{ margin: `${margins.top0} ${margins.right24} ${margins.bottom8} ${margins.left24}` }} />
      <FormActions />
    </form>
  );
};

export default EditAppointmentsModalForm;
