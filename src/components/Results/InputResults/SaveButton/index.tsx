import React, { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Translation } from 'constants/translations';
import { ITestResultItem } from 'types/reduxTypes/resultsStateTypes';

import { ButtonWithLoading } from '@ui-component/common/buttons';

import { ResultsSaveButtonProps } from '../types';

import useSubmitTestResults from './hooks/useSubmitTestResults';

const ResultsSaveButton: React.FC<ResultsSaveButtonProps> = ({ shouldSaveAsCompleted, currentFormFieldNames }) => {
  const [t] = useTranslation();
  const { control, handleSubmit } = useFormContext();
  const measurements = useWatch({ name: currentFormFieldNames, control });

  const { saveButtonLabel, areAllRequiredFieldsFilled } = useMemo(() => {
    if (measurements?.length > 0) {
      const results = measurements
        .map((measurement) => {
          if (measurement.items?.length > 0) {
            return [
              ...measurement.items.map(
                (item: ITestResultItem) => !!(item.resultType && item.result && item.dateReceived)
              )
            ];
          }

          return [];
        })
        .flat();

      // For external results attachment is required!
      if (!shouldSaveAsCompleted) {
        results.push(!!measurements[0]?.attachments?.length);
      }

      const allNecessaryFieldsAreFilled = results.every((every: boolean) => every);

      if (shouldSaveAsCompleted) {
        return {
          areAllRequiredFieldsFilled: allNecessaryFieldsAreFilled,
          saveButtonLabel: t(Translation.PAGE_IN_HOUSE_RESULTS_TEST_SAVE_AS_COMPLETED)
        };
      }

      if (allNecessaryFieldsAreFilled) {
        return {
          areAllRequiredFieldsFilled: allNecessaryFieldsAreFilled,
          saveButtonLabel: t(Translation.PAGE_INPUT_RESULTS_TEST_SAVE_AS_FINAL)
        };
      }

      return {
        areAllRequiredFieldsFilled: allNecessaryFieldsAreFilled,
        saveButtonLabel: t(Translation.PAGE_INPUT_RESULTS_TEST_SAVE_AS_PENDING)
      };
    }

    // Case when measurements is not available yet
    return {
      areAllRequiredFieldsFilled: false,
      saveButtonLabel: t(Translation.PAGE_INPUT_RESULTS_TEST_SAVE_AS_PENDING)
    };
  }, [measurements, shouldSaveAsCompleted, t]);

  const shouldDisableSaveButton = !areAllRequiredFieldsFilled && shouldSaveAsCompleted;
  const { onTestResultsSubmit, isTestResultsSubmitLoading } = useSubmitTestResults();

  return (
    <ButtonWithLoading
      disabled={shouldDisableSaveButton}
      isLoading={isTestResultsSubmitLoading}
      onClick={handleSubmit(onTestResultsSubmit)}
      sx={{ fontWeight: 500 }}
    >
      {saveButtonLabel}
    </ButtonWithLoading>
  );
};

export default ResultsSaveButton;
