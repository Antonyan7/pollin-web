import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IFertilityHistory } from '@axios/patientEmr/managerPatientEmrTypes';
import { FieldWithNote } from '@components/common/Form/AdvancedField';
import { Dropdown } from '@components/common/Form/Dropdown';
import FlexibleSection from '@components/common/Form/FlexibleSection';
import FormSubmit from '@components/common/Form/Footer/FormSubmit';
import { FlexibleItemType, IFlexibleItem } from '@components/common/Form/types';
import MedicalFormRadio from '@components/MedicalBackground/components/common/MedicalFormRadio';
import MedicalComponentWithRadioView from '@components/MedicalBackground/components/common/MedWithRadioView';
import { isDashString } from '@components/MedicalBackground/helpers';
import { mapObjectByPattern } from '@components/MedicalBackground/helpers/mapper';
import { fertilityHistoryValidationSchema } from '@components/MedicalBackground/helpers/medical_history_validation';
import useCloseMedicalBackgroundFormWithChangesModal from '@components/MedicalBackground/hooks/useCloseMedicalBackgroundFormWithChangesModal';
import useSaveMedicalBackgroundDataWithToast from '@components/MedicalBackground/hooks/useSaveMedicalBackgroundDataWithToast';
import mappingPattern from '@components/MedicalBackground/mapper/fertilityHistory';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { useRouter } from 'next/router';

const EditModeContent = ({ handleClose }: { handleClose: () => void }) => {
  const fertilityHistory = useAppSelector(patientsSelector.fertilityHistory);
  const mappedItems = useMemo(() => mapObjectByPattern(fertilityHistory, mappingPattern), [fertilityHistory]);
  const {
    query: { id }
  } = useRouter();
  const isUpdatingFertilityHistoryData = useAppSelector(patientsSelector.isFertilityHistoryDataUpdating);
  const defaultValues = useMemo(
    () =>
      mappedItems.reduce((previousValues, mappedItem) => {
        const { fieldName, viewValue, title, componentData, ...mappedItemProps } = mappedItem;

        const fieldDefaultValue = {
          [`${mappedItem.fieldName}`]: {
            ...mappedItemProps,
            value: isDashString(mappedItem.value) ? '' : mappedItem.value
          }
        };

        previousValues = { ...fieldDefaultValue, ...previousValues };

        return previousValues;
      }, {}),
    [mappedItems]
  );

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

            if (mappedItem?.componentData?.type === FlexibleItemType.Dropdown) {
              return (
                <FieldWithNote
                  fieldLabel={title}
                  fieldName={`${fieldName}`}
                  fieldComponent={
                    <Dropdown
                      fieldName={`${fieldName}.value`}
                      placeholder={title}
                      dropdownType={mappedItem?.componentData?.dropdownType}
                      label={title}
                    />
                  }
                  key={fieldName}
                />
              );
            }

            if (mappedItem?.componentData?.type === FlexibleItemType.Section) {
              const rows = mappedItem?.componentData?.rows as IFlexibleItem[][];
              const initialFields = rows.flat().reduce((previousValues, currentValue) => {
                previousValues[(currentValue as IFlexibleItem).fieldName] = '';

                return previousValues;
              }, {} as Record<string, string>);

              return (
                <FlexibleSection
                  fieldName={fieldName}
                  title={title}
                  tableTitle={mappedItem?.componentData?.tableTitle}
                  rows={rows}
                  initialFields={initialFields}
                  controlFieldName={`${fieldName}.${mappedItem?.componentData?.controlFieldName}`}
                  itemsFieldName={mappedItem?.componentData?.itemsFieldName}
                  addNewItemButtonLabel={mappedItem?.componentData?.addNewItemButtonLabel}
                  key={fieldName}
                />
              );
            }

            return (
              <FieldWithNote
                fieldLabel={title}
                fieldName={fieldName}
                fieldComponent={<MedicalFormRadio fieldName={`${fieldName}.value`} />}
              />
            );
          })}
        </Grid>
        <FormSubmit onClick={onClose} isDisabled={!isFormChanged} isLoading={isUpdatingFertilityHistoryData} />
      </form>
    </FormProvider>
  );
};

export default EditModeContent;
