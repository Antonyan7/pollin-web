import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ICreatedAppointmentBody } from '@axios/booking/managerBookingTypes';
import { yupResolver } from '@hookform/resolvers/yup';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware } from 'redux/slices/booking';
import { viewsMiddleware } from 'redux/slices/views';
import { ModalName } from 'types/modals';
import { addPatientAppointmentsValidationSchema } from 'validation/appointments/add_patient_appointment';

import BaseModal from '@ui-component/Modal/BaseModal';

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

const AddPatientAppointmentsModal = ({ start }: AddAppointmentsModalProps) => {
  const patientProfile = useAppSelector(patientsSelector.patientProfile);
  const patientId = useAppSelector(patientsSelector.currentPatientId);
  const [isLoading, setIsLoading] = useState(true);
  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(ModalName.AddPatientAppointmentsModal));
  }, []);
  const methods = useForm<ICreatedAppointmentBody>({
    defaultValues: getInitialValues(start),
    resolver: yupResolver(addPatientAppointmentsValidationSchema)
  });

  useEffect(() => {
    dispatch(bookingMiddleware.getPatients({ name: '', page: 1 }));
  }, []);

  useEffect(() => {
    if (patientId) {
      dispatch(patientsMiddleware.getPatientProfile(patientId));
    }
  }, [patientId]);

  useEffect(() => {
    if (patientProfile) {
      setIsLoading(false);
    }
  }, [patientProfile]);

  return (
    <FormProvider {...methods}>
      <BaseModal isLoading={isLoading} onClose={onClose} title="Add Appointment">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AddAppointmentsModalForm />
        </LocalizationProvider>
      </BaseModal>
    </FormProvider>
  );
};

export default AddPatientAppointmentsModal;
