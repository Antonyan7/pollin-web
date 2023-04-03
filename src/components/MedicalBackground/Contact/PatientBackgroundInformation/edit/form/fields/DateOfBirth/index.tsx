import React, { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import MedicalBackgroundNote from '@components/MedicalBackground/components/common/MedicalBackgroundNote';
import { BackgroundInformationFormFields } from '@components/MedicalBackground/Contact/PatientBackgroundInformation/edit/types';
import { Grid } from '@mui/material';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';
import { PollinDatePickerType } from 'types/datePicker';

import PollinDatePicker from '@ui-component/shared/DatePicker/PollinDatePicker';

const DateOfBirth = () => {
  const [t] = useTranslation();
  const fieldLabel = t(
    Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_BACKGROUND_INFORMATION_RELATIONSHIP_DATE_OF_BIRTH
  );
  const { control, getValues } = useFormContext();
  const { field } = useController({
    name: `${BackgroundInformationFormFields.DateOfBirth}.value`,
    control
  });
  const { onChange } = field;
  const [showAdditionalNote, setShowAdditionalNote] = useState(false);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

  return (
    <Grid container item px={paddings.leftRight24} py={paddings.topBottom16} direction="row" xs={12}>
      <Grid item container xs={5} direction="row" alignItems="center" flexWrap="nowrap" gap={2}>
        <ConsultationTitleWithIcon onClick={onNoteClick} description={fieldLabel} />
      </Grid>
      <Grid container direction="row" gap={2} item xs={7}>
        <PollinDatePicker
          type={PollinDatePickerType.Date}
          pickerConfigs={{
            label: t(Translation.PAGE_TASKS_MANAGER_MODAL_CREATE_PATIENT_DUE_DATE_PLACEHOLDER),
            value: getValues(BackgroundInformationFormFields.DateOfBirth).value,
            onChange,
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
