import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';

import SubCardStyled from '@ui-component/cards/SubCardStyled';

const SpermDetails = () => {
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
                {t(Translation.PAGE_PATIENT_PLANS_DETAILS_SPERM_DETAILS)}
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
                  {t(Translation.PAGE_PATIENT_PLANS_DETAILS_SPERM_SOURCE)}
                </Typography>
              </Box>
              <Box sx={{ width: '50%' }}>
                <Typography>{planDetails?.sperm.source.value}</Typography>
              </Box>
            </Box>
          </Box>
          <Box pt={paddings.top16}>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ width: '50%' }}>
                <Typography sx={{ marginRight: margins.right24, color: theme.palette.secondary[800], fontWeight: 500 }}>
                  {t(Translation.PAGE_PATIENT_PLANS_DETAILS_DONOR_ID)}
                </Typography>
              </Box>
              <Box sx={{ width: '50%' }}>
                <Typography>{planDetails?.sperm.source.donorId}</Typography>
              </Box>
            </Box>
          </Box>
          <Box pt={paddings.top16}>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ width: '50%' }}>
                <Typography sx={{ marginRight: margins.right24, color: theme.palette.secondary[800], fontWeight: 500 }}>
                  {t(Translation.PAGE_PATIENT_PLANS_DETAILS_SPERM_TYPE)}
                </Typography>
              </Box>
              <Box sx={{ width: '50%' }}>
                <Typography>{planDetails?.sperm.type.value}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </SubCardStyled>
  );
};

export default SpermDetails;
