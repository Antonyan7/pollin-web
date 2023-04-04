import React, { FC, useCallback, useMemo, useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp, ModeEditOutlined } from '@mui/icons-material';
import { Badge, cardHeaderClasses, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { borders, margins, paddings } from 'themes/themeConstants';

import SubCardStyled from '@ui-component/cards/SubCardStyled';

import EditModeContent from '../CurrentMedicationList/edit';
import ViewModeContent from '../CurrentMedicationList/view';

import { CardItem, CardMode } from './types';

const Card: FC<CardItem> = ({ medication }) => {
  const [mode, setMode] = useState(CardMode.View);
  const isViewMode = mode === CardMode.View;
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleOpen = useCallback(() => {
    setOpen((currentMode) => !currentMode);
  }, []);

  const handleToggle = useCallback(() => {
    setMode((currentMode) => (currentMode === CardMode.View ? CardMode.Edit : CardMode.View));
  }, []);

  const CardTitle = useMemo(
    (): JSX.Element => (
      <Grid container spacing={2} sx={{ fontWeight: 400 }}>
        <Grid item>{medication.title}</Grid>
        {medication?.commonName ? (
          <>
            <Grid item>
              <Badge
                color="secondary"
                overlap="circular"
                variant="dot"
                sx={{
                  '& .MuiBadge-dot': {
                    height: 5,
                    minWidth: 5
                  }
                }}
              />
            </Grid>
            <Grid item>{medication?.commonName}</Grid>
          </>
        ) : null}
      </Grid>
    ),
    [medication]
  );

  return (
    <SubCardStyled
      sx={{
        m: margins.all8,
        outline: `${borders.solid1px} ${theme.palette.primary.light}`,
        '& > .MuiDivider-root': {
          borderColor: theme.palette.primary.light
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
              {CardTitle}
            </Typography>
          </Grid>
          <Grid>
            <IconButton
              disabled // to be changed when have edit mode
              onClick={handleToggle}
            >
              <ModeEditOutlined
                sx={{
                  color: theme.palette.primary.light,
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
            <IconButton onClick={handleOpen}>
              {open ? (
                <KeyboardArrowUp
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: theme.typography.pxToRem(24)
                  }}
                />
              ) : (
                <KeyboardArrowDown
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: theme.typography.pxToRem(24)
                  }}
                />
              )}
            </IconButton>
          </Grid>
        </Grid>
      }
    >
      <Grid hidden={!isViewMode || !open}>
        <ViewModeContent medication={medication} />
      </Grid>
      {!isViewMode && <EditModeContent />}
    </SubCardStyled>
  );
};

export default Card;
