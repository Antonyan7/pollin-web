import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { patientsMiddleware } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { useRouter } from 'next/router';
import { dispatch } from 'redux/hooks';
import { ModalName } from 'types/modals';

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

    dispatch(patientsMiddleware.createPatientMedication(data));
    dispatch(viewsMiddleware.closeModal(ModalName.AddPatientMedicationModal));
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
