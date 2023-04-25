import React, { useRef, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DropdownOptionType, IDropdownOption } from '@axios/patientEmr/managerPatientEmrTypes';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import MedicalBackgroundNote from '@components/MedicalBackground/components/common/MedicalBackgroundNote';
import { BackgroundInformationFormFields } from '@components/MedicalBackground/Contact/PatientBackgroundInformation/edit/types';
import { getDropdownByType, getDropdownOption } from '@components/MedicalBackground/helpers';
import useScrollIntoView from '@components/MedicalBackground/hooks/useScrollIntoView';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { paddings } from 'themes/themeConstants';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const Pronouns = () => {
  const [t] = useTranslation();
  const fieldLabel = t(
    Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_BACKGROUND_INFORMATION_SEXUAL_PRONOUNS
  );
  const dropdownOptions = useAppSelector(patientsSelector.dropdowns);
  const isDropdownsLoading = useAppSelector(patientsSelector.isDropdownsLoading);
  const patientBackgroundInformation = useAppSelector(patientsSelector.patientBackgroundInformation);
  const pronouns = patientBackgroundInformation?.preferredPronouns;
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name: `${BackgroundInformationFormFields.PreferredPronouns}.value`,
    control
  });
  const { onChange, onBlur, ...fieldProps } = field;
  const genderOptions = getDropdownByType(dropdownOptions, DropdownOptionType.Pronouns)?.options;
  const defaultGenderValue = getDropdownOption(dropdownOptions, DropdownOptionType.Pronouns, fieldProps.value);
  const errorHelperText = generateErrorMessage(fieldLabel);
  const pronounsRef = useRef<HTMLInputElement>(null);

  useScrollIntoView(pronounsRef, fieldState);

  const onPronounsChange = (value: IDropdownOption) => {
    if (value && typeof value === 'object' && 'id' in value) {
      onChange(value.id);
    }
  };

  const [showAdditionalNote, setShowAdditionalNote] = useState(!!pronouns?.note);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

  return (
    <Grid container item px={paddings.leftRight24} py={paddings.topBottom16} direction="row" xs={12}>
      <Grid item container xs={5} direction="row" alignItems="flex-start" flexWrap="nowrap" gap={2}>
        <ConsultationTitleWithIcon onClick={onNoteClick} description={fieldLabel} />
      </Grid>
      <Grid container direction="row" gap={2} item xs={7}>
        <BaseDropdownWithLoading
          fullWidth
          isLoading={isDropdownsLoading}
          defaultValue={defaultGenderValue}
          options={genderOptions as IDropdownOption[]}
          onChange={(_, value) => onPronounsChange(value as IDropdownOption)}
          getOptionLabel={(contribution) => (typeof contribution === 'object' ? contribution.title : contribution)}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          clearIcon={<CloseIcon onClick={() => onChange({ ...defaultGenderValue, value: '' })} fontSize="small" />}
          popupIcon={<KeyboardArrowDownIcon />}
          renderInputProps={{
            helperText: fieldState?.error && errorHelperText,
            error: Boolean(fieldState?.error),
            ...fieldProps,
            label: fieldLabel,
            ref: pronounsRef
          }}
        />
        <MedicalBackgroundNote
          onClick={onNoteClick}
          visible={showAdditionalNote}
          fieldName={BackgroundInformationFormFields.PreferredPronouns}
        />
      </Grid>
    </Grid>
  );
};

export default Pronouns;
