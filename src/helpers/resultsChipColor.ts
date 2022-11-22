import { Palette } from '@mui/material/styles/createPalette';
import { TestResultsStatsNumbers } from 'types/results';

export const getChipColor = (age: number, palette: Palette) => {
  const isStatusSuccess = age > 0 && age <= TestResultsStatsNumbers.Days15;
  const isStatusWarning = age > TestResultsStatsNumbers.Days15 && age <= TestResultsStatsNumbers.Days30;

  if (isStatusSuccess) {
    return palette.success;
  }

  if (isStatusWarning) {
    return palette.warning;
  }

  return palette.error;
};
