import React, { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import MedicalBackgroundNote from '@components/MedicalBackground/components/common/MedicalBackgroundNote';
import { BackgroundInformationFormFields } from '@components/MedicalBackground/Contact/PatientBackgroundInformation/edit/types';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { paddings } from 'themes/themeConstants';
import { PollinDatePickerType } from 'types/datePicker';

import PollinDatePicker from '@ui-component/shared/DatePicker/PollinDatePicker';
import { DateUtil } from '@utils/date/DateUtil';

const DateOfBirth = () => {
  const [t] = useTranslation();
  const fieldLabel = t(
    Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_BACKGROUND_INFORMATION_RELATIONSHIP_DATE_OF_BIRTH
  );
  const { control } = useFormContext();
  const patientBackgroundInformation = useAppSelector(patientsSelector.patientBackgroundInformation);
  const dateOfBirth = patientBackgroundInformation?.dateOfBirth;
  const { field, fieldState } = useController({
    name: `${BackgroundInformationFormFields.DateOfBirth}.value`,
    control
  });
  const { onChange } = field;
  const [showAdditionalNote, setShowAdditionalNote] = useState(!!dateOfBirth?.note);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };
  const errorHelperText = generateErrorMessage(fieldLabel);

  return (
    <Grid container item px={paddings.leftRight24} py={paddings.topBottom16} direction="row" xs={12}>
      <Grid item container xs={5} direction="row" alignItems="flex-start" flexWrap="nowrap" gap={2}>
        <ConsultationTitleWithIcon onClick={onNoteClick} description={fieldLabel} />
      </Grid>
      <Grid container direction="row" gap={2} item xs={7}>
        <PollinDatePicker
          type={PollinDatePickerType.Date}
          pickerConfigs={{
            label: t(Translation.PAGE_TASKS_MANAGER_MODAL_CREATE_PATIENT_DUE_DATE_PLACEHOLDER),
            value: field.value,
            onChange,
            maxDate: DateUtil.representInClinicDate(new Date()),
            errorMessage: fieldState?.error && errorHelperText,
            isError: Boolean(fieldState?.error),
            isLimitedByWorkingHours: false
          }}
        />
        <MedicalBackgroundNote
          onClick={onNoteClick}
          visible={showAdditionalNote}
          fieldName={BackgroundInformationFormFields.DateOfBirth}
        />
      </Grid>
    </Grid>
  );
};

export default DateOfBirth;
