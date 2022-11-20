import React, { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CircularProgress, Divider, Grid, Typography } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { resultsSelector } from '@redux/slices/results';
import { Translation } from 'constants/translations';
import { timeAdjuster } from 'helpers/timeAdjuster';
import { margins, paddings } from 'themes/themeConstants';
import { TestResultMeasurementType } from 'types/reduxTypes/resultsStateTypes';
import { FinalResultChipColor } from 'types/results';

import Chip from '@ui-component/patient/Chip';

import { InputTestResultsHeaderProps } from '../types';

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
  const { control } = useFormContext();

  const initialResultValue = useMemo(() => t(Translation.MODAL_EXTERNAL_RESULTS_RESULT_TEXT), [t]);

  const { items } = useWatch({ name: currentFormFieldName, control });

  const detectedStatusType = useMemo(() => {
    const allElementsWithNormalStatus = items.map((item: { resultType: TestResultMeasurementType }) => {
      // Here we are setting falsy value for the cases when nothing was returned from the backend
      if (!item.resultType) {
        return 0;
      }

      // If Result type will be something different from normal we will get falsy value
      return item.resultType === TestResultMeasurementType.Normal;
    });

    const allStatusesAreEmpty = allElementsWithNormalStatus.every((every: boolean | number) => every === 0);
    const allStatusesHaveFilledWithNormal = allElementsWithNormalStatus.every(
      (every: boolean | number) => every === true
    );

    if (allStatusesAreEmpty) {
      return initialResultValue;
    }

    if (allStatusesHaveFilledWithNormal) {
      return TestResultMeasurementType.Normal;
    }

    return TestResultMeasurementType.Abnormal;
  }, [items, initialResultValue]);

  const getChipColor = () => {
    switch (detectedStatusType) {
      case TestResultMeasurementType.Normal:
        return FinalResultChipColor.Normal;
      case TestResultMeasurementType.Abnormal:
        return FinalResultChipColor.Abnormal;
      default:
        return FinalResultChipColor.Initial;
    }
  };
  const { customizedDate: formattedOrderedDate } = timeAdjuster(dates?.ordered ?? '');
  const { customizedDate: formattedCollectedDate } = timeAdjuster(dates?.ordered ?? '');

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
                chipColor={getChipColor()}
                sx={{
                  height: '33px'
                }}
                label={detectedStatusType}
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
