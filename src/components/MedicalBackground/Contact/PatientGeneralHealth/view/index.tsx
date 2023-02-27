import React from 'react';
import { useTranslation } from 'react-i18next';
import { mappedGeneralHealthData, showFalsyResult } from '@components/MedicalBackground/helpers';
import { Grid, Typography, useTheme } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

const PatientGeneralHealthView = () => {
  const theme = useTheme();
  const [t] = useTranslation();
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const generalHealthList = mappedGeneralHealthData(generalHealth);

  return (
    <Grid item container direction="column" justifyContent="flex-start" alignItems="center" py={paddings.topBottom16}>
      {generalHealthList?.map((healthRow, healthIndex) => (
        <Grid
          item
          container
          direction="row"
          justifyContent="flex-start"
          px={paddings.leftRight16}
          py={paddings.topBottom8}
          xs={12}
          sx={{
            backgroundColor: healthIndex % 2 ? theme.palette.common.white : theme.palette.secondary[200]
          }}
        >
          <Grid item xs={4}>
            <Typography
              sx={{
                fontWeight: 600,
                color: theme.palette.common.black,
                fontSize: theme.typography.pxToRem(15)
              }}
            >
              {healthRow.note}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            :
          </Grid>
          <Grid item container xs={5} justifyContent="flex-start">
            {Array.isArray(healthRow.value) ? (
              <Grid item container direction="column">
                {healthRow.value.length ? (
                  <>
                    <Typography>{t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_CONSULTATION_YES)}</Typography>
                    {healthRow.value.map((healthSubRow) => (
                      <Grid py={paddings.leftRight8}>{healthSubRow.id}</Grid>
                    ))}
                  </>
                ) : (
                  <Typography>{t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_CONSULTATION_NO)}</Typography>
                )}
              </Grid>
            ) : (
              <Grid>
                {healthRow.value === true
                  ? t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_CONSULTATION_YES)
                  : showFalsyResult(
                      healthRow.value === false,
                      t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_CONSULTATION_NO),
                      healthRow.value
                    )}
              </Grid>
            )}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default PatientGeneralHealthView;
