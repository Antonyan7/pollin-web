import React, { FC, useCallback, useMemo, useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp, ModeEditOutlined } from '@mui/icons-material';
import { Badge, cardHeaderClasses, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { dispatch, useAppSelector } from 'redux/hooks';
import { borders, margins, paddings } from 'themes/themeConstants';

import SubCardStyled from '@ui-component/cards/SubCardStyled';

import { CardItem } from '../types';

import EditModeContent from './MedicationList/edit';
import ViewModeContent from './MedicationList/view';

const Card: FC<CardItem> = ({ medication, index, disableEdit }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const isCardInEditMode = useAppSelector(patientsSelector.isCardInEditMode);

  const handleToggle = useCallback(() => {
    dispatch(patientsMiddleware.updateCardToEditMode(index as number, isCardInEditMode));
  }, [index, isCardInEditMode]);

  const handleOpen = useCallback(() => {
    setOpen((currentMode) => !currentMode);
  }, []);

  const activeItem = isCardInEditMode.findIndex((item) => item === true);
  const disableEditAction = (activeItem >= 0 && activeItem !== index) || disableEdit;
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
        <Grid item container alignItems="center" justifyContent="space-between" onClick={handleOpen}>
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
            <IconButton disabled={disableEditAction} onClick={handleToggle}>
              <ModeEditOutlined
                sx={{
                  color: theme.palette.primary.main,
                  '&:hover': {
                    cursor: 'pointer'
                  },

                  fontSize: theme.typography.pxToRem(24),
                  ...(disableEditAction && {
                    opacity: 0.3
                  })
                }}
              />
            </IconButton>
            {activeItem !== index ? (
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
            ) : null}
          </Grid>
        </Grid>
      }
    >
      <Grid hidden={!open || isCardInEditMode[index as number]}>
        <ViewModeContent medication={medication} />
      </Grid>
      {isCardInEditMode[index as number] && <EditModeContent medication={medication} />}
    </SubCardStyled>
  );
};

export default Card;
