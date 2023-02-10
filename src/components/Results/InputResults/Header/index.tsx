import React from 'react';
import { useTranslation } from 'react-i18next';
import { Divider, Grid, Typography } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { resultsSelector } from '@redux/slices/results';
import { Translation } from 'constants/translations';
import { timeAdjuster } from 'helpers/timeAdjuster';
import { margins, paddings } from 'themes/themeConstants';

import CircularLoading from '@ui-component/circular-loading';
import Chip from '@ui-component/patient/Chip';

import { InputTestResultsHeaderProps } from '../types';

import useTestResultStatusData from './hooks/useTestResultStatus';
import InputResultsHeaderSection from './InputResultsHeaderSection';

const InputResultsHeader: React.FC<InputTestResultsHeaderProps> = ({
  title,
  lab,
  dates,
  specimenId,
  currentFormFieldName
}) => {
  const [t] = useTranslation();
  const isTestResultsDetailsLoading = useAppSelector(resultsSelector.isTestResultsDetailsLoading);

  const { testResultStatusLabel, testResultStatusColor } = useTestResultStatusData(currentFormFieldName);

  const { customizedDate: formattedOrderedDate } = timeAdjuster(dates?.ordered ?? '');
  const { customizedDate: formattedCollectedDate } = timeAdjuster(dates?.collected ?? '');

  return (
    <Grid container p={paddings.leftRight32} flexDirection="column">
      {!isTestResultsDetailsLoading ? (
        <>
          {specimenId && (
            <Grid item>
              <Typography variant="h4" component="h4">
                {t(Translation.PAGE_IN_HOUSE_RESULTS_TEST_SPECIMEN_ID)} : {specimenId}
              </Typography>
              <Divider sx={{ my: margins.topBottom24 }} />
            </Grid>
          )}
          <Grid item>
            <Typography variant="h4" component="h4">
              {t(Translation.PAGE_INPUT_RESULTS_TEST_NAME)} : {title}
            </Typography>
          </Grid>
          <Grid item display="flex" justifyContent="space-between" pt={paddings.top24}>
            <InputResultsHeaderSection
              title={t(Translation.PAGE_INPUT_RESULTS_TEST_LAB_TITLE)}
              rows={[
                {
                  label: t(Translation.PAGE_INPUT_RESULTS_TEST_LAB_LOCATION),
                  value: lab?.location ?? ''
                },
                {
                  label: t(Translation.PAGE_INPUT_RESULTS_TEST_LAB_PHONE_NUMBER),
                  value: !specimenId ? lab?.phone ?? '' : ''
                },
                {
                  label: t(Translation.PAGE_INPUT_RESULTS_TEST_LAB_ORDERING_MRP),
                  value: lab?.doctorName ?? ''
                }
              ]}
            />
            <InputResultsHeaderSection
              title={t(Translation.PAGE_INPUT_RESULTS_TEST_DATES_TITLE)}
              rows={[
                {
                  label: t(Translation.PAGE_INPUT_RESULTS_TEST_DATES_DATE_COLLECTED),
                  value: formattedCollectedDate
                },
                {
                  label: t(Translation.PAGE_INPUT_RESULTS_TEST_DATES_DATE_ORDERED),
                  value: formattedOrderedDate
                }
              ]}
            />
            <Grid alignSelf="center">
              <Chip
                chipColor={testResultStatusColor}
                sx={{
                  height: '33px'
                }}
                label={testResultStatusLabel}
              />
            </Grid>
          </Grid>
          <Divider
            sx={{
              mt: margins.top24,
              borderColor: (theme) => theme.palette.primary.light
            }}
          />
        </>
      ) : (
        <CircularLoading />
      )}
    </Grid>
  );
};

export default InputResultsHeader;
