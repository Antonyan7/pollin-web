import React from 'react';
import { useTranslation } from 'react-i18next';
import { LatestTestResultType } from '@axios/patientEmr/managerPatientEmrTypes';
import { CircularProgress, Divider, Grid, Typography } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { resultsSelector } from '@redux/slices/results';
import { Translation } from 'constants/translations';
import { timeAdjuster } from 'helpers/timeAdjuster';
import { margins, paddings } from 'themes/themeConstants';
import { FinalResultChipColor } from 'types/results';

import Chip from '@ui-component/patient/Chip';

import { InputTestResultsHeaderProps } from '../types';

import InputResultsHeaderSection from './InputResultsHeaderSection';

const InputResultsHeader: React.FC<InputTestResultsHeaderProps> = ({ title, lab, dates, finalResultType }) => {
  const [t] = useTranslation();
  const isTestResultDetailsLoading = useAppSelector(resultsSelector.isTestResultDetailsLoading);

  const chipColor =
    finalResultType === LatestTestResultType.Normal ? FinalResultChipColor.Normal : FinalResultChipColor.Abnormal;

  const { customizedDate: formattedOrderedDate } = timeAdjuster(dates?.ordered ?? '');
  const { customizedDate: formattedCollectedDate } = timeAdjuster(dates?.ordered ?? '');

  return (
    <Grid container p={paddings.leftRight32} flexDirection="column">
      {!isTestResultDetailsLoading ? (
        <>
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
                  value: lab?.phone ?? ''
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
                chipColor={chipColor}
                sx={{
                  width: '160px',
                  height: '33px'
                }}
                label={finalResultType}
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
        <Grid item display="flex" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '100%' }}>
          <CircularProgress />
        </Grid>
      )}
    </Grid>
  );
};

export default InputResultsHeader;
