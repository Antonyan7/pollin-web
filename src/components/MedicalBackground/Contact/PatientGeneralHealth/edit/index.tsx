import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IGeneralHealthProps } from '@axios/patientEmr/managerPatientEmrTypes';
import PatientGeneralHealthEditForm from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form';
import { getGeneralHealthEditFormState } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/helpers';
import { mergeObjects, RecordedHealthType } from '@components/MedicalBackground/helpers';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { useRouter } from 'next/router';

const PatientGeneralHealthEdit = () => {
  const router = useRouter();
  const currentPatiendId = router.query.id;
  const generalHelth = useAppSelector(patientsSelector.generalHealth);

  const methods = useForm({
    defaultValues: getGeneralHealthEditFormState(generalHelth as IGeneralHealthProps),
    mode: 'onSubmit'
  });
  const { handleSubmit } = methods;

  const onGeneralHealthSubmit = (values: IGeneralHealthProps) => {
    const oldHealthData = { ...generalHelth } as RecordedHealthType;
    const newHealthData = { ...values } as RecordedHealthType;
    const data = mergeObjects(oldHealthData, newHealthData);

    if (typeof currentPatiendId === 'string') {
      dispatch(patientsMiddleware.updateGeneralHealthData(currentPatiendId, data));
      dispatch(patientsMiddleware.changeEditButtonClickState());
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
