import React, { useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ICreateAppointmentBody } from '@axios/booking/managerBookingTypes';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CypressIds } from 'constants/cypressIds';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware } from 'redux/slices/views';
import { ModalName } from 'types/modals';
import { addAppointmentsValidationSchema } from 'validation/appointments/add_appointment';

import AddAppointmentsModalForm from './form';

const getInitialValues = (bookAppointmentDateStartTime?: Date): ICreateAppointmentBody => ({
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
  const methods = useForm<ICreateAppointmentBody>({
    defaultValues: getInitialValues(start),
    resolver: yupResolver(addAppointmentsValidationSchema)
  });
  const serviceProviderId = useAppSelector(bookingSelector.serviceProviderId);

  useEffect(() => {
    dispatch(bookingMiddleware.getServiceTypes({ resourceId: serviceProviderId }));
  }, [serviceProviderId]);

  const addAppointmentDialogCypressId = CypressIds.MODAL_APPOINTMENTS_ADD_DIALOG;

  return (
    <FormProvider {...methods}>
      <Dialog
        open
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        sx={{ '& .MuiDialog-paper': { p: 0 } }}
        data-cy={addAppointmentDialogCypressId}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AddAppointmentsModalForm />
        </LocalizationProvider>
      </Dialog>
    </FormProvider>
  );
};

export default AddAppointmentsModal;
