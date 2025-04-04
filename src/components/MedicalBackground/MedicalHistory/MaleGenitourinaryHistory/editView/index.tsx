import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IGenitourinaryHistory } from '@axios/patientEmr/managerPatientEmrTypes';
import FormSubmit from '@components/common/Form/Footer/FormSubmit';
import { nonValidProperty } from '@components/MedicalBackground/helpers';
import useCloseMedicalBackgroundFormWithChangesModal from '@components/MedicalBackground/hooks/useCloseMedicalBackgroundFormWithChangesModal';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { useRouter } from 'next/router';

import MaleGenitourinaryEditForm from './form';
import { MaleGenitourinaryHistoryEditEmptyState } from './helpers';

const MaleGenitourinaryHistoryEdit = () => {
  const router = useRouter();
  const currentPatientId = router.query.id;
  const patientInformation = useAppSelector(patientsSelector.malePatientGenitourinaryHistory);

  const methods = useForm<IGenitourinaryHistory>({
    defaultValues: MaleGenitourinaryHistoryEditEmptyState(patientInformation as IGenitourinaryHistory),
    mode: 'onSubmit'
  });
  const { handleSubmit } = methods;

  const onGenitourinaryHistorySubmit = (values: IGenitourinaryHistory) => {
    const { undescendedTesticles, testicularIssues, toxins, infections, genitalSurgery, ...otherGenitourinaryData } =
      values;
    const genitourinaryHistoryData = {
      ...otherGenitourinaryData,
      ...(nonValidProperty(undescendedTesticles?.value) ? {} : { undescendedTesticles }),
      ...(nonValidProperty(testicularIssues?.value) ? {} : { testicularIssues }),
      ...(nonValidProperty(toxins?.value) ? {} : { toxins }),
      ...(nonValidProperty(infections?.value) ? {} : { infections }),
      ...(nonValidProperty(genitalSurgery?.value) ? {} : { genitalSurgery })
    };

    if (typeof currentPatientId === 'string') {
      dispatch(patientsMiddleware.updatePatientGenitourinaryHistory(currentPatientId, genitourinaryHistoryData));
    }
  };
  const {
    formState: { dirtyFields }
  } = methods;

  const isMalePatientGenitourinaryEditButtonClicked = useAppSelector(
    patientsSelector.isMalePatientGenitourinaryEditButtonClicked
  );

  const isFormChanged = Object.values(dirtyFields).length > 0;
  const handleClose = () => {
    dispatch(patientsMiddleware.setEditMalePatientGenitourinaryState(!isMalePatientGenitourinaryEditButtonClicked));
  };
  const onClose = useCloseMedicalBackgroundFormWithChangesModal(isFormChanged, handleClose);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onGenitourinaryHistorySubmit)}>
        <MaleGenitourinaryEditForm />
        <FormSubmit onClick={onClose} isDisabled={!isFormChanged} />
      </form>
    </FormProvider>
  );
};

export default MaleGenitourinaryHistoryEdit;
