import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IFemalePatientMenstrualCycleHistoryProps } from '@axios/patientEmr/managerPatientEmrTypes';
import DropdownField from '@components/MedicalBackground/components/common/Dropdown/DropdownField';
import { FormInputField } from '@components/MedicalBackground/components/common/FormInput';
import FormSubmit from '@components/MedicalBackground/components/common/FormSubmit';
import { DatePickerField } from '@components/MedicalBackground/components/common/MedicalDatePicker';
import MedicalComponentWithRadio from '@components/MedicalBackground/components/common/MedWithRadio';
import MedicalComponentWithRadioView from '@components/MedicalBackground/components/common/MedWithRadioView';
import { MedicalBackgroundItemType } from '@components/MedicalBackground/components/types';
import { mapObjectByPattern } from '@components/MedicalBackground/helpers/mapper';
import { menstrualCycleHistoryValidationSchema } from '@components/MedicalBackground/helpers/medical_history_validation';
import useSaveMedicalBackgroundDataWithToast from '@components/MedicalBackground/hooks/useSaveMedicalBackgroundDataWithToast';
import mappingPattern from '@components/MedicalBackground/mapper/femalePatientMenstrualCycleHistory';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { useRouter } from 'next/router';
import { v4 } from 'uuid';

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
  const defaultValues = mappedItems.reduce((previousValues, mappedItem) => {
    const { fieldName, viewValue, title, componentData, ...mappedItemProps } = mappedItem;

    const fieldDefaultValue = {
      [`${mappedItem.fieldName}`]: {
        ...mappedItemProps
      }
    };

    previousValues = { ...fieldDefaultValue, ...previousValues };

    return previousValues;
  }, {});

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
        <Grid>
          {mappedItems.map((mappedItem) => {
            const { fieldName } = mappedItem;
            const { title } = mappedItem;

            if (!mappedItem?.isEditable) {
              return (
                <MedicalComponentWithRadioView iconTitle={title} key={title}>
                  <Typography>{mappedItem.viewValue}</Typography>
                </MedicalComponentWithRadioView>
              );
            }

            const componentType = mappedItem?.componentData?.type;

            switch (componentType) {
              case MedicalBackgroundItemType.Dropdown:
                return (
                  <DropdownField
                    label={title}
                    placeholder={title}
                    fieldName={`${fieldName}.value`}
                    dropdownType={mappedItem?.componentData?.dropdownType}
                  />
                );
              case MedicalBackgroundItemType.Input:
                return <FormInputField label={title} name={`${fieldName}.value`} />;
              case MedicalBackgroundItemType.Date:
                return <DatePickerField label={title} name={`${fieldName}.value`} />;
              default:
                return <MedicalComponentWithRadio iconTitle={title} fieldName={`${fieldName}.value`} key={v4()} />;
            }
          })}
        </Grid>
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
