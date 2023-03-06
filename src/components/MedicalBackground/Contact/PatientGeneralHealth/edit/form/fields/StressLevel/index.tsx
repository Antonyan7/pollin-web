import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Grid } from '@mui/material';
import { Translation } from 'constants/translations';
import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { paddings } from 'themes/themeConstants';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const StressLevel = () => {
  const [t] = useTranslation();
  const label = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_STRESS_LEVEL);
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name: `${GeneralHealthFormFields.CurrentStressLevel}.value`,
    control
  });
  const errorHelperText = generateErrorMessage(label);

  return (
    <Grid container item px={paddings.leftRight32} py={paddings.topBottom16} direction="row" xs={12}>
      <Grid item container xs={5} direction="row" alignItems="center" flexWrap="nowrap" gap={2}>
        <ConsultationTitleWithIcon description={label} />
      </Grid>
      <Grid item xs={7}>
        <BaseDropdownWithLoading
          isLoading={false}
          options={[]}
          popupIcon={<KeyboardArrowDownIcon />}
          renderInputProps={{
            helperText: fieldState?.error && errorHelperText,
            error: Boolean(fieldState?.error),
            ...field,
            label
          }}
        />
      </Grid>
    </Grid>
  );
};

export default StressLevel;
