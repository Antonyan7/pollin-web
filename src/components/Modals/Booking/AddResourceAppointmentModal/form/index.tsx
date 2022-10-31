import React, { useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { ICreatedAppointmentBody } from '@axios/booking/managerBookingTypes';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware } from 'redux/slices/views';
import { ModalName, OpenModalReason } from 'types/modals';

import FormActions from './FormActions';
import FormBody from './FormBody';
import FormHeader from './FormHeader';

const AddAppointmentsModalForm = () => {
  const { handleSubmit } = useFormContext<ICreatedAppointmentBody>();
  const { control } = useFormContext<ICreatedAppointmentBody>();
  const patientAlerts = useAppSelector(bookingSelector.patientAlerts);

  const isDuplicatePatientName = useMemo(() => {
    if (!patientAlerts?.length) {
      return false;
    }

    const duplicateAlert = patientAlerts.find((alertDetails) => alertDetails.title === OpenModalReason.DuplicateName);

    return !!duplicateAlert;
  }, [patientAlerts]);

  const patientId = useWatch({ name: 'patientId', control });

  const onClose = () => {
    dispatch(viewsMiddleware.closeModal(ModalName.AddResourceAppointmentModal));
    dispatch(bookingMiddleware.getPatients(null));
    dispatch(bookingMiddleware.getPatientAlerts(''));
  };

  const providerId = useAppSelector(bookingSelector.serviceProviderId);

  useEffect(() => {
    if (isDuplicatePatientName) {
      dispatch(
        viewsMiddleware.openModal({
          name: ModalName.AddAppointmentDuplicatePatientModal,
          props: { patientId }
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDuplicatePatientName]);

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
      <FormBody />
      <FormActions isActionButtonDisabled={isDuplicatePatientName} />
    </form>
  );
};

export default AddAppointmentsModalForm;
