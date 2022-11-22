import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@redux/hooks';
import { resultsSelector } from '@redux/slices/results';
import { Translation } from 'constants/translations';
import { TestResultMeasurementType } from 'types/reduxTypes/resultsStateTypes';
import { FinalResultChipColor } from 'types/results';

const useTestResultStatusData = (currentFormFieldName: string) => {
  const { control } = useFormContext();
  const measurement = useWatch({ name: currentFormFieldName, control });
  const [t] = useTranslation();
  const isTestResultsDetailsLoading = useAppSelector(resultsSelector.isTestResultsDetailsLoading);
  const initialResultValue = t(Translation.MODAL_EXTERNAL_RESULTS_RESULT_TEXT);

  return useMemo(() => {
    if (!isTestResultsDetailsLoading && measurement) {
      // Optional used here because during page refresh we can have case when we wait form default data which comes from API
      const allElementsWithNormalStatus = measurement?.items.map((item: { resultType: TestResultMeasurementType }) => {
        // Here we are setting falsy value for the cases when nothing was returned from the backend
        if (!item.resultType) {
          return 0;
        }

        // If Result type will be something different from normal we will get falsy value
        return item.resultType === TestResultMeasurementType.Normal;
      });

      const allStatusesAreEmpty = allElementsWithNormalStatus?.every(
        (elementStatus: boolean | number) => elementStatus === 0
      );
      const allStatusesHaveFilledWithNormal = allElementsWithNormalStatus?.every(
        (elementStatus: boolean | number) => elementStatus === true
      );

      if (allStatusesAreEmpty) {
        return {
          testResultStatusLabel: initialResultValue,
          testResultStatusColor: FinalResultChipColor.Initial
        };
      }

      if (allStatusesHaveFilledWithNormal) {
        return {
          testResultStatusLabel: TestResultMeasurementType.Normal,
          testResultStatusColor: FinalResultChipColor.Normal
        };
      }

      return {
        testResultStatusLabel: TestResultMeasurementType.Abnormal,
        testResultStatusColor: FinalResultChipColor.Abnormal
      };
    }

    return {
      testResultStatusLabel: '',
      testResultStatusColor: ''
    };
  }, [isTestResultsDetailsLoading, measurement, initialResultValue]);
};

export default useTestResultStatusData;
