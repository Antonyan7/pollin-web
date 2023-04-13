import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IFemalePatientGynaecologicalHistoryProps } from '@axios/patientEmr/managerPatientEmrTypes';
import FormSubmit from '@components/common/Form/Footer/FormSubmit';
import { mapObjectByPattern } from '@components/MedicalBackground/helpers/mapper';
import { gynaecologicalHistoryValidationSchema } from '@components/MedicalBackground/helpers/medical_history_validation';
import renderComponents from '@components/MedicalBackground/helpers/renderComponentByType';
import useSaveMedicalBackgroundDataWithToast from '@components/MedicalBackground/hooks/useSaveMedicalBackgroundDataWithToast';
import mappingPattern from '@components/MedicalBackground/mapper/femalePatientGynaecologicalHistory';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { useRouter } from 'next/router';

import useCloseMedicalBackgroundFormWithChangesModal from '../../../hooks/useCloseMedicalBackgroundFormWithChangesModal';

const EditModeContent = ({ handleClose }: { handleClose: () => void }) => {
  const femalePatientGynaecologicalHistory = useAppSelector(patientsSelector.femalePatientGynaecologicalHistory);
  const mappedItems = useMemo(
    () => mapObjectByPattern(femalePatientGynaecologicalHistory, mappingPattern),
    [femalePatientGynaecologicalHistory]
  );
  const {
    query: { id }
  } = useRouter();
  const isFemalePatientGynaecologicalHistoryDataUpdating = useAppSelector(
    patientsSelector.isFemalePatientGynaecologicalHistoryDataUpdating
  );
  const defaultValues = useMemo(
    () =>
      mappedItems.reduce((previousValues, mappedItem) => {
        const { fieldName, viewValue, title, componentData, ...mappedItemProps } = mappedItem;

        const fieldDefaultValue = {
          [`${mappedItem.fieldName}`]: {
            ...mappedItemProps
          }
        };

        previousValues = { ...fieldDefaultValue, ...previousValues };

        return previousValues;
      }, {}),
    [mappedItems]
  );

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(gynaecologicalHistoryValidationSchema)
  });

  const {
    formState: { dirtyFields }
  } = methods;

  const isFormChanged = Object.values(dirtyFields).length > 0;
  const onClose = useCloseMedicalBackgroundFormWithChangesModal(isFormChanged, handleClose);
  const onSave = useSaveMedicalBackgroundDataWithToast(handleClose);

  const { handleSubmit } = methods;

  const handleSave = (data: IFemalePatientGynaecologicalHistoryProps) => {
    dispatch(patientsMiddleware.updateFemalePatientGynaecologicalHistory(id as string, data, onSave));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleSave)}>
        <Grid>{mappedItems.map(renderComponents)}</Grid>
        <FormSubmit
          onClick={onClose}
          isDisabled={!isFormChanged}
          isLoading={isFemalePatientGynaecologicalHistoryDataUpdating}
        />
      </form>
    </FormProvider>
  );
};

export default EditModeContent;
