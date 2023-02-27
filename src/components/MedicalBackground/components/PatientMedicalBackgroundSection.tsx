import React, { ReactNode } from 'react';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { Grid, IconButton, SxProps, Theme, Typography, useTheme } from '@mui/material';
import { borders, margins, paddings } from 'themes/themeConstants';

import SubCardStyled from '@ui-component/cards/SubCardStyled';
import CircularLoading from '@ui-component/circular-loading';

interface PatientMedicalBackgroundSectionProps {
  children: ReactNode;
  title?: ReactNode;
  sx?: SxProps<Theme>;
  isLoading?: boolean;
  isButtonClicked: boolean;
  onClick: () => void;
}

const PatientMedicalBackgroundSection = ({
  children,
  title,
  isLoading,
  sx,
  isButtonClicked,
  onClick
}: PatientMedicalBackgroundSectionProps) => {
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
            <IconButton disabled={isButtonClicked} onClick={onClick}>
              <ModeEditOutlinedIcon
                sx={{
                  color: theme.palette.primary.main,
                  '&:hover': {
                    cursor: 'pointer'
                  }
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
      }
    >
      {isLoading ? (
        <CircularLoading sx={{ margin: margins.auto, marginTop: margins.top16, py: paddings.topBottom16 }} />
      ) : (
        <Grid>{children}</Grid>
      )}
    </SubCardStyled>
  );
};

export default PatientMedicalBackgroundSection;
