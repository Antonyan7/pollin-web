import React from 'react';
import { useTranslation } from 'react-i18next';
import { PatientPreliminaryBloodsResults } from '@axios/results/resultsManagerTypes';
import { FormLabel } from '@components/common';
import { Grid, Tooltip, tooltipClasses, Typography } from '@mui/material';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

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

export default TestResult;
