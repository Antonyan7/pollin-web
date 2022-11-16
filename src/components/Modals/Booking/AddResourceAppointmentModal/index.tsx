import React, { useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ICreatedAppointmentBody } from '@axios/booking/managerBookingTypes';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware } from 'redux/slices/views';
import { ModalName } from 'types/modals';
import { addAppointmentsValidationSchema } from 'validation/appointments/add_appointment';

import AddAppointmentsModalForm from './form';

const getInitialValues = (bookAppointmentDateStartTime?: Date): ICreatedAppointmentBody => ({
  serviceTypeId: '',
  patientId: '',
  description: '',
  date: bookAppointmentDateStartTime ? new Date(bookAppointmentDateStartTime) : null
});

export interface AddResourceAppointmentModalProps {
  start?: Date;
}

const AddAppointmentsModal = ({ start }: AddResourceAppointmentModalProps) => {
  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(ModalName.AddResourceAppointmentModal));
    dispatch(bookingMiddleware.getPatientAlerts());
  }, []);
  const methods = useForm<ICreatedAppointmentBody>({
    defaultValues: getInitialValues(start),
    resolver: yupResolver(addAppointmentsValidationSchema)
  });
  const serviceProviderId = useAppSelector(bookingSelector.serviceProviderId);

  useEffect(() => {
    dispatch(bookingMiddleware.getServiceTypes({ resourceId: serviceProviderId }));
  }, [serviceProviderId]);

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
