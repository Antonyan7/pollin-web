/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

import { useCallback, useEffect } from 'react';
import { FirebaseManager } from '@axios/firebase';
import { ITestResultsData } from '@axios/results/resultsManagerTypes';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { isDate } from 'date-fns';
import { useRouter } from 'next/router';

import { DateUtil } from '@utils/date/DateUtil';

import { IMeasurementsFieldValues } from '../../types';

const useSubmitTestResults = () => {
  const defaultTestResults = useAppSelector(resultsSelector.testResultsDetails);
  const isTestResultsSubmitLoading = useAppSelector(resultsSelector.isTestResultsSubmitLoading);
  const isTestResultsSubmitWentSuccessful = useAppSelector(resultsSelector.isTestResultsSubmitWentSuccessful);
  const router = useRouter();

  useEffect(() => {
    const isSubmitWentSuccessful =
      isTestResultsSubmitWentSuccessful !== null && isTestResultsSubmitWentSuccessful && !isTestResultsSubmitLoading;

    if (isSubmitWentSuccessful) {
      router.back();
    }

    return () => {
      dispatch(resultsMiddleware.setIsTestResultsSubmitWentSuccessful(null));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTestResultsSubmitLoading, isTestResultsSubmitWentSuccessful]);

  const onTestResultsSubmit = useCallback(
    async (data: IMeasurementsFieldValues) => {
      const allFormData = Object.values(data);

      const testResults: ITestResultsData[] = [];

      const isInHouseTestResults = testResults?.length > 1;

      const fileUploadPath = !isInHouseTestResults
        ? 'uploads/portal/test-results/external/'
        : 'uploads/portal/test-results/in-house/';

      for (const { items, id, attachments: newAttachments = [], comment = '' } of allFormData) {
        const testResult = defaultTestResults?.find((defaultTestResult) => defaultTestResult.id === id);

        const allAttachments = [];
        const defaultAttachedFileIds = testResult?.attachments?.map((attachment) => attachment.id) ?? [];
        const attachedFilesFormDataIds = newAttachments?.map((newAttachment) => newAttachment.id) ?? [];

        for (const { file = null, id: attachmentId, title, note } of newAttachments) {
          if (file) {
            try {
              if (!isTestResultsSubmitLoading) {
                dispatch(resultsMiddleware.setIsTestResultsSubmitLoading(true));
              }

              const url = await FirebaseManager.uploadFile(file, fileUploadPath);

              allAttachments.push({
                url,
                title,
                note
              });
            } catch (e) {
              dispatch(resultsMiddleware.setIsTestResultsSubmitLoading(false));

              return null;
            }
          } else {
            allAttachments.push({
              id: attachmentId,
              title,
              note
            });
          }
        }

        // Compare default attachments to new attachments which came from useForm hook
        // If Attachment which came from API but deleted currently send request to remove them
        if (attachedFilesFormDataIds.length !== defaultAttachedFileIds?.length) {
          // eslint-disable-next-line @typescript-eslint/no-loop-func
          defaultAttachedFileIds?.forEach((defaultAttachedFileId) => {
            if (!attachedFilesFormDataIds?.includes(defaultAttachedFileId)) {
              dispatch(resultsMiddleware.removeTestResultsAttachment(defaultAttachedFileId));
            }
          });
        }

        testResults.push({
          id,
          items,
          comment,
          // Check if there is not any attachment just don't add them!
          ...(allAttachments.length > 0 && { attachments: allAttachments })
        });
      }

      testResults.forEach((testResult) => {
        testResult.items.forEach((item) => {
          item.dateReceived = isDate(item.dateReceived)
            ? DateUtil.convertToDateOnly(item.dateReceived)
            : item.dateReceived;
        });
      });

      await dispatch(resultsMiddleware.submitTestResults(testResults));

      return null;
    },
    [defaultTestResults, isTestResultsSubmitLoading]
  );

  return { onTestResultsSubmit, isTestResultsSubmitLoading };
};

export default useSubmitTestResults;
