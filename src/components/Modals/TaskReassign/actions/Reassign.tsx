import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Stack, useTheme } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { tasksSelector } from '@redux/slices/tasks';
import { Translation } from 'constants/translations';

import { ButtonWithLoading } from '@ui-component/common/buttons';

const ConfirmButton = () => {
  const [t] = useTranslation();
  const theme = useTheme();
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const { watch } = useFormContext();
  const reassignButtonLabel = t(Translation.PAGE_TASKS_MANAGER_MODAL_REASSIGN_ACTIONS_REASSIGN);
  const isTaskReassignLoading = useAppSelector(tasksSelector.isTasksReassignLoading);

  useEffect(() => {
    const subscription = watch((value) => {
      const { assign } = value;

      if (assign) {
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
      <ButtonWithLoading
        disabled={isButtonDisabled}
        sx={{
          '&.MuiButton-root.MuiLoadingButton-root.Mui-disabled': {
            backgroundColor: theme.palette.grey[200]
          }
        }}
        type="submit"
        isLoading={isTaskReassignLoading}
        variant="contained"
      >
        {reassignButtonLabel}
      </ButtonWithLoading>
    </Stack>
  );
};

export default ConfirmButton;
