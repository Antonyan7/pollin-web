import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ICreatedAppointmentBody } from '@axios/managerBooking';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ModalName } from 'constants/modals';
import { dispatch } from 'redux/hooks';
import { bookingMiddleware } from 'redux/slices/booking';
import { viewsMiddleware } from 'redux/slices/views';
import { addAppointmentsValidationSchema } from 'validation/appointments/add_appointment';

import AddAppointmentsModalForm from './form';

const getInitialValues = (bookAppointmentDateStartTime?: Date): ICreatedAppointmentBody => ({
  serviceTypeId: '',
  patientId: '',
  description: '',
  date: bookAppointmentDateStartTime ? new Date(bookAppointmentDateStartTime) : null
});

export interface AddAppointmentsModalProps {
  start?: Date;
}

const AddAppointmentsModal = ({ start }: AddAppointmentsModalProps) => {
  const onClose = () => dispatch(viewsMiddleware.closeModal(ModalName.AddAppointmentModal));
  const methods = useForm<ICreatedAppointmentBody>({
    defaultValues: getInitialValues(start),
    resolver: yupResolver(addAppointmentsValidationSchema)
  });

  useEffect(() => {
    dispatch(bookingMiddleware.getServiceTypes());
    dispatch(bookingMiddleware.getPatients({ name: '', page: 1 }));
  }, []);

  return (
    <FormProvider {...methods}>
      <Dialog open onClose={onClose} maxWidth="sm" fullWidth sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AddAppointmentsModalForm />
        </LocalizationProvider>
      </Dialog>
    </FormProvider>
  );
};

export default AddAppointmentsModal;
