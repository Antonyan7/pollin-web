import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { plansSelector } from '@redux/slices/plans';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';

import SubCardStyled from '@ui-component/cards/SubCardStyled';

const CycleMonitoring = () => {
  const theme = useTheme();
  const planDetails = useAppSelector(plansSelector.planDetails);
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
                {t(Translation.PAGE_PATIENT_PLANS_DETAILS_CYCLE_MONITORING)}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
      </>
      <Box>
        <Box display="flex" px={paddings.leftRight16} py={paddings.topBottom16} flexDirection="column">
          <Box pt={paddings.top16}>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ width: '50%' }}>
                <Typography sx={{ marginRight: margins.right24, color: theme.palette.secondary[800], fontWeight: 500 }}>
                  {t(Translation.PAGE_PATIENT_PLANS_DETAILS_MONITORING)}
                </Typography>
              </Box>
              <Box sx={{ width: '50%' }}>
                <Typography>{planDetails?.monitoring.monitoringLocation.value}</Typography>
              </Box>
            </Box>
          </Box>
          <Box pt={paddings.top16}>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ width: '50%' }}>
                <Typography sx={{ marginRight: margins.right24, color: theme.palette.secondary[800], fontWeight: 500 }}>
                  {t(Translation.PAGE_PATIENT_PLANS_DETAILS_CYCLE_NUMBER)}
                </Typography>
              </Box>
              <Box sx={{ width: '50%' }}>
                <Typography>{planDetails?.monitoring.cycleNumber.value}</Typography>
              </Box>
            </Box>
          </Box>
          <Box pt={paddings.top16}>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ width: '50%' }}>
                <Typography sx={{ marginRight: margins.right24, color: theme.palette.secondary[800], fontWeight: 500 }}>
                  {t(Translation.PAGE_PATIENT_PLANS_DETAILS_CYCLE_MONITORING_EXPECTED_DAY)}
                </Typography>
              </Box>
              <Box sx={{ width: '50%' }}>
                <Typography>-</Typography>
              </Box>
            </Box>
          </Box>
          <Box pt={paddings.top16}>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ width: '50%' }}>
                <Typography sx={{ marginRight: margins.right24, color: theme.palette.secondary[800], fontWeight: 500 }}>
                  {t(Translation.PAGE_PATIENT_PLANS_DETAILS_CYCLE_MONITORING_REPORTED_DAY)}
                </Typography>
              </Box>
              <Box sx={{ width: '50%' }}>
                <Typography>-</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </SubCardStyled>
  );
};

export default CycleMonitoring;
