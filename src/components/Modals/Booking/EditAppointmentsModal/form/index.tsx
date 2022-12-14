import React, { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CypressIds } from 'constants/cypressIds';
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
  const [closeModal, setCloseModal] = useState<boolean>(false);
  const details = useAppSelector(bookingSelector.appointmentDetails);
  const appointmentStatus = useAppSelector(bookingSelector.appointmentStatus);
  const appointmentId = details?.appointment.id ?? '';

  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(ModalName.EditAppointmentModal));
    dispatch(bookingMiddleware.clearAppointmentDetails());
  }, []);

  const onSubmit = (values: IFormValues) => {
    dispatch(bookingMiddleware.editAppointment(appointmentId, mergeAppointmentDetails(values)));
  };

  useEffect(() => {
    if (isSubmitSuccessful && closeModal) {
      onClose();
      reset();
    }
  }, [isSubmitSuccessful, reset, closeModal, onClose]);

  useEffect(() => {
    if (appointmentStatus.edit.success) {
      setCloseModal(true);
    }
  }, [appointmentStatus.edit.success, onClose]);

  const editAppointmentDialogFormCypressId = CypressIds.MODAL_APPOINTMENTS_EDIT_DIALOG_FORM;

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-cy={editAppointmentDialogFormCypressId}>
      <FormBody />
      <FormActions />
    </form>
  );
};

export default EditAppointmentsModalForm;
