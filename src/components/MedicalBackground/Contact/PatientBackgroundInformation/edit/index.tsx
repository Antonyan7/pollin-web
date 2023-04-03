import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IPatientBackgroundPartners } from '@axios/patientEmr/managerPatientEmrTypes';
import { getBackgroundInformationEmptyState } from '@components/MedicalBackground/Contact/PatientBackgroundInformation/edit/helpers';
import { patientBackgroundInformationValidationSchema } from '@components/MedicalBackground/helpers/contact_validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { useRouter } from 'next/router';

import PatientBackgroundInformationEditForm from './form';

const PatientBackgroundInformationEdit = () => {
  const router = useRouter();
  const currentPatientId = router.query.id;
  const patientInformation = useAppSelector(patientsSelector.patientBackgroundInformation);

  const methods = useForm<IPatientBackgroundPartners>({
    defaultValues: getBackgroundInformationEmptyState(patientInformation as IPatientBackgroundPartners),
    resolver: yupResolver(patientBackgroundInformationValidationSchema),
    mode: 'onSubmit'
  });
  const { handleSubmit } = methods;

  const onBackgroundInformationSubmit = (values: IPatientBackgroundPartners) => {
    if (typeof currentPatientId === 'string') {
      dispatch(patientsMiddleware.updatePatientBackgroundInformation(currentPatientId, values));
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onBackgroundInformationSubmit)}>
        <PatientBackgroundInformationEditForm />
      </form>
    </FormProvider>
  );
};

export default PatientBackgroundInformationEdit;
