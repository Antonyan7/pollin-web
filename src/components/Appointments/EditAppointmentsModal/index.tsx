import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ModalName } from 'constants/modals';
import { getTimezoneOffset } from 'date-fns-tz';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware, viewsSelector } from 'redux/slices/views';
import { AppointmentDetailsProps } from 'types/reduxTypes/booking';
import { editAppointmentsValidationSchema } from 'validation/appointments/edit_appointment';

import { IFormValues } from './form/types';
import EditAppointmentsModalForm from './form';

// TODO Will be changed After backend ticket was done about iso formatting
const getCurrentTimezone = () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const offset = getTimezoneOffset(timezone) / 60 / 60 / 1000;

  return `${offset >= 0 ? '+' : '-'}${offset.toString().length > 1 ? '' : '0'}${offset}:00`;
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

interface IEditAppointmentModalProps {
  appointmentId: string;
}

const EditAppointmentsModal = () => {
  const details: AppointmentDetailsProps = useAppSelector(
    bookingSelector.appointmentDetails
  ) as AppointmentDetailsProps;

  const { appointmentId }: IEditAppointmentModalProps = useAppSelector(viewsSelector.modal).props;

  const onClose = () => dispatch(viewsMiddleware.setModalState({ name: ModalName.NONE, props: {} }));

  const methods = useForm({
    defaultValues: getFormState(),
    resolver: yupResolver(editAppointmentsValidationSchema)
  });
  const { setValue, getValues } = methods;

  useEffect(() => {
    dispatch(bookingMiddleware.getServiceTypes());
  }, []);

  useEffect(() => {
    if (appointmentId) {
      dispatch(bookingMiddleware.getAppointmentDetails(appointmentId));
    }
  }, [appointmentId]);

  useEffect(() => {
    if (details) {
      Object.entries(getFormState(details)).map(([k, v]) => setValue(k as keyof IFormValues, v));
    }
  }, [details, setValue]);

  return getValues('appointment.id') ? (
    <FormProvider {...methods}>
      <Dialog open onClose={onClose}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <EditAppointmentsModalForm />
        </LocalizationProvider>
      </Dialog>
    </FormProvider>
  ) : null;
};

export default EditAppointmentsModal;
