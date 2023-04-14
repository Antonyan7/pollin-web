import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IFemalePatientMenstrualCycleHistoryProps } from '@axios/patientEmr/managerPatientEmrTypes';
import FormSubmit from '@components/common/Form/Footer/FormSubmit';
import { isDashString } from '@components/MedicalBackground/helpers';
import { mapObjectByPattern } from '@components/MedicalBackground/helpers/mapper';
import { menstrualCycleHistoryValidationSchema } from '@components/MedicalBackground/helpers/medical_history_validation';
import renderComponents from '@components/MedicalBackground/helpers/renderComponentByType';
import useSaveMedicalBackgroundDataWithToast from '@components/MedicalBackground/hooks/useSaveMedicalBackgroundDataWithToast';
import mappingPattern from '@components/MedicalBackground/mapper/femalePatientMenstrualCycleHistory';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { useRouter } from 'next/router';

import useCloseMedicalBackgroundFormWithChangesModal from '../../../hooks/useCloseMedicalBackgroundFormWithChangesModal';

const EditModeContent = ({ handleClose }: { handleClose: () => void }) => {
  const femalePatientMenstrualCycleHistory = useAppSelector(patientsSelector.femalePatientMenstrualCycleHistory);
  const mappedItems = useMemo(
    () => mapObjectByPattern(femalePatientMenstrualCycleHistory, mappingPattern),
    [femalePatientMenstrualCycleHistory]
  );
  const {
    query: { id }
  } = useRouter();
  const isFemalePatientMenstrualCycleHistoryDataUpdating = useAppSelector(
    patientsSelector.isFemalePatientMenstrualCycleHistoryDataUpdating
  );
  const defaultValues = useMemo(
    () =>
      mappedItems.reduce((previousValues, mappedItem) => {
        const { fieldName, viewValue, title, componentData, ...mappedItemProps } = mappedItem;

        const fieldDefaultValue = {
          [`${mappedItem.fieldName}`]: {
            ...mappedItemProps,
            value: isDashString(mappedItemProps.value) ? '' : mappedItemProps.value
          }
        };

        previousValues = { ...fieldDefaultValue, ...previousValues };

        return previousValues;
      }, {}),
    [mappedItems]
  );

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(menstrualCycleHistoryValidationSchema)
  });

  const {
    formState: { dirtyFields }
  } = methods;

  const isFormChanged = Object.values(dirtyFields).length > 0;
  const onClose = useCloseMedicalBackgroundFormWithChangesModal(isFormChanged, handleClose);
  const onSave = useSaveMedicalBackgroundDataWithToast(handleClose);

  const { handleSubmit } = methods;

  const handleSave = (data: IFemalePatientMenstrualCycleHistoryProps) => {
    dispatch(patientsMiddleware.updateFemalePatientMenstrualCycleHistory(id as string, data, onSave));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleSave)}>
        <Grid>{mappedItems.map(renderComponents)}</Grid>
        <FormSubmit
          onClick={onClose}
          isDisabled={!isFormChanged}
          isLoading={isFemalePatientMenstrualCycleHistoryDataUpdating}
        />
      </form>
    </FormProvider>
  );
};

export default EditModeContent;
