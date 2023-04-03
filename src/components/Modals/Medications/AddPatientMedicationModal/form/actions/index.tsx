import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Grid, Stack, useTheme } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { borderRadius, paddings } from 'themes/themeConstants';

import { ButtonWithLoading } from '@ui-component/common/buttons';

const ConfirmButton = () => {
  const [t] = useTranslation();
  const theme = useTheme();
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const { watch } = useFormContext();
  const isMedicationCreated = useAppSelector(patientsSelector.isMedicationCreatedLoading);

  useEffect(() => {
    const subscription = watch((value) => {
      const { time, prescriber, ...rest } = value;

      const isRequiredFieldsFilled = Object.values(rest).every((field) => Boolean(field));

      if (isRequiredFieldsFilled) {
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Grid item xs={12}>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
        <Button
          sx={{
            fontWeight: 500,
            borderRadius: borderRadius.radius10,
            px: paddings.leftRight24,
            py: paddings.topBottom12
          }}
          variant="outlined"
        >
          {t(Translation.COMMON_BUTTON_CANCEL_LABEL)}
        </Button>
        <ButtonWithLoading
          disabled={isButtonDisabled}
          sx={{
            '&.MuiButton-root.MuiLoadingButton-root.Mui-disabled': {
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.common.white
            }
          }}
          type="submit"
          isLoading={isMedicationCreated}
          variant="contained"
        >
          {t(Translation.COMMON_BUTTON_SAVE_LABEL)}
        </ButtonWithLoading>
      </Stack>
    </Grid>
  );
};

export default ConfirmButton;
