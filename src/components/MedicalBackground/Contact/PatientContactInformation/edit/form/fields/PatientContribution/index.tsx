import React, { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DropdownOptionType, IDropdownOption } from '@axios/patientEmr/managerPatientEmrTypes';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import MedicalBackgroundNote from '@components/MedicalBackground/components/common/MedicalBackgroundNote';
import { ContactInformationFormFields } from '@components/MedicalBackground/Contact/PatientContactInformation/edit/types';
import { getDropdownByType, getDropdownOption } from '@components/MedicalBackground/helpers';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { paddings } from 'themes/themeConstants';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const FieldPatientContribution = () => {
  const [t] = useTranslation();
  const dropdownOptions = useAppSelector(patientsSelector.dropdowns);
  const isDropdownsLoading = useAppSelector(patientsSelector.isDropdownsLoading);
  const label = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_INFORMATION_PATIENT_PRIMARY_CONTRIBUTION);
  const { control } = useFormContext();
  const [showAdditionalNote, setShowAdditionalNote] = useState(false);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };
  const { field, fieldState } = useController({
    name: `${ContactInformationFormFields.Contribution}.value`,
    control
  });
  const { onChange, onBlur, ...fieldProps } = field;
  const contributionOptions = getDropdownByType(
    dropdownOptions,
    DropdownOptionType.PrimaryPatientContribution
  )?.options;
  const defaultContributionValue = getDropdownOption(
    dropdownOptions,
    DropdownOptionType.PrimaryPatientContribution,
    fieldProps.value
  );
  const errorHelperText = generateErrorMessage(label);

  return (
    <Grid container item px={paddings.leftRight24} py={paddings.topBottom16} direction="row" xs={12}>
      <Grid item container xs={5} direction="row" alignItems="flex-start" flexWrap="nowrap" gap={2}>
        <ConsultationTitleWithIcon description={label} onClick={onNoteClick} />
      </Grid>
      <Grid item container xs={7} gap={2}>
        <BaseDropdownWithLoading
          fullWidth
          isLoading={isDropdownsLoading}
          defaultValue={defaultContributionValue}
          options={contributionOptions as IDropdownOption[]}
          onChange={(_, value) => {
            if (value && typeof value === 'object' && 'id' in value) {
              onChange(value.id);
            }
          }}
          getOptionLabel={(contribution) => (typeof contribution === 'object' ? contribution.title : contribution)}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          popupIcon={<KeyboardArrowDownIcon />}
          renderInputProps={{
            helperText: fieldState?.error && errorHelperText,
            error: Boolean(fieldState?.error),
            ...fieldProps,
            label
          }}
        />
        <MedicalBackgroundNote
          onClick={onNoteClick}
          visible={showAdditionalNote}
          fieldName={ContactInformationFormFields.Contribution}
        />
      </Grid>
    </Grid>
  );
};

export default FieldPatientContribution;
