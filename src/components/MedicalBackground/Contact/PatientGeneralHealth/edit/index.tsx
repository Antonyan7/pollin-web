import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IGeneralHealthProps } from '@axios/patientEmr/managerPatientEmrTypes';
import PatientGeneralHealthEditForm from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form';
import { getGeneralHealthEditFormState } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/helpers';
import { patientGeneralHealthValidationSchema } from '@components/MedicalBackground/helpers/contact_validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { useRouter } from 'next/router';

const PatientGeneralHealthEdit = () => {
  const router = useRouter();
  const currentPatiendId = router.query.id;
  const generalHelth = useAppSelector(patientsSelector.generalHealth);

  const methods = useForm<IGeneralHealthProps>({
    defaultValues: getGeneralHealthEditFormState(generalHelth as IGeneralHealthProps),
    resolver: yupResolver(patientGeneralHealthValidationSchema),
    mode: 'onSubmit'
  });
  const { handleSubmit } = methods;

  const onGeneralHealthSubmit = (values: IGeneralHealthProps) => {
    if (typeof currentPatiendId === 'string') {
      dispatch(patientsMiddleware.updateGeneralHealthData(currentPatiendId, values));
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onGeneralHealthSubmit)}>
        <PatientGeneralHealthEditForm />
      </form>
    </FormProvider>
  );
};

export default PatientGeneralHealthEdit;
