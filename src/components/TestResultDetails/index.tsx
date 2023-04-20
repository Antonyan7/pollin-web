import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, CircularProgress, Divider, Grid, Link, Stack, Typography, useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { ordersMiddleware, ordersSelector } from '@redux/slices/orders';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { margins } from 'themes/themeConstants';
import { ITestResultItem } from 'types/reduxTypes/resultsStateTypes';
import { FinalResultChipColor } from 'types/results';

import Chip from '@ui-component/patient/Chip';
import { DateUtil } from '@utils/date/DateUtil';

import ReportSection from './ReportSection';

const DetailCellRenderer = ({ title, value }: { title: string; value: string }) => {
  const theme = useTheme();

  return (
    <Grid container spacing={1} mt={margins.top0}>
      <Grid item xs={4}>
        <Typography variant="h6" fontWeight={500}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h6" color={theme.palette.grey[500]}>
          {value}
        </Typography>
      </Grid>
    </Grid>
  );
};

interface TestResultDetailsItemsProps {
  items: ITestResultItem[];
}

const TestResultDetailsItems = ({ items }: TestResultDetailsItemsProps) => (
  <>
    {items?.map((item) => (
      <Typography component={Grid} container variant="body2" fontWeight={500} mt={margins.top16}>
        <Grid item xs={12} sm={3}>
          {item.type}
        </Grid>
        <Grid item xs={12} sm={2}>
          {item.unit}
        </Grid>
        <Grid item xs={12} sm={2}>
          {item.result}
        </Grid>
        <Grid item xs={12} sm={3}>
          {item.dateReceived ? DateUtil.formatDateOnly(item.dateReceived) : '-'}
        </Grid>
        <Grid item xs={12} sm={2}>
          {item.resultType}
        </Grid>
      </Typography>
    ))}
    <Divider sx={{ my: margins.topBottom24 }} />
  </>
);

