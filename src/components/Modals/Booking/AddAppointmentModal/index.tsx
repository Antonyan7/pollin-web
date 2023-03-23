import React, { useCallback, useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { ICreateAppointmentBody } from '@axios/booking/managerBookingTypes';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CypressIds } from 'constants/cypressIds';
import { dispatch } from 'redux/hooks';
import { bookingMiddleware } from 'redux/slices/booking';
import { viewsMiddleware } from 'redux/slices/views';
import { ModalName } from 'types/modals';
import { addAppointmentsValidationSchema } from 'validation/appointments/add_appointment';

import AddAppointmentsModalForm from './form';
import { AddAppointmentModalProps } from './types';

const getInitialValues = (
  bookAppointmentDateStartTime?: Date,
  providerId = '',
  patientId = ''
): ICreateAppointmentBody => ({
  providerId,
  serviceTypeId: '',
  patientId,
  description: '',
  date: bookAppointmentDateStartTime ? new Date(bookAppointmentDateStartTime) : null
});

const AddAppointmentsModal = ({ start, providerId, patient }: AddAppointmentModalProps) => {
  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(ModalName.AddAppointmentModal));
    dispatch(bookingMiddleware.getPatientAlerts());
  }, []);

  const methods = useForm<ICreateAppointmentBody>({
    defaultValues: getInitialValues(start, providerId, patient?.id),
    resolver: yupResolver(addAppointmentsValidationSchema)
  });

  const { control, resetField } = methods;
  const serviceProviderId = useWatch({ name: 'providerId', control });

  useEffect(() => {
    if (serviceProviderId) {
      resetField('serviceTypeId');
      dispatch(bookingMiddleware.getServiceTypes({ resourceId: serviceProviderId }));
    }

    return () => dispatch(bookingMiddleware.clearServiceTypes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
