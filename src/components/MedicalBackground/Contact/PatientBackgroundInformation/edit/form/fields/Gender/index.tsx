import React, { useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DropdownOptionType, IDropdownOption } from '@axios/patientEmr/managerPatientEmrTypes';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import MedicalBackgroundNote from '@components/MedicalBackground/components/common/MedicalBackgroundNote';
import OtherGender from '@components/MedicalBackground/Contact/PatientBackgroundInformation/edit/form/fields/Gender/fields/Other';
import { BackgroundInformationFormFields } from '@components/MedicalBackground/Contact/PatientBackgroundInformation/edit/types';
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

const Gender = () => {
  const [t] = useTranslation();
  const dropdownOptions = useAppSelector(patientsSelector.dropdowns);
  const patientBackgroundInformation = useAppSelector(patientsSelector.patientBackgroundInformation);
  const gender = patientBackgroundInformation?.gender;
  const isDropdownsLoading = useAppSelector(patientsSelector.isDropdownsLoading);
  const label = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_BACKGROUND_INFORMATION_GENDER);
  const [isOther, setIsOther] = useState<boolean>(false);
  const { control } = useFormContext();
  const {
    field: { ref, ...field },
    fieldState
  } = useController({
    name: `${BackgroundInformationFormFields.Gender}.value`,
    control
  });
  const { onChange, onBlur, ...fieldProps } = field;
  const genderOptions = getDropdownByType(dropdownOptions, DropdownOptionType.Gender)?.options;
  const defaultGenderValue = getDropdownOption(dropdownOptions, DropdownOptionType.Gender, fieldProps.value);
  const errorHelperText = generateErrorMessage(label);

  const onGenderChange = (value?: IDropdownOption | null) => {
    if (value && typeof value === 'object' && 'id' in value) {
      setIsOther(value.id === 'Other');
      onChange(value.id);
    }
  };
  const [showAdditionalNote, setShowAdditionalNote] = useState(!!gender?.note);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

  useEffect(() => {
    if (field.value === 'Other') {
      setIsOther(true);
    }
  }, [field.value]);

  return (
    <Grid container item px={paddings.leftRight24} py={paddings.topBottom16} direction="row" xs={12}>
      <Grid item container xs={5} direction="row" alignItems="flex-start" flexWrap="nowrap" gap={2}>
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
          clearIcon={<CloseIcon onClick={() => onChange({ ...defaultGenderValue, value: '' })} fontSize="small" />}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          popupIcon={<KeyboardArrowDownIcon />}
          renderInputProps={{
            helperText: fieldState?.error && errorHelperText,
            error: Boolean(fieldState?.error),
            ...fieldProps,
            inputRef: ref,
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
