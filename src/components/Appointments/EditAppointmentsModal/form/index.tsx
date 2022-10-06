import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { ModalName } from 'constants/modals';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware, viewsSelector } from 'redux/slices/views';
import { AppointmentDetailsProps } from 'types/reduxTypes/booking';

import { mergeAppointmentDetails } from './helpers/mergeAppointmentDetails';
import FormActions from './FormActions';
import FormBody from './FormBody';
import FormHeader from './FormHeader';
import { IFormValues } from './types';

const EditAppointmentsModalForm = () => {
  const { handleSubmit, formState, reset } = useFormContext<IFormValues>();
  const { isSubmitSuccessful } = formState;
  const { appointmentId } = useAppSelector(viewsSelector.modal).props;

  const onClose = () => dispatch(viewsMiddleware.setModalState({ name: ModalName.NONE, props: {} }));

  const details: AppointmentDetailsProps = useAppSelector(
    bookingSelector.appointmentDetails
  ) as AppointmentDetailsProps;

  const onSubmit = (values: IFormValues) => {
    onClose();
    dispatch(bookingMiddleware.editAppointment(appointmentId, mergeAppointmentDetails(details, values)));
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
      <FormActions />
    </form>
  );
};

export default EditAppointmentsModalForm;
