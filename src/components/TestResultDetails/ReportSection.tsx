import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, TextField, Typography } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { margins } from 'themes/themeConstants';
import { ModalName } from 'types/modals';
import { ITestResultStatus, TestResultsDetails } from 'types/reduxTypes/resultsStateTypes';

import { dateInputValue } from '@utils/dateUtils';

interface IReportSectionProps {
  testResultsDetails: TestResultsDetails;
}

const ReportSection: React.FC<IReportSectionProps> = ({ testResultsDetails }) => {
  const [reviewerComment, setReviewerComment] = React.useState('');
  const { t } = useTranslation();

  const reviewClickHandler = () => {
    dispatch(
      viewsMiddleware.openModal({
        name: ModalName.TestResultReviewConfirmation,
        props: { testResultId: testResultsDetails.id, reviewerComment }
      })
    );
  };

  const releaseClickHandler = () => {
    dispatch(
      viewsMiddleware.openModal({
        name: ModalName.TestResultReleaseConfirmation,
        props: { testResultId: testResultsDetails.id }
      })
    );
  };

  const reportReviewText = testResultsDetails?.report?.reviewDate
    ? `${t(Translation.PAGE_PATIENT_ORDER_RESULTS_DETAILS_REVIEWED_ON)}: ${dateInputValue(
        testResultsDetails.report.reviewDate
      )}`
    : t(Translation.PAGE_PATIENT_ORDER_RESULTS_DETAILS_NOT_YET_REVIEWED);

  const reportReleaseText = testResultsDetails?.report?.releaseDate
    ? `${t(Translation.PAGE_PATIENT_ORDER_RESULTS_DETAILS_RELEASED_ON)}: ${dateInputValue(
        testResultsDetails.report.releaseDate
      )}`
    : t(Translation.PAGE_PATIENT_ORDER_RESULTS_DETAILS_NOT_YET_RELEASED);

  const testResultStatus = useMemo(() => {
    if (testResultsDetails.report?.releaseDate) {
      return ITestResultStatus.Released;
    }

    if (testResultsDetails.report?.reviewDate) {
      return ITestResultStatus.Reviewed;
    }

    return ITestResultStatus.Reported;
  }, [testResultsDetails]);

  return (
    <>
      <Box>
        <Typography variant="h4" fontWeight={600}>
          {t(Translation.PAGE_PATIENT_ORDER_RESULTS_DETAILS_PRACTITIONER_COMMENTS)}
        </Typography>
        <Typography variant="h5" mt={margins.top16}>
          {testResultStatus === ITestResultStatus.Reported ? (
            <TextField
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              value={reviewerComment}
              onChange={({ target: { value } }) => setReviewerComment(value)}
              label={t(Translation.PAGE_PATIENT_ORDER_RESULTS_DETAILS_PRACTITIONER_COMMENTS_OPTIONAL)}
            />
          ) : null}
          {testResultStatus !== ITestResultStatus.Reported ? (
            <> {testResultsDetails.report?.comment.length ? testResultsDetails.report?.comment : 'N/A'} </>
          ) : null}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h4" fontWeight={600} mt={margins.top24}>
            {t(Translation.PAGE_PATIENT_ORDER_RESULTS_DETAILS_REVIEW)}
          </Typography>
          <Typography variant="h5" mt={margins.top16}>
            {reportReviewText}
          </Typography>
          <Typography variant="h4" fontWeight={600} mt={margins.top24}>
            {t(Translation.PAGE_PATIENT_ORDER_RESULTS_DETAILS_RELEASE_TO_PATIENT)}
          </Typography>
          <Typography variant="h5" mt={margins.top16}>
            {reportReleaseText}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="flex-end">
          {testResultStatus === ITestResultStatus.Reported ? (
            <Button variant="contained" sx={{ mb: margins.bottom32 }} onClick={reviewClickHandler}>
              {t(Translation.PAGE_PATIENT_ORDER_RESULTS_DETAILS_MARK_AS_REVIEWED)}
            </Button>
          ) : null}
          {(testResultStatus === ITestResultStatus.Reported || testResultStatus === ITestResultStatus.Reviewed) && (
            <Button
              variant="contained"
              disabled={testResultStatus === ITestResultStatus.Reported}
              onClick={releaseClickHandler}
            >
              {t(Translation.PAGE_PATIENT_ORDER_RESULTS_DETAILS_RELEASE_TO_PATIENT)}
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ReportSection;
