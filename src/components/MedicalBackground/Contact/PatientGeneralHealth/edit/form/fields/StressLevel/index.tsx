import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DropdownOptionType, IDropdownOption } from '@axios/patientEmr/managerPatientEmrTypes';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { getDropdownByType, getDropdownOption } from '@components/MedicalBackground/helpers';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { paddings } from 'themes/themeConstants';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const StressLevel = () => {
  const [t] = useTranslation();
  const dropdownOptions = useAppSelector(patientsSelector.dropdowns);
  const isDropdownsLoading = useAppSelector(patientsSelector.isDropdownsLoading);
  const label = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_STRESS_LEVEL);
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name: `${GeneralHealthFormFields.CurrentStressLevel}.value`,
    control
  });
  const { onChange, onBlur, ...fieldProps } = field;
  const stressLevelOptions = getDropdownByType(dropdownOptions, DropdownOptionType.StressLevel)?.options;
  const defaultContributionValue = getDropdownOption(dropdownOptions, DropdownOptionType.StressLevel, fieldProps.value);
  const errorHelperText = generateErrorMessage(label);

  return (
    <Grid container item px={paddings.leftRight32} py={paddings.topBottom16} direction="row" xs={12}>
      <Grid item container xs={5} direction="row" alignItems="center" flexWrap="nowrap" gap={2}>
        <ConsultationTitleWithIcon description={label} />
      </Grid>
      <Grid item xs={7}>
        <BaseDropdownWithLoading
          isLoading={isDropdownsLoading}
          defaultValue={defaultContributionValue}
          options={stressLevelOptions as IDropdownOption[]}
          popupIcon={<KeyboardArrowDownIcon />}
          onChange={(_, value) => {
            if (value && typeof value === 'object' && 'id' in value) {
              onChange(value.id);
            }
          }}
          getOptionLabel={(contribution) => (typeof contribution === 'object' ? contribution.title : contribution)}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInputProps={{
            helperText: fieldState?.error && errorHelperText,
            error: Boolean(fieldState?.error),
            ...fieldProps,
            label
          }}
        />
      </Grid>
    </Grid>
  );
};

export default StressLevel;
