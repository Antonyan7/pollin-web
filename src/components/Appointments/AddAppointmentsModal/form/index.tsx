import React, { SetStateAction } from 'react';
import { useFormContext } from 'react-hook-form';
import { ICreatedAppointmentBody } from '@axios/managerBooking';
import { ModalName } from 'constants/modals';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware } from 'redux/slices/views';

import FormActions from './FormActions';
import FormBody from './FormBody';
import FormHeader from './FormHeader';

export interface AddAppointmentsModalFormProps {
  isActionButtonDisabled: boolean;
  setDisableActionButton: React.Dispatch<SetStateAction<boolean>>;
}

const AddAppointmentsModalForm = ({
  isActionButtonDisabled,
  setDisableActionButton
}: AddAppointmentsModalFormProps) => {
  const { handleSubmit } = useFormContext<ICreatedAppointmentBody>();

  const onClose = () => {
    dispatch(viewsMiddleware.setModalState({ name: ModalName.NONE, props: {} }));
    dispatch(bookingMiddleware.getPatients(null));
    dispatch(bookingMiddleware.getPatientAlerts(''));
  };

  const providerId = useAppSelector(bookingSelector.serviceProviderId);

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
      <FormHeader />
      <FormBody setDisableActionButton={setDisableActionButton} />
      <FormActions isActionButtonDisabled={isActionButtonDisabled} />
    </form>
  );
};

export default AddAppointmentsModalForm;
