import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, DialogActions } from '@mui/material';
import { PickersActionBarProps } from '@mui/x-date-pickers/PickersActionBar';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { margins } from 'themes/themeConstants';

export const DatePickerActionBar = ({ onAccept, onCancel }: PickersActionBarProps) => {
  const [t] = useTranslation();

  return (
    <DialogActions sx={{ marginBottom: margins.bottom8 }}>
      <Button
        data-cy={CypressIds.COMMON_TIME_PICKER_BUTTON_CANCEL}
        onClick={onCancel}
        sx={{ marginRight: margins.right24 }}
        variant="outlined"
      >
        {t(Translation.MODAL_CANCEL)}
      </Button>
      <Button
        data-cy={CypressIds.COMMON_TIME_PICKER_BUTTON_SAVE}
        onClick={onAccept}
        sx={{ marginRight: margins.right8 }}
        variant="contained"
      >
        {t(Translation.MODAL_OK)}
      </Button>
    </DialogActions>
  );
};
