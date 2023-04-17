import React, { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DropdownOptionType, IDropdownOption } from '@axios/patientEmr/managerPatientEmrTypes';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import MedicalBackgroundNote from '@components/MedicalBackground/components/common/MedicalBackgroundNote';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { getDropdownByType, getDropdownOption } from '@components/MedicalBackground/helpers';
import CloseIcon from '@mui/icons-material/Close';
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
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const stressLevel = generalHealth?.currentStressLevel;
  const dropdownOptions = useAppSelector(patientsSelector.dropdowns);
  const isDropdownsLoading = useAppSelector(patientsSelector.isDropdownsLoading);
  const label = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_STRESS_LEVEL);
  const { control, register } = useFormContext();
  const { field, fieldState } = useController({
    name: `${GeneralHealthFormFields.CurrentStressLevel}.value`,
    control
  });
  const { onChange, onBlur, ...fieldProps } = field;
  const stressLevelOptions = getDropdownByType(dropdownOptions, DropdownOptionType.StressLevel)?.options;
  const defaultContributionValue = getDropdownOption(dropdownOptions, DropdownOptionType.StressLevel, fieldProps.value);
  const errorHelperText = generateErrorMessage(label);
  const [showAdditionalNote, setShowAdditionalNote] = useState(!!stressLevel?.note);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

  const { name, ref } = register(`${GeneralHealthFormFields.CurrentStressLevel}.value`);

  return (
    <Grid container item px={paddings.leftRight32} py={paddings.topBottom16} direction="row" xs={12}>
      <Grid item container xs={5} direction="row" alignItems="flex-start" flexWrap="nowrap" gap={2}>
        <ConsultationTitleWithIcon description={label} onClick={onNoteClick} />
      </Grid>
      <Grid item container xs={7} gap={2}>
        <BaseDropdownWithLoading
          fullWidth
          isLoading={isDropdownsLoading}
          defaultValue={defaultContributionValue}
          options={stressLevelOptions as IDropdownOption[]}
          popupIcon={<KeyboardArrowDownIcon />}
          onChange={(_, value) => {
            if (value && typeof value === 'object' && 'id' in value) {
              onChange(value.id);
            } else {
              onChange('');
            }
          }}
          getOptionLabel={(contribution) => (typeof contribution === 'object' ? contribution.title : contribution)}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          clearIcon={<CloseIcon onClick={() => onChange('')} fontSize="small" />}
          renderInputProps={{
            helperText: fieldState?.error && errorHelperText,
            error: Boolean(fieldState?.error),
            ...fieldProps,
            name,
            ref,
            label
          }}
        />
        <MedicalBackgroundNote
          onClick={onNoteClick}
          visible={showAdditionalNote}
          fieldName={GeneralHealthFormFields.CurrentStressLevel}
        />
      </Grid>
    </Grid>
  );
};

export default StressLevel;
