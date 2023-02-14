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
      return {
        background: success.light,
        color: success[800]
      };
    }

    if (isStatusWarning) {
      return {
        background: warning.light,
        color: warning[800]
      };
    }

    return {
      background: error[200],
      color: error[800]
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return chipColor;
};

export default useChipColor;
