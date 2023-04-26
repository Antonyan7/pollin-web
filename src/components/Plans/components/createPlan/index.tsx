import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IMedicationCategory } from '@axios/patientEmr/managerPatientEmrTypes';
import FormSubmit from '@components/common/Form/Footer/FormSubmit';
import Title from '@components/Plans/components/createPlan/Title';
import { IFormMedications, MonitoringLocation, PlanPage } from '@components/Plans/types';
import { cardHeaderClasses, Divider, Grid, useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { plansMiddleware, plansSelector } from '@redux/slices/plans';
import { viewsMiddleware } from '@redux/slices/views';
import { useRouter } from 'next/router';
import { borders, margins, paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import useStopRouteChange from '@hooks/useStopRouteChange';
import SubCardStyled from '@ui-component/cards/SubCardStyled';
import CircularLoading from '@ui-component/circular-loading';

import Form from './form';
import PreliminaryBloodsResults from './PreliminaryBloodsResults';

const requiredFields = ['type', 'source', 'cycleNumber'];

const extractDefaultValues = (patientId: string, planTypeId: string, categories: IMedicationCategory[]) => ({
  patientId: patientId as string,
  planTypeId: planTypeId as string,
  monitoring: {
    monitoringLocation: { value: Object.keys(MonitoringLocation)[0], note: null },
    cycleNumber: { value: '', note: null }
  },
  sperm: {
    source: {
      value: '',
      note: null
    },
    type: {
      value: '',
      note: null
    }
  },
  medications: categories.map((item) => ({
    categoryId: item.id,
    isExists: false,
    items: []
  }))
});

const CreatePlan = ({ changePage, planTypeId }: { changePage: (pageName: PlanPage) => void; planTypeId: string }) => {
  const theme = useTheme();
  const {
    query: { id: patientId }
  } = useRouter();
  const categories = useAppSelector(patientsSelector.medicationCategories);

  const methods = useForm({
    defaultValues: { ...extractDefaultValues(`${patientId}`, `${planTypeId}`, categories) }
  });

  const {
    handleSubmit,
    formState: { dirtyFields }
  } = methods;
  const isPatientPreliminaryBloodsLoading = useAppSelector(plansSelector.isPatientPreliminaryBloodsResultsLoading);

  useEffect(() => {
    dispatch(plansMiddleware.getPatientPreliminaryBloods(patientId as string));
  }, [patientId]);

  useStopRouteChange(Object.values(dirtyFields).length > 0, false, () => {
    dispatch(
      viewsMiddleware.openModal({
        name: ModalName.PlanCreationCancelModal,
        props: {
          swapPage: changePage
        }
      })
    );
  });

  const backToPlansPage = (shouldRedirect?: boolean) => {
    if (!shouldRedirect && Object.values(dirtyFields).length > 0) {
      dispatch(
        viewsMiddleware.openModal({
          name: ModalName.PlanCreationCancelModal,
          props: {
            swapPage: changePage
          }
        })
      );
    } else {
      changePage(PlanPage.List);
    }
  };

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
      medications: filteredMedications
    };

    dispatch(plansMiddleware.createPatientPlan(newData, backToPlansPage));
  };

  if (isPatientPreliminaryBloodsLoading) {
    return <CircularLoading />;
  }

  const filledFields = Object.values(dirtyFields)
    .map((item) => Object.keys(item))
    .flat();

  const areAllRequiredFieldsFilled = requiredFields.every((item) => filledFields.includes(item));

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
      title={<Title changePage={changePage} planTypeId={planTypeId} />}
    >
      <Grid px={paddings.leftRight16} pb={paddings.bottom16}>
        <PreliminaryBloodsResults />
        <Divider />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Form />
            <FormSubmit onClick={backToPlansPage} isDisabled={!areAllRequiredFieldsFilled} />
          </form>
        </FormProvider>
      </Grid>
    </SubCardStyled>
  );
};

export default CreatePlan;
