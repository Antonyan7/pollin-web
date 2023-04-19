import React, { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IPatientPlansCategories } from '@axios/patientEmr/managerPatientEmrTypes';
import FormSubmit from '@components/common/Form/Footer/FormSubmit';
import { IFormMedications, MonitoringLocation, PlanPage } from '@components/Plans/types';
import { ArrowBackIos, ModeEditOutlined } from '@mui/icons-material';
import { cardHeaderClasses, Divider, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { borders, margins, paddings } from 'themes/themeConstants';

import SubCardStyled from '@ui-component/cards/SubCardStyled';
import CircularLoading from '@ui-component/circular-loading';

import Form from './form';
import PreliminaryBloodsResults from './PreliminaryBloodsResults';

const extractDefaultValues = (patientId: string, planTypeId: string, categories: IPatientPlansCategories[]) => ({
  patientId: patientId as string,
  planTypeId: planTypeId as string,
  monitoring: {
    monitoringLocation: { value: MonitoringLocation.MonitoredInClinic, note: '' },
    cycleNumber: { value: '', note: '' }
  },
  sperm: {
    source: {
      value: null,
      note: ''
    },
    type: {
      value: null,
      note: ''
    }
  },
  medications: categories.map((item) => ({
    categoryId: item.id,
    isExists: false,
    items: []
  }))
});

const CreatePlan = ({ changePage, planTypeId }: { changePage: (pageName: PlanPage) => void; planTypeId: string }) => {
  const [t] = useTranslation();
  const theme = useTheme();
  const {
    query: { id: patientId }
  } = useRouter();
  const categories = useAppSelector(patientsSelector.categories);

  const methods = useForm({
    defaultValues: { ...extractDefaultValues(`${patientId}`, `${planTypeId}`, categories) }
  });

  const isPatientPreliminaryBloodsLoading = useAppSelector(patientsSelector.isPatientPreliminaryBloodsResultsLoading);

  useEffect(() => {
    dispatch(patientsMiddleware.getPatientPreliminaryBloods(patientId as string));
  }, [patientId]);

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

  const backToPlansPage = () => changePage(PlanPage.List);

  const onSubmit = (data: IFormMedications) => {
    const filteredMedications = data.medications
      .filter((medication) => medication.isExists)
      .map((item) =>
        item.items.map((innerItem) => ({
          ...innerItem,
          categoryId: item.categoryId
        }))
      )
      .flat();

    const newData = {
      ...data,
      medications: filteredMedications.length ? filteredMedications : false
    };

    dispatch(patientsMiddleware.createPatientPlan(newData, backToPlansPage));
  };

  if (isPatientPreliminaryBloodsLoading) {
    return <CircularLoading />;
  }

  return (
    <SubCardStyled
      sx={{
        m: margins.all8,
        outline: `${borders.solid1px} ${theme.palette.primary.main}`,
        '& > .MuiDivider-root': {
          borderColor: theme.palette.primary.main
        },
        [`.${cardHeaderClasses.root}`]: {
          py: paddings.topBottom8,
          pl: paddings.left20,
          pr: paddings.right16
        }
      }}
      title={
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
      }
    >
      <Grid px={paddings.leftRight16} pb={paddings.bottom16}>
        <PreliminaryBloodsResults />
        <Divider />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Form />
            <FormSubmit onClick={backToPlansPage} />
          </form>
        </FormProvider>
      </Grid>
    </SubCardStyled>
  );
};

export default CreatePlan;
