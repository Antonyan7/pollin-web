import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IPatientContactInformationProps } from '@axios/patientEmr/managerPatientEmrTypes';
import { getContactInformationEmptyState } from '@components/MedicalBackground/Contact/PatientContactInformation/edit/helpers';
import { patientContactInformationValidationSchema } from '@components/MedicalBackground/helpers/contact_validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { useRouter } from 'next/router';

import PatientContactInformationEditForm from './form';

const PatientContactInformationEdit = () => {
  const router = useRouter();
  const currentPatiendId = router.query.id;
  const contactInformation = useAppSelector(patientsSelector.contactInformation);

  const methods = useForm<IPatientContactInformationProps>({
    defaultValues: getContactInformationEmptyState(contactInformation as IPatientContactInformationProps),
    resolver: yupResolver(patientContactInformationValidationSchema),
    mode: 'onSubmit'
  });
  const { handleSubmit } = methods;

  const onContactInformationSubmit = (values: IPatientContactInformationProps) => {
    if (typeof currentPatiendId === 'string') {
      dispatch(patientsMiddleware.updatePatientContactInformation(currentPatiendId, values));
      dispatch(patientsMiddleware.changeContactInformationEditButtonState());
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onContactInformationSubmit)}>
        <PatientContactInformationEditForm />
      </form>
    </FormProvider>
  );
};

export default PatientContactInformationEdit;
