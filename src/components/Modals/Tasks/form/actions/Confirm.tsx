import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid, Stack, useTheme } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { tasksSelector } from '@redux/slices/tasks';
import { Translation } from 'constants/translations';

import { ButtonWithLoading } from '@ui-component/common/buttons';

const ConfirmButton = () => {
  const [t] = useTranslation();
  const theme = useTheme();
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const { watch } = useFormContext();
  const addButtonLabel = t(Translation.MODAL_CONFIRM_MACHINE_BUTTON_CONFIRM);
  const isTasksCreateLoading = useAppSelector(tasksSelector.isTasksCreateLoading);

  useEffect(() => {
    const subscription = watch((value) => {
      const { description, patient, ...rest } = value;

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
        <ButtonWithLoading
          disabled={isButtonDisabled}
          sx={{
            '&.MuiButton-root.MuiLoadingButton-root.Mui-disabled': {
              backgroundColor: theme.palette.grey[200]
            }
          }}
          type="submit"
          isLoading={isTasksCreateLoading}
          variant="contained"
        >
          {addButtonLabel}
        </ButtonWithLoading>
      </Stack>
    </Grid>
  );
};

export default ConfirmButton;
