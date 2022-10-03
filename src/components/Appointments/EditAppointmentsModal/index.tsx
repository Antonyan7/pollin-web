import React, { useCallback, useEffect } from 'react';
import { Dialog } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ModalName } from 'constants/modals';
import { FormikProvider, useFormik } from 'formik';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware, viewsSelector } from 'redux/slices/views';
import { AppointmentDetailsProps } from 'types/reduxTypes/booking';
import { editAppointmentsValidationSchema } from 'validation/appointments/edit_appointment';

import { IFormValues } from './form/types';
import EditAppointmentsModalForm from './form';

const getFormState = (details?: AppointmentDetailsProps | null): IFormValues => ({
  appointment: {
    id: details?.appointment.id ?? '',
    description: details?.appointment.description ?? '',
    date: details?.appointment.date ?? new Date(),
    status: details?.appointment.status ?? '',
    cancellationReason: ''
  },
  patient: {
    id: details?.patient.id ?? '',
    name: details?.patient.name ?? ''
  },
  serviceType: {
    id: details?.serviceType?.id ?? '',
    title: details?.serviceType?.title ?? ''
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

  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.setModalState({ name: ModalName.NONE, props: {} }));
  }, []);

  const editAppointmentForm = useFormik({
    initialValues: getFormState(),
    validationSchema: editAppointmentsValidationSchema,
    onSubmit: () => {
      onClose();
    }
  });

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
      editAppointmentForm.setValues(details as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details]);

  return editAppointmentForm.values.appointment.id ? (
    <FormikProvider value={editAppointmentForm}>
      <Dialog open onClose={onClose}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <EditAppointmentsModalForm />
        </LocalizationProvider>
      </Dialog>
    </FormikProvider>
  ) : null;
};

export default EditAppointmentsModal;
