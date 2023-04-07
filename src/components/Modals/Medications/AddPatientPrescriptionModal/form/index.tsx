import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IAddPatientPrescriptionForm } from '@axios/patientEmr/managerPatientEmrTypes';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { ModalName } from 'types/modals';

import { FormContent } from './FormContent';
import { initialValues } from './initialValues';

const AddPatientPrescriptionForm = () => {
  const methods = useForm({
    mode: 'onSubmit',
    defaultValues: initialValues
  });
  const router = useRouter();
  const patientId = router.query.id;
  const currentPrescriptionUuid = useAppSelector(patientsSelector.currentPrescriptionUuid);

  const { handleSubmit } = methods;
  const onSubmit = (values: IAddPatientPrescriptionForm) => {
    if (typeof patientId === 'string') {
      const prescriptionData = {
        patientId,
        prescription: values
      };

      dispatch(patientsMiddleware.createPatientPrescription(prescriptionData));
    }
  };

  useEffect(() => {
    if (currentPrescriptionUuid) {
      dispatch(viewsMiddleware.closeModal(ModalName.AddPatientPrescriptionModal));
      dispatch(patientsMiddleware.resetCurrentPrescriptionUuid());
    }
  }, [currentPrescriptionUuid]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContent />
      </form>
    </FormProvider>
  );
};

export default AddPatientPrescriptionForm;
