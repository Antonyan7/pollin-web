import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ConsultationFormRadioGroup } from '@components/MedicalBackground/components/common';
import { FormControlLabel, Grid, Radio, Typography } from '@mui/material';
import { Translation } from 'constants/translations';
import { margins } from 'themes/themeConstants';

import { PrescriptionTypeEnum } from '../initialValues';

const PrescriptionType = () => {
  const fieldName = 'type';
  const [t] = useTranslation();
  const { control } = useFormContext();
  const { field } = useController({ name: fieldName, control });
  const { onChange, ...fieldProps } = field;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Grid item container>
      <Grid>
        <Typography variant="h5">{t(Translation.MODAL_PRESCRIPTIONS_TYPE)}</Typography>
      </Grid>
      <Grid ml={margins.left8}>
        <ConsultationFormRadioGroup {...fieldProps} value={field.value} onChange={handleChange}>
          <FormControlLabel
            value={PrescriptionTypeEnum.Pollin}
            control={<Radio />}
            label={t(Translation.MODAL_PRESCRIPTIONS_TYPE_POLLIN)}
          />
          <FormControlLabel
            value={PrescriptionTypeEnum.External}
            control={<Radio />}
            label={t(Translation.MODAL_PRESCRIPTIONS_TYPE_EXTERNAL)}
          />
        </ConsultationFormRadioGroup>
      </Grid>
    </Grid>
  );
};

export default PrescriptionType;
