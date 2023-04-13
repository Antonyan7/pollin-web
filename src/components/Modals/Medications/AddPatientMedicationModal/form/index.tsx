import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';

import FormBody from './FormBody';
import FormHeader from './FormHeader';
import { IAddPatientMedicationForm, initialValues } from './initialValues';

const AddPatientMedicationForm = () => {
  const methods = useForm({
    mode: 'onSubmit',
    defaultValues: initialValues
  });
  const router = useRouter();
  const patientId = router.query.id as string;
  const patientProfile = useAppSelector(patientsSelector.patientProfile);

  const patientName = patientProfile?.fullName;
  const { handleSubmit } = methods;
  const onSubmit = (values: IAddPatientMedicationForm) => {
    const { dragName, startDate, endDate, ...otherMedicationValues } = values;
    const data = {
      patientId,
      medication: {
        ...otherMedicationValues,
        drugId: dragName,
        duration: { start: startDate, end: endDate }
      }
    };

    dispatch(patientsMiddleware.createPatientMedication(data, patientName as string));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormHeader />
        <FormBody />
      </form>
    </FormProvider>
  );
};

export default AddPatientMedicationForm;
