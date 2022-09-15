import React, { useEffect } from 'react';
import { ICreatedAppointmentBody } from '@axios/managerBooking';
import { Dialog } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ModalName } from 'constants/modals';
import { FormikProvider, useFormik } from 'formik';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware } from 'redux/slices/booking';
import { viewsMiddleware, viewsSelector } from 'redux/slices/views';
import { addAppointmentsValidationSchema } from 'validation/appointments/add_appointment';

import AddAppointmentsModalForm from './form';

const getInitialValues = (bookAppointmentDateStartTime?: Date): ICreatedAppointmentBody => ({
  serviceTypeId: '',
  patientId: '',
  description: '',
  date: bookAppointmentDateStartTime ? new Date(bookAppointmentDateStartTime) : new Date()
});

const AddAppointmentsModal = () => {
  const bookAppointmentDateStartTime: Date = useAppSelector(viewsSelector.modal).props?.start;
  const onClose = () => dispatch(viewsMiddleware.setModalState({ name: ModalName.NONE, props: {} }));
  const { createAppointment, getServiceTypes } = bookingMiddleware;
  const addAppointmentsFormProperties = useFormik({
    initialValues: getInitialValues(bookAppointmentDateStartTime),
    validationSchema: addAppointmentsValidationSchema,
    onSubmit: (values) => {
      dispatch(createAppointment(values));
      onClose();
    }
  });

  useEffect(() => {
    dispatch(getServiceTypes());
  }, [getServiceTypes]);

  return (
    <FormikProvider value={addAppointmentsFormProperties}>
      <Dialog open onClose={onClose} maxWidth="sm" fullWidth sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AddAppointmentsModalForm />
        </LocalizationProvider>
      </Dialog>
    </FormikProvider>
  );
};

export default AddAppointmentsModal;
