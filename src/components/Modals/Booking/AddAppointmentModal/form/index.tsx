import React, { useCallback, useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { ICreateAppointmentBody } from '@axios/booking/managerBookingTypes';
import { CypressIds } from 'constants/cypressIds';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware } from 'redux/slices/views';
import { ModalName, OpenModalReason } from 'types/modals';

import FormActions from './FormActions';
import FormBody from './FormBody';
import FormHeader from './FormHeader';

const AddAppointmentsModalForm = () => {
  const { control, handleSubmit } = useFormContext<ICreateAppointmentBody>();
  const patientAlerts = useAppSelector(bookingSelector.patientAlerts);
  const appointmentStatus = useAppSelector(bookingSelector.appointmentStatus);

  const isDuplicatePatientName = useMemo(() => {
    if (!patientAlerts?.length) {
      return false;
    }

    const duplicateAlert = patientAlerts.find((alertDetails) => alertDetails.title === OpenModalReason.DuplicateName);

    return !!duplicateAlert;
  }, [patientAlerts]);

  const patientId = useWatch({ name: 'patientId', control });
  const providerId = useWatch({ name: 'providerId', control });

  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(ModalName.AddAppointmentModal));
    dispatch(bookingMiddleware.getPatientAlerts(''));
  }, []);

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

  const onSubmit = useCallback(
    (values: ICreateAppointmentBody) => {
      const body: ICreateAppointmentBody = {
        ...values,
        providerId
      };

      dispatch(bookingMiddleware.createAppointment(body));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [providerId]
  );

  useEffect(() => {
    if (appointmentStatus.create.success) {
      onClose();
    }
  }, [appointmentStatus.create.success, onClose]);

  const addAppointmentDialogFormCypressId = CypressIds.MODAL_APPOINTMENTS_ADD_DIALOG_FORM;

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-cy={addAppointmentDialogFormCypressId}>
      <FormHeader />
      <FormBody />
      <FormActions isActionButtonDisabled={isDuplicatePatientName} />
    </form>
  );
};

export default AddAppointmentsModalForm;
