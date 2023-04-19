import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Divider, Grid, Typography, useTheme } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';

import SubCardStyled from '@ui-component/cards/SubCardStyled';

const TestResults = () => {
  const theme = useTheme();
  const planDetails = useAppSelector(patientsSelector.planDetails);
  const [t] = useTranslation();

  return (
    <SubCardStyled
      titleProps={{
        fontSize: theme.typography.pxToRem(14),
        color: theme.palette.secondary[800]
      }}
    >
      <>
        <Box sx={{ padding: paddings.right16 }}>
          <Box display="flex">
            <Box
              sx={{
                flexBasis: '100%'
              }}
            >
              <Typography
                sx={{ fontWeight: 500, fontSize: theme.typography.pxToRem(16), color: theme.palette.secondary[800] }}
              >
                {t(Translation.PAGE_PATIENT_PLANS_DETAILS_TEST_RESULTS_TITLE)}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
      </>
      <Box>
        <Box display="flex" px={paddings.leftRight16} py={paddings.topBottom16} flexDirection="column">
          {planDetails?.testResults?.map((item, index) => (
            <Box key={item.title} pt={paddings.top16}>
              <Grid container>
                {index % 2 === 0 ? (
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Typography
                        sx={{ marginRight: margins.right24, color: theme.palette.secondary[800], fontWeight: 500 }}
                      >
                        {item.title}:
                      </Typography>
                      <Typography>{item.result}</Typography>
                    </Box>
                  </Grid>
                ) : null}
                {index % 2 !== 0 ? (
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Typography
                        sx={{ marginRight: margins.right24, color: theme.palette.secondary[800], fontWeight: 500 }}
                      >
                        {item.title}:
                      </Typography>
                      <Typography>{item.result}</Typography>
                    </Box>
                  </Grid>
                ) : null}
              </Grid>
            </Box>
          ))}

          <Box>
            <Box pt={paddings.top16}>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: '50%' }}>
                  <Typography
                    sx={{ marginRight: margins.right24, color: theme.palette.secondary[800], fontWeight: 500 }}
                  >
                    {t(Translation.PAGE_PATIENT_PLANS_DETAILS_TEST_RESULTS_GTPAETALS)}
                  </Typography>
                </Box>
                <Box sx={{ width: '50%' }}>
                  <Typography>{planDetails?.GTPAETALS}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </SubCardStyled>
  );
};

export default TestResults;
