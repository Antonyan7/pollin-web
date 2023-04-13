import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { MedicationsProps } from '@axios/patientEmr/managerPatientEmrTypes';
import { patientsMiddleware } from '@redux/slices/patients';
import { useRouter } from 'next/router';
import { dispatch } from 'redux/hooks';

import EditForm from './editForm';
import { AddPatientMedicationFormField, IAddPatientMedicationForm } from './initialValues';

interface ViewModeContentProps {
  medication: MedicationsProps;
}

const EditModeContent = ({ medication }: ViewModeContentProps) => {
  const initialValues: IAddPatientMedicationForm = {
    // eslint-disable-next-line  @typescript-eslint/prefer-nullish-coalescing
    [AddPatientMedicationFormField.MedicationName]: medication.commonName || medication.title,
    [AddPatientMedicationFormField.id]: medication.id,
    [AddPatientMedicationFormField.StartDate]: medication.duration.start,
    [AddPatientMedicationFormField.EndDate]: medication.duration.end,
    [AddPatientMedicationFormField.Dosage]: medication.dosage,
    [AddPatientMedicationFormField.Frequency]: medication.frequency,
    [AddPatientMedicationFormField.Time]: medication?.time ?? '',
    [AddPatientMedicationFormField.Route]: medication.route,
    [AddPatientMedicationFormField.Prescriber]: medication?.prescriber ?? ''
  };

  const methods = useForm({
    mode: 'onSubmit',
    defaultValues: initialValues
  });

  const router = useRouter();
  const patientId = router.query.id as string;

  const { handleSubmit } = methods;
  const onSubmit = (values: IAddPatientMedicationForm) => {
    const { MedicationName, startDate, endDate, prescriber, ...otherMedicationValues } = values;
    const data = {
      patientId,
      medication: {
        ...otherMedicationValues,
        duration: { start: startDate, end: endDate }
      }
    };

    dispatch(patientsMiddleware.updatePatientMedication(data, patientId));
    dispatch(patientsMiddleware.updateCardToEditMode(-1, []));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EditForm medication={medication} />
      </form>
    </FormProvider>
  );
};

export default EditModeContent;
