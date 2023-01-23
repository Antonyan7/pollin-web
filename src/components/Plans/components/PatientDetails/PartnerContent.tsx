import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox, FormControlLabel, Grid, TextField, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const PartnerContent = () => {
  const theme = useTheme();
  const [t] = useTranslation();
  const [isPartnerPresentChecked, setPartnerPresent] = useState(false);

  return (
    <Grid item container direction="column" gap={3} padding={paddings.all20}>
      <Grid item container direction="row" justifyContent="space-between" xs={12} spacing={2}>
        <Grid item xs={6}>
          <TextField fullWidth label={t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_FIRSTNAME)} />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth label={t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_LASTNAME)} />
        </Grid>
      </Grid>
      <Grid>
        <TextField fullWidth label={t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_EMAIL_ADDRESS)} />
      </Grid>
      <Grid item container direction="row" justifyContent="space-between" xs={12} spacing={2}>
        <Grid item xs={6}>
          <BaseDropdownWithLoading
            isLoading={false}
            options={[]}
            renderInputProps={{
              label: t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_PARTNER_CONTRIBUTION)
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <BaseDropdownWithLoading
            isLoading={false}
            options={[]}
            renderInputProps={{
              label: t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_PARTNER_RELATIONSHIP)
            }}
          />
        </Grid>
      </Grid>
      <Grid>
        <FormControlLabel
          control={
            <Checkbox
              checked={isPartnerPresentChecked}
              onChange={(event) => {
                setPartnerPresent(event.target.checked);
              }}
              sx={{
                color: theme.palette.primary.main
              }}
            />
          }
          label={t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_PARTNER_PRESENT_INITIAL_CONSULTATION)}
        />
      </Grid>
    </Grid>
  );
};

export default PartnerContent;
