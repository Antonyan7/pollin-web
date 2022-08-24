import { AutocompleteInputChangeReason } from '@mui/material';

export const validateInputChange = (_: React.SyntheticEvent, value: string, reason: AutocompleteInputChangeReason) => {
  if (reason === 'reset') {
    return '';
  }

  return value;
};
