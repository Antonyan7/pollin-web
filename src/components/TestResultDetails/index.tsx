import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Divider, Grid, Link, Typography, useTheme } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { Translation } from 'constants/translations';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { margins } from 'themes/themeConstants';
import { FinalResultChipColor } from 'types/results';

import Chip from '@ui-component/patient/Chip';

import ReportSection from './ReportSection';

const dateFormatter = (date: string) => format(new Date(date), 'MMM dd, yyyy');

const DetailCellRenderer = ({ title, value }: { title: string; value: string }) => {
  const theme = useTheme();

  return (
    <Grid container spacing={1} mt={margins.top0}>
      <Grid item xs={4}>
        <Typography variant="h6" fontWeight={600}>
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

const TestResultDetails: React.FC = () => {
  const [testResultsDetails] = useAppSelector(resultsSelector.testResultsDetails);
  const isTestResultsDetailsLoading = useAppSelector(resultsSelector.isTestResultsDetailsLoading);
  const router = useRouter();
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const { t } = useTranslation();

  const handleAttachmentDownloadClick = async () => {
    const blob = await dispatch(resultsMiddleware.downloadTestResultAttachment(testResultsDetails.id));

    if (blob && linkRef.current) {
      const url = window.URL.createObjectURL(blob);

      linkRef.current.href = url;
      linkRef.current.download = `${testResultsDetails.title}.pdf`;
      linkRef.current.click();
      window.URL.revokeObjectURL(url);
    }
  };

  const testResultId = `${router.query.testResultId}`;

  useEffect(() => {
    if (testResultId) {
      dispatch(resultsMiddleware.getTestResultsDetails({ testResultId }));
    }
  }, [testResultId]);

  return isTestResultsDetailsLoading ? (
    <Box display="flex" justifyContent="center" alignItems="center" mt={margins.top16}>
      <CircularProgress sx={{ margin: margins.auto }} />
    </Box>
  ) : (
    testResultsDetails && (
      <>
        <Typography variant="h4" component="h3">
          {t(Translation.PAGE_PATIENT_ORDER_RESULTS_DETAILS_TEST_NAME)}
        </Typography>
        <Grid container spacing={2} mt={margins.top8}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" fontWeight={600}>
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
            <Typography variant="h5" fontWeight={600}>
              {t(Translation.PAGE_PATIENT_ORDER_RESULTS_DETAILS_DATE)}
            </Typography>
            <DetailCellRenderer
              title={`${t(Translation.PAGE_INPUT_RESULTS_TEST_DATES_DATE_COLLECTED)}:`}
              value={dateFormatter(testResultsDetails.dates?.collected)}
            />
            <DetailCellRenderer
              title={`${t(Translation.PAGE_INPUT_RESULTS_TEST_DATES_DATE_ORDERED)}:`}
              value={dateFormatter(testResultsDetails.dates?.ordered)}
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
        <Typography component={Grid} container variant="h5" fontWeight={600}>
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
        {testResultsDetails.items?.map((item) => (
          <Typography component={Grid} container variant="body2" fontWeight={600} mt={margins.top16}>
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
              {item.dateReceived}
            </Grid>
            <Grid item xs={12} sm={2}>
              {item.resultType}
            </Grid>
          </Typography>
        ))}
        <Divider sx={{ my: margins.topBottom24 }} />
        <Typography variant="h5" fontWeight={600}>
          {t(Translation.PAGE_PATIENT_ORDER_RESULTS_DETAILS_COMMENTS)}
        </Typography>
        <Typography variant="h5" mt={margins.top16}>
          {testResultsDetails.comment ?? 'N/A'}
        </Typography>
        <Divider sx={{ my: margins.topBottom24 }} />
        {testResultsDetails.attachments &&
          testResultsDetails.attachments.map((attachment) => (
            <Box display="flex" alignItems="center" key={attachment.id} mb={margins.bottom24}>
              <Button variant="contained" sx={{ marginRight: margins.right8 }} onClick={handleAttachmentDownloadClick}>
                {t(Translation.PAGE_PATIENT_ORDER_RESULTS_DETAILS_RELEASE_TO_PATIENT)}
              </Button>
              <Link component="a" ref={linkRef} hidden href="#download" />
              {attachment.title}
            </Box>
          ))}
        <Divider sx={{ my: margins.topBottom24, mx: -margins.leftRight24 }} />
        {testResultsDetails.report && <ReportSection testResultsDetails={testResultsDetails} />}
      </>
    )
  );
};

export default TestResultDetails;
