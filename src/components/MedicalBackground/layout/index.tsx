import React, { FC, useCallback, useState } from 'react';
import { ModeEditOutlined } from '@mui/icons-material';
import { cardHeaderClasses, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { borders, paddings } from 'themes/themeConstants';

import SubCardStyled from '@ui-component/cards/SubCardStyled';

import { CardMode, MedicalBackgroundCardProps } from './types';

const MedicalBackgroundCard: FC<MedicalBackgroundCardProps> = ({ title, ViewModeContent, EditModeContent }) => {
  const [mode, setMode] = useState(CardMode.View);
  const isViewMode = mode === CardMode.View;
  const theme = useTheme();

  const handleToggle = useCallback(() => {
    setMode((currentMode) => (currentMode === CardMode.View ? CardMode.Edit : CardMode.View));
  }, []);

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
                fontWeight: 600,
                fontSize: theme.typography.pxToRem(16),
                color: theme.palette.secondary[800]
              }}
            >
              {title}
            </Typography>
          </Grid>
          <Grid>
            <IconButton
              disabled={!isViewMode}
              onClick={handleToggle}
              sx={{
                padding: 0
              }}
            >
              <ModeEditOutlined
                sx={{
                  color: theme.palette.primary.main,
                  '&:hover': {
                    cursor: 'pointer'
                  },

                  fontSize: theme.typography.pxToRem(24),
                  ...(!isViewMode && {
                    opacity: 0.3
                  })
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
      }
    >
      {isViewMode ? <ViewModeContent /> : <EditModeContent />}
    </SubCardStyled>
  );
};

export default MedicalBackgroundCard;
