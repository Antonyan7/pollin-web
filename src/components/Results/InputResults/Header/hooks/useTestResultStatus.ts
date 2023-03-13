import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@redux/hooks';
import { resultsSelector } from '@redux/slices/results';
import { Translation } from 'constants/translations';
import { UnitResultType } from 'types/reduxTypes/resultsStateTypes';
import { FinalResultChipColor } from 'types/results';

const useTestResultStatusData = (currentFormFieldName: string) => {
  const { control } = useFormContext();
  const measurement = useWatch({ name: currentFormFieldName, control });

  const [t] = useTranslation();
  const isTestResultsDetailsLoading = useAppSelector(resultsSelector.isTestResultsDetailsLoading);
  const initialResultValue = t(Translation.PAGE_INPUT_EXTERNAL_RESULTS_RESULT_TEXT);

  return useMemo(() => {
    if (!isTestResultsDetailsLoading && measurement?.items?.length > 0) {
      // Optional used here because during page refresh we can have case when we wait form default data which comes from API
      let finalTestResultType = '';

      measurement?.items.forEach(({ resultType }: { resultType: UnitResultType }) => {
        if (finalTestResultType === UnitResultType.TestNotComplete) {
          return;
        }

        if (resultType !== UnitResultType.Abnormal && resultType !== UnitResultType.Normal) {
          finalTestResultType = UnitResultType.TestNotComplete;
        } else if (resultType === UnitResultType.Abnormal || finalTestResultType === UnitResultType.Abnormal) {
          finalTestResultType = UnitResultType.Abnormal;
        } else {
          finalTestResultType = UnitResultType.Normal;
        }
      });

      if (finalTestResultType === UnitResultType.TestNotComplete) {
        return {
          testResultStatusLabel: initialResultValue,
          testResultStatusColor: FinalResultChipColor.Initial
        };
      }

      if (finalTestResultType === UnitResultType.Normal) {
        return {
          testResultStatusLabel: UnitResultType.Normal,
          testResultStatusColor: FinalResultChipColor.Normal
        };
      }

      return {
        testResultStatusLabel: UnitResultType.Abnormal,
        testResultStatusColor: FinalResultChipColor.Abnormal
      };
    }

    return {
      testResultStatusLabel: initialResultValue,
      testResultStatusColor: FinalResultChipColor.Initial
    };
  }, [isTestResultsDetailsLoading, measurement, initialResultValue]);
};

export default useTestResultStatusData;
