import React, { ReactNode } from 'react';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { cardHeaderClasses, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { borders, margins, paddings } from 'themes/themeConstants';

import SubCardStyled from '@ui-component/cards/SubCardStyled';
import CircularLoading from '@ui-component/circular-loading';

interface PatientMedicalBackgroundSectionProps {
  children: ReactNode;
  title?: ReactNode;
  isLoading?: boolean;
  isButtonClicked: boolean;
  onClick: () => void;
}

const PatientMedicalBackgroundSection = ({
  children,
  title,
  isLoading,
  isButtonClicked,
  onClick
}: PatientMedicalBackgroundSectionProps) => {
  const theme = useTheme();

  return (
    <SubCardStyled
      sx={{
        outline: `${borders.solid1px} ${theme.palette.primary.main}`,
        '& > .MuiDivider-root': {
          borderColor: theme.palette.primary.main
        },
        [`.${cardHeaderClasses.root}`]: {
          py: paddings.topBottom16,
          pl: paddings.left20,
          pr: paddings.right16
        }
      }}
      title={
        <Grid item container alignItems="center" justifyContent="space-between">
          <Grid>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: theme.typography.pxToRem(16),
                color: theme.palette.secondary[800]
              }}
            >
              {title}
            </Typography>
          </Grid>
          <Grid>
            <IconButton
              disabled={isButtonClicked}
              onClick={onClick}
              sx={{
                padding: 0
              }}
            >
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
