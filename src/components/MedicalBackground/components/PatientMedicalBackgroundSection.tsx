import React, { ReactNode } from 'react';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { Grid, SxProps, Theme, Typography, useTheme } from '@mui/material';
import { borders, paddings } from 'themes/themeConstants';

import SubCardStyled from '@ui-component/cards/SubCardStyled';

interface PatientMedicalBackgroundSectionProps {
  children: ReactNode;
  title?: ReactNode;
  sx?: SxProps<Theme>;
}

const PatientMedicalBackgroundSection = ({ children, title, sx }: PatientMedicalBackgroundSectionProps) => {
  const theme = useTheme();

  return (
    <SubCardStyled
      sx={{
        ...sx,
        outline: `${borders.solid1px} ${theme.palette.primary.main}`,
        '& > .MuiDivider-root': {
          borderColor: theme.palette.primary.main
        }
      }}
      title={
        <Grid item container alignItems="center" justifyContent="space-between">
          <Grid>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: theme.typography.pxToRem(21),
                color: theme.palette.common.black
              }}
            >
              {title}
            </Typography>
          </Grid>
          <Grid>
            <ModeEditOutlinedIcon
              sx={{
                color: theme.palette.primary.main,
                '&:hover': {
                  cursor: 'pointer'
                }
              }}
            />
          </Grid>
        </Grid>
      }
    >
      <Grid p={paddings.all20}>{children}</Grid>
    </SubCardStyled>
  );
};

export default PatientMedicalBackgroundSection;
