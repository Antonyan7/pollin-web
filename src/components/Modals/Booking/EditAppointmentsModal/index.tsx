import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Translation } from 'constants/translations';
import { getTimezoneOffset } from 'date-fns-tz';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware } from 'redux/slices/views';
import { ModalName } from 'types/modals';
import { AppointmentDetailsProps } from 'types/reduxTypes/bookingStateTypes';
import { editAppointmentsValidationSchema } from 'validation/appointments/edit_appointment';

import BaseModal from '@ui-component/Modal/BaseModal';

import { IFormValues } from './form/types';
import EditAppointmentsModalForm from './form';

// TODO Will be changed After backend ticket was done about iso formatting
const getCurrentTimezone = () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const offset = getTimezoneOffset(timezone) / 60 / 60 / 1000;
  const absoluteOffset = Math.abs(offset);

  return `${offset >= 0 ? '+' : '-'}${absoluteOffset.toString().length > 1 ? '' : '0'}${absoluteOffset}:00`;
};

const getFormState = (details?: AppointmentDetailsProps | null): IFormValues => ({
  appointment: {
    id: details?.appointment.id ?? '',
    description: details?.appointment.description ?? '',
    // TODO Will be changed After backend ticket was done about iso formatting
    date: details?.appointment.date
      ? details?.appointment.date.toString().replace('Z', getCurrentTimezone())
      : new Date(),
    status: details?.appointment.status ?? '',
    cancellationReason: ''
  },
  patient: {
    id: details?.patient.id ?? '',
    name: details?.patient.name ?? ''
  },
  serviceType: {
    id: details?.serviceType?.id ?? '',
    title: details?.serviceType?.title ?? '',
    ...(details?.serviceType?.isVirtual ? { isVirtual: details?.serviceType?.isVirtual } : {})
  }
});

export interface EditAppointmentModalProps {
  appointmentId: string;
}

const EditAppointmentsModal = ({ appointmentId }: EditAppointmentModalProps) => {
  const [t] = useTranslation();
  const serviceProviderId = useAppSelector(bookingSelector.serviceProviderId);
  const details = useAppSelector(bookingSelector.appointmentDetails);
  const [modalLoading, setModalLoading] = useState(true);
  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(ModalName.EditAppointmentModal));
    dispatch(bookingMiddleware.clearAppointmentDetails());
  }, []);

  const methods = useForm({
    defaultValues: getFormState(),
    resolver: yupResolver(editAppointmentsValidationSchema)
  });
  const { setValue } = methods;
  const editTitleLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_TITLE);

  useEffect(() => {
    if (serviceProviderId) {
      dispatch(bookingMiddleware.getServiceTypes({ resourceId: serviceProviderId }));
    }
  }, [serviceProviderId]);

  useEffect(() => {
    if (appointmentId) {
      dispatch(bookingMiddleware.getAppointmentDetails(appointmentId));
    }
  }, [appointmentId]);

  useEffect(() => {
    if (details) {
      Object.entries(getFormState(details)).map(([k, v]) => setValue(k as keyof IFormValues, v));
      setModalLoading(false);
    }
  }, [details, setValue]);

  return (
    <FormProvider {...methods}>
      <BaseModal isLoading={modalLoading} title={editTitleLabel} onClose={onClose}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <EditAppointmentsModalForm />
        </LocalizationProvider>
      </BaseModal>
    </FormProvider>
  );
};

export default EditAppointmentsModal;
