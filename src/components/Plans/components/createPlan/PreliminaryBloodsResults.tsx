import React from 'react';
import { useTranslation } from 'react-i18next';
import { PatientPreliminaryBloodsResults } from '@axios/results/resultsManagerTypes';
import { FormLabel } from '@components/common';
import { Grid, Tooltip, tooltipClasses, Typography, useTheme } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { plansSelector } from '@redux/slices/plans';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';
import { v5 as uuidv5 } from 'uuid';

import CircularLoading from '@ui-component/circular-loading';
import { DateUtil } from '@utils/date/DateUtil';

const TestResult = ({ results }: { results: PatientPreliminaryBloodsResults }) => {
  const [t] = useTranslation();

  return (
    <Grid container xs={6} pt={paddings.topBottom8} gap={2}>
      <Grid xs={5}>
        <FormLabel
          sx={{
            fontSize: (theme) => theme.typography.pxToRem(14)
          }}
        >
          {results.title}:
        </FormLabel>
      </Grid>

      <Grid xs={5}>
        <Tooltip
          sx={{
            [`& .${tooltipClasses.tooltip}`]: {
              color: (theme) => theme.palette.secondary[800]
            },
            cursor: 'pointer'
          }}
          title={`${t(Translation.PAGE_PATIENT_PLANS_CREATE_DATE_COMPLETE_TOOLTIP)}: ${DateUtil.formatDateOnly(
            results.dateCompleted
          )}`}
        >
          <Typography>{results.result}</Typography>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

const PreliminaryBloodsResults = () => {
  const patientPreliminaryBloodsResults = useAppSelector(plansSelector.patientPreliminaryBloodsResults);
  const isPatientPreliminaryBloodsLoading = useAppSelector(plansSelector.isPatientPreliminaryBloodsResultsLoading);
  const patientProfile = useAppSelector(patientsSelector.patientProfile);
  const theme = useTheme();

  const [t] = useTranslation();

  if (isPatientPreliminaryBloodsLoading) {
    return <CircularLoading />;
  }

  return (
    <>
      <FormLabel
        py={2}
        sx={{
          fontWeight: 500,
          fontSize: theme.typography.pxToRem(16)
        }}
      >
        {t(Translation.PAGE_PATIENT_PLANS_CREATE_PLAN_PRELIMINARY_BLOODS)}
      </FormLabel>
      <Grid container>
        {patientPreliminaryBloodsResults?.length === 0 && '--'}
        {/* TODO Use uuid TEAMA-5463 */}
        <Grid item xs={6}>
          {patientPreliminaryBloodsResults?.slice(0, 5)?.map((item, index) => (
            <TestResult results={item} key={uuidv5(JSON.stringify(item).concat(index.toString()), uuidv5.URL)} />
          ))}
        </Grid>

        <Grid item xs={6}>
          {patientPreliminaryBloodsResults?.slice(5)?.map((item, index) => (
            <TestResult results={item} key={uuidv5(JSON.stringify(item).concat(index.toString()), uuidv5.URL)} />
          ))}
        </Grid>

        <Grid item container xs={12} py={paddings.topBottom24}>
          <Grid item xs={6}>
            <FormLabel>{t(Translation.PAGE_PATIENT_PLANS_CREATE_GTPAETALS)}:</FormLabel>
          </Grid>
          <Grid item xs={6}>
            <Typography>{patientProfile?.GTPAETALS}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PreliminaryBloodsResults;
