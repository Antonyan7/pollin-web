import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IFemalePatientGynaecologicalHistoryProps } from '@axios/patientEmr/managerPatientEmrTypes';
import FormSubmit from '@components/common/Form/Footer/FormSubmit';
import { isDashString, nonValidProperty } from '@components/MedicalBackground/helpers';
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

import { DateUtil } from '@utils/date/DateUtil';

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
    resolver: yupResolver(gynaecologicalHistoryValidationSchema),
    mode: 'onSubmit',
    shouldFocusError: true,
    criteriaMode: 'all'
  });

  const {
    formState: { dirtyFields }
  } = methods;

  const isFormChanged = Object.values(dirtyFields).length > 0;
  const onClose = useCloseMedicalBackgroundFormWithChangesModal(isFormChanged, handleClose);
  const onSave = useSaveMedicalBackgroundDataWithToast(handleClose);

  const { handleSubmit } = methods;

  const handleSave = (data: IFemalePatientGynaecologicalHistoryProps) => {
    const { papTestLastDate, cervixTreatment, intercoursePain, ...otherFemaleGynaecologicalData } = data;
    const femalePatientGynaecologicalHistoryData = {
      ...otherFemaleGynaecologicalData,
      ...(nonValidProperty(cervixTreatment?.value) ? {} : { cervixTreatment }),
      ...(nonValidProperty(intercoursePain?.value) ? {} : { intercoursePain }),
      ...(papTestLastDate?.value === ''
        ? {}
        : {
            papTestLastDate: {
              ...papTestLastDate,
              isEditable: papTestLastDate?.isEditable as boolean,
              value: DateUtil.convertToDateOnly(papTestLastDate?.value as string),
              note: papTestLastDate?.note as string
            }
          })
    };

    dispatch(
      patientsMiddleware.updateFemalePatientGynaecologicalHistory(
        id as string,
        femalePatientGynaecologicalHistoryData,
        onSave
      )
    );
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
