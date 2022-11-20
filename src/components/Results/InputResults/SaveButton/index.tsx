/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import React, { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FirebaseManager } from '@axios/firebase';
import { ITestResultsData } from '@axios/results/resultsManagerTypes';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { ITestResultItem } from 'types/reduxTypes/resultsStateTypes';

import { ButtonWithLoading } from '@ui-component/common/buttons';

import { IMeasurementsFieldValues, ResultsSaveButtonProps } from '../types';

const ResultsSaveButton: React.FC<ResultsSaveButtonProps> = ({ shouldSaveAsCompleted, currentFormFieldNames }) => {
  const [t] = useTranslation();
  const { control, handleSubmit } = useFormContext();
  const isTestResultsSubmitLoading = useAppSelector(resultsSelector.isTestResultsSubmitLoading);
  const defaultTestResults = useAppSelector(resultsSelector.testResultsDetails);
  const router = useRouter();
  const measurements = useWatch({ name: currentFormFieldNames, control });

  const detectSaveButtonState = useMemo(() => {
    // TODO here we should add case when no file uploaded yet when that part will be done

    const results = measurements.map(
      (item: ITestResultItem) => !!(item.resultType && item.result && item.dateReceived)
    );

    const allNecessaryFieldsAreFilled = results.every((every: boolean) => every);

    if (shouldSaveAsCompleted) {
      return t(Translation.PAGE_IN_HOUSE_RESULTS_TEST_SAVE_AS_COMPLETED);
    }

    if (allNecessaryFieldsAreFilled) {
      return t(Translation.PAGE_INPUT_RESULTS_TEST_SAVE_AS_FINAL);
    }

    return t(Translation.PAGE_INPUT_RESULTS_TEST_SAVE_AS_PENDING);
  }, [measurements, shouldSaveAsCompleted, t]);

  const onSubmit = async (data: IMeasurementsFieldValues) => {
    const allFormData = Object.values(data);

    const testResults: ITestResultsData[] = [];

    for (const { items, id, attachments: newAttachments = [], comment = '' } of allFormData) {
      const testResult = defaultTestResults.find((defaultTestResult) => defaultTestResult.id === id);

      const allAttachments = [];
      const defaultAttachedFileIds = testResult?.attachments.map((attachment) => attachment.id);

      for (const { file = null, id: attachmentId, title, note } of newAttachments) {
        if (file) {
          try {
            if (!isTestResultsSubmitLoading) {
              dispatch(resultsMiddleware.setIsTestResultsSubmitLoading(true));
            }

            const url = await FirebaseManager.uploadFile(file, 'uploads/portal/test-results/in-house/');

            allAttachments.push({
              url,
              title,
              note
            });
          } catch (e) {
            dispatch(resultsMiddleware.setIsTestResultsSubmitLoading(false));
          }
        } else if (defaultAttachedFileIds?.includes(attachmentId)) {
          allAttachments.push({
            id: attachmentId,
            title,
            note
          });
        } else {
          dispatch(resultsMiddleware.removeTestResultsAttachment(attachmentId));
        }
      }

      testResults.push({
        id,
        attachments: allAttachments,
        items,
        comment
      });
    }

    const testResultId = `${router.query.id}`;

    dispatch(resultsMiddleware.submitTestResults(testResults, testResultId));
  };

  return (
    <ButtonWithLoading isLoading={isTestResultsSubmitLoading} onClick={handleSubmit(onSubmit)} sx={{ fontWeight: 600 }}>
      {detectSaveButtonState}
    </ButtonWithLoading>
  );
};

export default ResultsSaveButton;
