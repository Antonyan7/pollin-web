import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware } from 'redux/slices/views';
import { ModalName } from 'types/modals';

import { mergeAppointmentDetails } from './helpers/mergeAppointmentDetails';
import FormActions from './FormActions';
import FormBody from './FormBody';
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
      <FormBody />
      <FormActions />
    </form>
  );
};

export default EditAppointmentsModalForm;
