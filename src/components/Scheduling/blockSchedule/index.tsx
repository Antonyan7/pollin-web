import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScheduleBoxWrapper } from '@components/common/MaterialComponents';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware } from 'redux/slices/booking';
import { schedulingMiddleware, schedulingSelector } from 'redux/slices/scheduling';
import { margins } from 'themes/themeConstants';
import { BlockSchedulingProps } from 'types/reduxTypes/schedulingStateTypes';
import { blockScheduleValidationSchema } from 'validation/scheduling/block_schedule_apply';

import { ButtonWithLoading } from '@ui-component/common/buttons';

import DateField from './fields/DateField';
import ResourceField from './fields/ResourceField';
import TextInputField from './fields/TextInputField';
import BlockScheduleFormRow from './form/BlockScheduleFormRow';
import { IBlockScheduleForm, initialValues } from './form/initialValues';

const BlockTemplates = () => {
  const [t] = useTranslation();
  const isScheduleLoading = useAppSelector(schedulingSelector.scheduleLoading);

  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: initialValues,
    resolver: yupResolver(blockScheduleValidationSchema)
  });

  const { reset, handleSubmit } = methods;
  const applyButtonCyId = CypressIds.PAGE_SCHEDULING_BLOCK_BUTTON_APPLY;

  const resourceLabel = t(Translation.PAGE_SCHEDULING_BLOCK_RESOURCE);
  const startDateLabel = t(Translation.PAGE_SCHEDULING_BLOCK_DATE_START);
  const endDateLabel = t(Translation.PAGE_SCHEDULING_BLOCK_DATE_END);
  const placeholderLabel = t(Translation.PAGE_SCHEDULING_BLOCK_PLACEHOLDER);

  const onSubmit = (values: IBlockScheduleForm) => {
    const sendingBlockValues = {
      resourceId: values.resourceId,
      startDate: values.startDate,
      endDate: values.endDate,
      placeholderLabel: values.placeholderLabel
    };

    dispatch(schedulingMiddleware.applyScheduleBlock(sendingBlockValues as BlockSchedulingProps, reset));
  };

  useEffect(() => {
    dispatch(bookingMiddleware.getGroupedServiceProviders({ page: 1 }));
  }, []);

  return (
    <FormProvider {...methods}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ScheduleBoxWrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <BlockScheduleFormRow title={resourceLabel} key="resourceId">
                <ResourceField
                  fieldName="resourceId"
                  dataCyId={CypressIds.PAGE_SCHEDULING_BLOCK_RESOURCE}
                  fieldLabel={resourceLabel}
                />
              </BlockScheduleFormRow>
              <BlockScheduleFormRow title={startDateLabel} key="startDate">
                <DateField
                  fieldName="startDate"
                  dataCyId={CypressIds.PAGE_SCHEDULING_BLOCK_DATE_START}
                  fieldLabel={startDateLabel}
                />
              </BlockScheduleFormRow>
              <BlockScheduleFormRow title={endDateLabel} key="endDate">
                <DateField
                  fieldName="endDate"
                  dataCyId={CypressIds.PAGE_SCHEDULING_BLOCK_DATE_END}
                  fieldLabel={endDateLabel}
                />
              </BlockScheduleFormRow>
              <BlockScheduleFormRow title={placeholderLabel} key="placeholderLabel">
                <TextInputField
                  fieldName="placeholderLabel"
                  dataCyId={CypressIds.PAGE_SCHEDULING_BLOCK_PLACEHOLDER}
                  fieldLabel={placeholderLabel}
                />
              </BlockScheduleFormRow>
              <Grid item xs={12} display="flex">
                <ButtonWithLoading
                  data-cy={applyButtonCyId}
                  isLoading={isScheduleLoading}
                  color="primary"
                  type="submit"
                  variant="contained"
                  sx={{
                    marginLeft: margins.auto,
                    minWidth: '70px',
                    minHeight: '50px'
                  }}
                >
                  <Typography sx={{ mr: isScheduleLoading ? 2 : 0 }}>
                    {t(Translation.PAGE_SCHEDULING_BLOCK_BUTTON_APPLY)}
                  </Typography>
                </ButtonWithLoading>
              </Grid>
            </Grid>
          </form>
        </ScheduleBoxWrapper>
      </LocalizationProvider>
    </FormProvider>
  );
};

export default BlockTemplates;