const TestResultDetails: React.FC = () => {
  const [testResultsDetails] = useAppSelector(resultsSelector.testResultsDetails);
  const isTestResultsDetailsLoading = useAppSelector(resultsSelector.isTestResultsDetailsLoading);
  const shouldUpdateDetails = useAppSelector(ordersSelector.shouldUpdateOrderResultsList);
  const router = useRouter();
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const { t } = useTranslation();
  const testResultId = `${router.query.testResultId}`;

  const handleAttachmentDownloadClick = async (attachmentId: string) => {
    const blob = await dispatch(resultsMiddleware.downloadTestResultAttachment(attachmentId));

    if (blob && linkRef.current) {
      const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));

      linkRef.current.href = url;
      linkRef.current.download = `${testResultsDetails.title}.pdf`;
      linkRef.current.click();
      window.URL.revokeObjectURL(url);
    }
  };

  useEffect(() => {
    if (testResultId) {
      dispatch(resultsMiddleware.getTestResultsDetails({ testResultId }));
    }
  }, [testResultId]);

  useEffect(() => {
    if (shouldUpdateDetails) {
      dispatch(resultsMiddleware.getTestResultsDetails({ testResultId }));
      dispatch(ordersMiddleware.setShouldUpdateOrderResultsList(false));
    }
  }, [shouldUpdateDetails, testResultId]);

  return isTestResultsDetailsLoading ? (
    <Box display="flex" justifyContent="center" alignItems="center" mt={margins.top16}>
      <CircularProgress sx={{ margin: margins.auto }} />
    </Box>
  ) : (
    testResultsDetails && (
      <>
        <Typography variant="h3" component="h3">
          {t(Translation.PAGE_PATIENT_ORDER_RESULTS_DETAILS_TEST_NAME)} : {testResultsDetails.title}
        </Typography>
        <Grid container spacing={2} mt={margins.top8}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" fontWeight={500}>
              {t(Translation.PAGE_PATIENT_ORDER_RESULTS_DETAILS_LAB_INFORMATION)}
            </Typography>
            <DetailCellRenderer
              title={`${t(Translation.PAGE_INPUT_RESULTS_TEST_LAB_LOCATION)}:`}
              value={testResultsDetails.lab?.location}
            />
            <DetailCellRenderer
              title={`${t(Translation.PAGE_INPUT_RESULTS_TEST_LAB_PHONE_NUMBER)}:`}
              value={testResultsDetails.lab?.phone}
            />
            <DetailCellRenderer
              title={`${t(Translation.PAGE_INPUT_RESULTS_TEST_LAB_ORDERING_MRP)}:`}
              value={testResultsDetails.lab?.doctorName}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" fontWeight={500}>
              {t(Translation.PAGE_PATIENT_ORDER_RESULTS_DETAILS_DATE)}
            </Typography>
            <DetailCellRenderer
              title={`${t(Translation.PAGE_INPUT_RESULTS_TEST_DATES_DATE_COLLECTED)}:`}
              value={DateUtil.formatDateOnly(testResultsDetails.dates?.collected)}
            />
            <DetailCellRenderer
              title={`${t(Translation.PAGE_INPUT_RESULTS_TEST_DATES_DATE_ORDERED)}:`}
              value={DateUtil.formatDateOnly(testResultsDetails.dates?.ordered)}
            />
          </Grid>
          <Grid item xs={12} sm={4} display="flex">
            <Chip
              chipColor={FinalResultChipColor[testResultsDetails.finalResultType]}
              sx={{
                height: '33px',
                margin: 'auto 0'
              }}
              label={testResultsDetails.finalResultType}
            />
          </Grid>
        </Grid>
        <Divider sx={{ my: margins.topBottom24 }} />
        <Typography component={Grid} container variant="h5" fontWeight={500}>
          <Grid item xs={12} sm={3}>
            {t(Translation.PAGE_PATIENT_ORDER_RESULTS_DETAILS_TYPE)}
          </Grid>
          <Grid item xs={12} sm={2}>
            {t(Translation.PAGE_PATIENT_ORDER_RESULTS_DETAILS_UNIT)}
          </Grid>
          <Grid item xs={12} sm={2}>
            {t(Translation.PAGE_PATIENT_ORDER_RESULTS_DETAILS_RESULT)}
          </Grid>
          <Grid item xs={12} sm={3}>
            {t(Translation.PAGE_PATIENT_ORDER_RESULTS_DETAILS_DATE_RECEIVED)}
          </Grid>
          <Grid item xs={12} sm={2}>
            {t(Translation.PAGE_PATIENT_ORDER_RESULTS_DETAILS_RESULT_TYPE)}
          </Grid>
        </Typography>
        <TestResultDetailsItems items={testResultsDetails.items} />

        <Typography variant="h5" fontWeight={500}>
          {t(Translation.PAGE_PATIENT_ORDER_RESULTS_DETAILS_COMMENTS)}
        </Typography>
        <Typography variant="h5" mt={margins.top16}>
          {testResultsDetails.comment?.length ? testResultsDetails.comment : 'N/A'}
        </Typography>
        <Divider sx={{ my: margins.topBottom24 }} />
        {testResultsDetails.attachments &&
          testResultsDetails.attachments.map((attachment) => (
            <Box display="flex" alignItems="center" key={attachment.id} mb={margins.bottom24}>
              <Button
                variant="contained"
                sx={{ marginRight: margins.right8 }}
                onClick={() => handleAttachmentDownloadClick(attachment.id)}
                data-cy={CypressIds.PAGE_ORDER_DETAILS_BUTTON_DOWNLOAD_ATTACHED_FILE}
              >
                {t(Translation.PAGE_PATIENT_ORDER_RESULTS_DETAILS_DOWNLOAD_ATTACHED_FILE)}
              </Button>
              <Link component="a" ref={linkRef} hidden href="#download" />
              <Stack direction="column" alignItems="flex-start" ml={margins.left24}>
                <Typography variant="h5" fontWeight={500}>
                  {t(Translation.PAGE_ORDER_DETAILS_DOWNLOAD_NOTE)}:
                </Typography>
                <Typography>{attachment.note?.length ? attachment.note : 'N/A'}</Typography>
              </Stack>
            </Box>
          ))}
        <Divider sx={{ my: margins.topBottom24, mx: -margins.leftRight24 }} />
        {testResultsDetails.report && <ReportSection testResultsDetails={testResultsDetails} />}
      </>
    )
  );
};

export default TestResultDetails;
