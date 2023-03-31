import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  IEditAppointmentForm,
  initialValues
} from '@components/Modals/Booking/EditAppointmentsModal/form/initialValues';
import { yupResolver } from '@hookform/resolvers/yup';
import { CypressIds } from 'constants/cypressIds';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware } from 'redux/slices/views';
import { ModalName } from 'types/modals';
import { editAppointmentsValidationSchema } from 'validation/appointments/edit_appointment';

import { mergeAppointmentDetails } from './helpers/mergeAppointmentDetails';
import FormActions from './FormActions';
import FormBody from './FormBody';

const EditAppointmentsModalForm = () => {
  const methods = useForm({
    mode: 'onSubmit',
    defaultValues: initialValues,
    resolver: yupResolver(editAppointmentsValidationSchema)
  });

  const { handleSubmit, formState, reset, watch } = methods;
  const { isSubmitSuccessful } = formState;

  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);
  const details = useAppSelector(bookingSelector.appointmentDetails);
  const appointmentId = details?.appointment.id ?? '';
  const defaultFormValues = useMemo(
    () => ({
      patientId: details?.patient.id,
      date: details?.appointment.date,
      status: details?.appointment.status,
      description: details?.appointment.description ?? '',
      serviceTypeId: details?.serviceType?.id,
      isVirtual: details?.serviceType?.isVirtual
    }),
    [
      details?.appointment.date,
      details?.appointment.description,
      details?.appointment.status,
      details?.patient.id,
      details?.serviceType?.id,
      details?.serviceType?.isVirtual
    ]
  );

  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(ModalName.EditAppointmentModal));
    dispatch(bookingMiddleware.clearAppointmentDetails());
  }, []);

  const onSubmit = (values: IEditAppointmentForm) => {
    dispatch(bookingMiddleware.editAppointment(appointmentId, mergeAppointmentDetails(values)));
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      onClose();
      reset();
    }
  }, [isSubmitSuccessful, reset, onClose]);

  useEffect(() => {
    const subscription = watch((value) => {
      if (window.btoa(JSON.stringify(value)) === window.btoa(JSON.stringify(defaultFormValues))) {
        setIsSaveDisabled(true);
      } else {
        setIsSaveDisabled(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, defaultFormValues]);

  useEffect(() => {
    reset({
      patientId: details?.patient.id,
      date: details?.appointment.date as string,
      status: details?.appointment.status,
      description: details?.appointment.description ?? '',
      serviceTypeId: details?.serviceType?.id,
      isVirtual: details?.serviceType?.isVirtual
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details]);

  const editAppointmentDialogFormCypressId = CypressIds.MODAL_APPOINTMENTS_EDIT_DIALOG_FORM;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} data-cy={editAppointmentDialogFormCypressId}>
        <FormBody />
        <FormActions isSaveDisabled={isSaveDisabled} />
      </form>
    </FormProvider>
  );
};

export default EditAppointmentsModalForm;
