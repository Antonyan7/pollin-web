import React from 'react';
import { Button, DialogActions } from '@mui/material';
import { PickersActionBarProps } from '@mui/x-date-pickers/PickersActionBar';
import { margins } from 'themes/themeConstants';

export const DatePickerActionBar = ({ onAccept, onCancel }: PickersActionBarProps) => (
  <DialogActions sx={{ marginBottom: margins.bottom8 }}>
    <Button onClick={onCancel} sx={{ marginRight: margins.right24 }} variant="outlined">
      Cancel
    </Button>
    <Button onClick={onAccept} sx={{ marginRight: margins.right8 }} variant="contained">
      OK
    </Button>
  </DialogActions>
);
