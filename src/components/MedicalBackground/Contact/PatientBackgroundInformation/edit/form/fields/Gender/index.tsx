import React, { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DropdownOptionType, IDropdownOption } from '@axios/patientEmr/managerPatientEmrTypes';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import MedicalBackgroundNote from '@components/MedicalBackground/components/common/MedicalBackgroundNote';
import OtherGender from '@components/MedicalBackground/Contact/PatientBackgroundInformation/edit/form/fields/Gender/fields/Other';
import { BackgroundInformationFormFields } from '@components/MedicalBackground/Contact/PatientBackgroundInformation/edit/types';
import { getDropdownByType, getDropdownOption } from '@components/MedicalBackground/helpers';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { paddings } from 'themes/themeConstants';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const Gender = () => {
  const [t] = useTranslation();
  const dropdownOptions = useAppSelector(patientsSelector.dropdowns);
  const isDropdownsLoading = useAppSelector(patientsSelector.isDropdownsLoading);
  const label = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_BACKGROUND_INFORMATION_GENDER);
  const [isOther, setIsOther] = useState<boolean>(false);
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name: `${BackgroundInformationFormFields.Gender}.value`,
    control
  });
  const { onChange, onBlur, ...fieldProps } = field;
  const genderOptions = getDropdownByType(dropdownOptions, DropdownOptionType.Gender)?.options;
  const defaultGenderValue = getDropdownOption(dropdownOptions, DropdownOptionType.Gender, fieldProps.value);
  const errorHelperText = generateErrorMessage(label);
  const onGenderChange = (value?: IDropdownOption | null) => {
    if (value && typeof value === 'object' && 'id' in value) {
      if (value.id === 'Other') {
        setIsOther(true);
      } else {
        setIsOther(false);
      }

      onChange(value.id);
    }
  };
  const [showAdditionalNote, setShowAdditionalNote] = useState(false);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

  return (
    <Grid container item px={paddings.leftRight24} py={paddings.topBottom16} direction="row" xs={12}>
      <Grid item container xs={5} direction="row" alignItems="center" flexWrap="nowrap" gap={2}>
        <ConsultationTitleWithIcon onClick={onNoteClick} description={label} />
      </Grid>
      <Grid direction="row" container gap={2} item xs={7}>
        <BaseDropdownWithLoading
          fullWidth
          isLoading={isDropdownsLoading}
          defaultValue={defaultGenderValue}
          options={genderOptions as IDropdownOption[]}
          onChange={(_, value) => onGenderChange(value as IDropdownOption)}
          getOptionLabel={(contribution) => (typeof contribution === 'object' ? contribution.title : contribution)}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          popupIcon={<KeyboardArrowDownIcon />}
          renderInputProps={{
            helperText: fieldState?.error && errorHelperText,
            error: Boolean(fieldState?.error),
            ...fieldProps,
            fullWidth: true,
            label
          }}
        />
        {isOther ? <OtherGender /> : null}
        <MedicalBackgroundNote
          onClick={onNoteClick}
          visible={showAdditionalNote}
          fieldName={BackgroundInformationFormFields.Gender}
        />
      </Grid>
    </Grid>
  );
};

export default Gender;
