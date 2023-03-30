import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IFertilityHistory } from '@axios/patientEmr/managerPatientEmrTypes';
import DropdownField from '@components/MedicalBackground/components/common/Dropdown/DropdownField';
import FormSubmit from '@components/MedicalBackground/components/common/FormSubmit';
import MedicalBackgroundSection from '@components/MedicalBackground/components/common/MedicalBackgroundSection';
import MedicalHistoryRadio from '@components/MedicalBackground/components/common/MedicalHistoryRadioComponent';
import MedicalComponentWithRadioView from '@components/MedicalBackground/components/common/MedWithRadioView';
import { IMedicalBackgroundItem, MedicalBackgroundItemType } from '@components/MedicalBackground/components/types';
import { mapObjectByPattern } from '@components/MedicalBackground/helpers/mapper';
import { fertilityHistoryValidationSchema } from '@components/MedicalBackground/helpers/medical_history_validation';
import useSaveMedicalBackgroundDataWithToast from '@components/MedicalBackground/hooks/useSaveMedicalBackgroundDataWithToast';
import mappingPattern from '@components/MedicalBackground/mapper/fertilityHistory';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { useRouter } from 'next/router';
import { v4 } from 'uuid';

import useCloseMedicalBackgroundFormWithChangesModal from '../../../hooks/useCloseMedicalBackgroundFormWithChangesModal';

const EditModeContent = ({ handleClose }: { handleClose: () => void }) => {
  const fertilityHistory = useAppSelector(patientsSelector.fertilityHistory);
  const mappedItems = useMemo(() => mapObjectByPattern(fertilityHistory, mappingPattern), [fertilityHistory]);
  const {
    query: { id }
  } = useRouter();
  const isUpdatingFertilityHistoryData = useAppSelector(patientsSelector.isFertilityHistoryDataUpdating);
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
    resolver: yupResolver(fertilityHistoryValidationSchema)
  });

  const {
    formState: { dirtyFields }
  } = methods;

  const isFormChanged = Object.values(dirtyFields).length > 0;
  const onClose = useCloseMedicalBackgroundFormWithChangesModal(isFormChanged, handleClose);
  const onSave = useSaveMedicalBackgroundDataWithToast(handleClose);

  const { handleSubmit } = methods;

  const handleSave = (data: IFertilityHistory) => {
    dispatch(patientsMiddleware.updateFertilityHistory(id as string, data, onSave));
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

            if (mappedItem?.componentData?.type === MedicalBackgroundItemType.Dropdown) {
              return (
                <DropdownField
                  label={title}
                  placeholder={title}
                  fieldName={`${fieldName}.value`}
                  dropdownType={mappedItem?.componentData?.dropdownType}
                />
              );
            }

            if (mappedItem?.componentData?.type === MedicalBackgroundItemType.Section) {
              const rows = mappedItem?.componentData?.rows as IMedicalBackgroundItem[][];
              const initialFields = rows.flat().reduce((previousValues, currentValue) => {
                previousValues[(currentValue as IMedicalBackgroundItem).fieldName] = '';

                return previousValues;
              }, {} as Record<string, string>);

              return (
                <MedicalBackgroundSection
                  fieldName={fieldName}
                  title={title}
                  tableTitle={mappedItem?.componentData?.tableTitle}
                  rows={rows}
                  initialFields={initialFields}
                  controlFieldName={mappedItem?.componentData?.controlFieldName}
                  itemsFieldName={mappedItem?.componentData?.itemsFieldName}
                  addNewItemButtonLabel={mappedItem?.componentData?.addNewItemButtonLabel}
                />
              );
            }

            return <MedicalHistoryRadio iconTitle={title} fieldName={fieldName} key={v4()} />;
          })}
        </Grid>
        <FormSubmit onClick={onClose} isDisabled={!isFormChanged} isLoading={isUpdatingFertilityHistoryData} />
      </form>
    </FormProvider>
  );
};

export default EditModeContent;
