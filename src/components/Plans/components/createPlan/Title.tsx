import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PlanPage } from '@components/Plans/types';
import { ArrowBackIos, ModeEditOutlined } from '@mui/icons-material';
import { Grid, IconButton, Typography, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import { useAppSelector } from '@redux/hooks';
import { plansSelector } from '@redux/slices/plans';
import { Translation } from 'constants/translations';

const Title = ({ changePage, planTypeId }: { changePage: (pageName: PlanPage) => void; planTypeId: string }) => {
  const [t] = useTranslation();
  const theme = useTheme();
  const categories = useAppSelector(plansSelector.categories);

  const planTitle = useMemo(() => {
    let title = '';

    categories.forEach((item) => {
      item?.items?.forEach((innerItem) => {
        if (innerItem.id === planTypeId) {
          title = innerItem.title;
        }
      });
    });

    return title;
  }, [categories, planTypeId]);

  return (
    <Grid item container alignItems="center" justifyContent="space-between">
      <Stack
        direction="row"
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <IconButton
          sx={{
            color: theme.palette.primary.main
          }}
          onClick={() => {
            changePage(PlanPage.List);
          }}
          disableRipple
        >
          <ArrowBackIos
            sx={{
              fontSize: theme.typography.pxToRem(16)
            }}
          />
        </IconButton>

        <Typography
          sx={{
            fontWeight: 500,
            fontSize: theme.typography.pxToRem(16),
            color: theme.palette.secondary[800]
          }}
        >
          {t(Translation.PAGE_PATIENT_PLANS_CREATE_PLAN_TITLE)}: {planTitle}
        </Typography>
      </Stack>
      <Grid>
        <IconButton disabled>
          <ModeEditOutlined
            sx={{
              color: theme.palette.primary.main,
              '&:hover': {
                cursor: 'pointer'
              },
              fontSize: theme.typography.pxToRem(24),
              opacity: 0.3
            }}
          />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Title;
