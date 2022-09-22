import React, { useCallback, useEffect } from 'react';
import { IEditAppointmentBody } from '@axios/managerBooking';
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
  appointmentId: details?.appointment.id ?? '',
  description: details?.appointment.description ?? '',
  date: details?.appointment.date ?? new Date(),
  status: details?.appointment.status ?? '',
  serviceType: details?.serviceType?.id ?? ''
});

interface IEditAppointmentModalProps {
  appointmentId: string;
}

export const mergeAppointmentDetails = (
  details: AppointmentDetailsProps,
  values: IFormValues
): IEditAppointmentBody => ({
  appointment: {
    id: details.appointment.id,
    date: values.date,
    status: values.status,
    description: values.description
  },
  serviceTypeId: values.serviceType
});

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
    onSubmit: (values, { resetForm }) => {
      if (values) {
        dispatch(
          bookingMiddleware.editAppointment(appointmentId, mergeAppointmentDetails(details, editAppointmentForm.values))
        );
      }

      resetForm();
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

  return (
    editAppointmentForm.values.appointmentId && (
      <FormikProvider value={editAppointmentForm}>
        <Dialog open onClose={onClose}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <EditAppointmentsModalForm />
          </LocalizationProvider>
        </Dialog>
      </FormikProvider>
    )
  );
};

export default EditAppointmentsModal;
