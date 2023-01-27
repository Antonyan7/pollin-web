import { useMemo } from 'react';
import { useTheme } from '@mui/system';
import { TestResultsStatsNumbers } from 'types/results';

const useChipColor = (value: number) => {
  const { palette } = useTheme();

  const chipColor = useMemo(() => {
    const isStatusSuccess = value > 0 && value <= TestResultsStatsNumbers.Days15;
    const isStatusWarning = value > TestResultsStatsNumbers.Days15 && value <= TestResultsStatsNumbers.Days30;
    const { success, warning, error } = palette;

    if (isStatusSuccess) {
      return success;
    }

    if (isStatusWarning) {
      return warning;
    }

    return error;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return chipColor;
};

export default useChipColor;
