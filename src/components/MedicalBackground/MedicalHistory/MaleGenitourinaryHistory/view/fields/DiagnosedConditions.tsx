import React from 'react';
import { useTranslation } from 'react-i18next';
import { DropdownOptionType } from '@axios/patientEmr/managerPatientEmrTypes';
import { RenderMappedNote, RenderSingleValueAndNote } from '@components/MedicalBackground/components/common';
import FieldWrapper from '@components/MedicalBackground/components/common/FieldWrapper';
import { GeneralHealthComponentsProps, getDropdownByType } from '@components/MedicalBackground/helpers';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const DiagnosedConditions = ({ componentIndex }: GeneralHealthComponentsProps) => {
  const [t] = useTranslation();
  const dropdownOptions = useAppSelector(patientsSelector.dropdowns);
  const medicalInfo = useAppSelector(patientsSelector.malePatientGenitourinaryHistory);
  const fieldValue = medicalInfo?.diagnosedConditions;
  const diagnosedConditionOptions = getDropdownByType(dropdownOptions, DropdownOptionType.DiagnosedConditions)?.options;
  const fieldName = t(
    Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GENITOURINARY_HISTORY_FIELD_DIAGNOSED_CONDITIONS
  );
  const optionValues = fieldValue?.items?.map(
    (fieldItem) =>
      diagnosedConditionOptions?.find((diagnosedConditionOption) => fieldItem.id === diagnosedConditionOption.id)?.title
  );

  return (
    <FieldWrapper fieldName={fieldName} componentIndex={componentIndex} hasNote={!!fieldValue?.note}>
      {optionValues?.length ? (
        <Grid>
          {optionValues.map((optionValue) => (
            <Grid key={optionValue}>{optionValue}</Grid>
          ))}
          <RenderMappedNote note={fieldValue?.note} />
        </Grid>
      ) : (
        <RenderSingleValueAndNote value="" note={fieldValue?.note} />
      )}
    </FieldWrapper>
  );
};

export default DiagnosedConditions;
