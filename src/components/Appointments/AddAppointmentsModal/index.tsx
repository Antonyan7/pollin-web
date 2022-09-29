import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ICreatedAppointmentBody } from '@axios/managerBooking';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ModalName } from 'constants/modals';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware } from 'redux/slices/booking';
import { viewsMiddleware, viewsSelector } from 'redux/slices/views';
import { addAppointmentsValidationSchema } from 'validation/appointments/add_appointment';

import AddAppointmentsModalForm from './form';

const getInitialValues = (bookAppointmentDateStartTime?: Date): ICreatedAppointmentBody => ({
  serviceTypeId: '',
  patientId: '',
  description: '',
  date: bookAppointmentDateStartTime ? new Date(bookAppointmentDateStartTime) : null
});

const AddAppointmentsModal = () => {
  const bookAppointmentDateStartTime: Date = useAppSelector(viewsSelector.modal).props?.start;
  const onClose = () => dispatch(viewsMiddleware.setModalState({ name: ModalName.NONE, props: {} }));
  const methods = useForm<ICreatedAppointmentBody>({
    defaultValues: getInitialValues(bookAppointmentDateStartTime),
    resolver: yupResolver(addAppointmentsValidationSchema)
  });
  const [isActionButtonDisabled, setDisableActionButton] = useState<boolean>(true);

  useEffect(() => {
    dispatch(bookingMiddleware.getServiceTypes());
    // TODO: must support dropdown pagination
    dispatch(bookingMiddleware.getPatients({ name: '', page: 1 }));
  }, []);

  return (
    <FormProvider {...methods}>
      <Dialog open onClose={onClose} maxWidth="sm" fullWidth sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AddAppointmentsModalForm
            isActionButtonDisabled={isActionButtonDisabled}
            setDisableActionButton={setDisableActionButton}
          />
        </LocalizationProvider>
      </Dialog>
    </FormProvider>
  );
};

export default AddAppointmentsModal;
