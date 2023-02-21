import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Stack } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { borderRadius, paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

const ConfirmButton = () => {
  const [t] = useTranslation();
  const cancelButtonLabel = t(Translation.PAGE_TASKS_MANAGER_MODAL_REASSIGN_ACTIONS_CANCEL);

  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(ModalName.ReassignTaskModal));
  }, []);

  return (
    <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
      <Button
        sx={{
          borderRadius: borderRadius.radius8,
          py: paddings.top12,
          px: paddings.leftRight24
        }}
        onClick={onClose}
        variant="outlined"
      >
        {cancelButtonLabel}
      </Button>
    </Stack>
  );
};

export default ConfirmButton;
