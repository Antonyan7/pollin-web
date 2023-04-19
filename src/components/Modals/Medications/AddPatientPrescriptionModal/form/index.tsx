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

const AddPatientPrescriptionForm = ({ setIsDirty }: { setIsDirty: (val: boolean) => void }) => {
  const methods = useForm({
    mode: 'onSubmit',
    defaultValues: initialValues
  });
  const router = useRouter();
  const patientId = router.query.id as string;
  const currentPrescriptionUuid = useAppSelector(patientsSelector.currentPrescriptionUuid);
  const patientProfile = useAppSelector(patientsSelector.patientProfile);

  const patientName = patientProfile?.fullName;
  const { handleSubmit } = methods;
  const onSubmit = (values: IAddPatientPrescriptionForm) => {
    const prescriptionData = {
      patientId,
      prescription: values
    };

    dispatch(patientsMiddleware.createPatientPrescription(prescriptionData, patientName));
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
        <FormContent setIsDirty={setIsDirty} />
      </form>
    </FormProvider>
  );
};

export default AddPatientPrescriptionForm;
