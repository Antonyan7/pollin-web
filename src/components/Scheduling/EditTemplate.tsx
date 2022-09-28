import React, { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScheduleBoxWrapper, StyledButton } from '@components/Appointments/CommonMaterialComponents';
import { TimePeriods } from '@components/Scheduling/scheduleTemplates/TimePeriods';
import { Divider, Grid, TextField, Typography } from '@mui/material';
import { ModalName } from 'constants/modals';
import { Translation } from 'constants/translations';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { schedulingMiddleware, schedulingSelector } from 'redux/slices/scheduling';
import { viewsMiddleware } from 'redux/slices/views';
import { v4 } from 'uuid';

import { PlusIconButton } from '@ui-component/common/buttons';
import { toIsoString, utcDate } from '@utils/dateUtils';

import { ISingleTemplate, ITemplateGroup, ServiceTypeOrBlock } from '../../types/create-schedule';

const getDefaultTimePeriodState = (): ISingleTemplate => ({
  id: v4(),
  days: new Array<number>(),
  startTime: null,
  endTime: null,
  periodType: ServiceTypeOrBlock.Block,
  serviceTypes: new Array<string>(),
  placeholderName: ''
});

const getEmptyTemplateState = (): ITemplateGroup => ({
  name: '',
  timePeriods: [getDefaultTimePeriodState()]
});

const EditTemplate = () => {
  const scheduleTemplate = useAppSelector(schedulingSelector.scheduleSingleTemplate);
  const [templateData, setTemplateData] = useState<ITemplateGroup>(scheduleTemplate);
  const [t] = useTranslation();
  const router = useRouter();
  const { scheduleId } = router.query;

  const scheduleTemplateID = scheduleId as string;

  useEffect(() => {
    dispatch(schedulingMiddleware.getSingleSchedule(scheduleTemplateID));
  }, [scheduleId, scheduleTemplateID]);

  useEffect(() => {
    setTemplateData(scheduleTemplate);
  }, [scheduleTemplate]);

  const onOpenModalClick = () => {
    dispatch(viewsMiddleware.setModalState({ name: ModalName.CreateTemplateModal, props: {} }));
  };

  const handleSaveClick = () => {
    const body = {
      name: templateData.name,
      timePeriods: templateData.timePeriods.map((item) => {
        const { id, ...rest } = item;

        if (rest.startTime && rest.endTime) {
          rest.startTime = toIsoString(utcDate(new Date(rest.startTime)));
          rest.endTime = toIsoString(utcDate(new Date(rest.endTime)));
        }

        return rest;
      })
    };

    dispatch(schedulingMiddleware.updateSingleSchedule(scheduleTemplateID, body));
  };

  const onPlusClick = () => {
    setTemplateData({
      ...templateData,
      timePeriods: [...templateData.timePeriods, { ...getDefaultTimePeriodState(), id: v4() }]
    });
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTemplateData({ ...templateData, name: e.target.value });
  };

  const createScheduleForm = useFormik({
    initialValues: getEmptyTemplateState(),
    onSubmit: () => handleSaveClick()
  });

  return (
    <ScheduleBoxWrapper>
      <form onSubmit={createScheduleForm.handleSubmit}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} lg={3}>
            <Typography>{t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_NAME)}</Typography>
          </Grid>
          <Grid item xs={12} lg={9}>
            <TextField
              value={templateData?.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleNameChange(e)}
              className="schedule-inputs"
              fullWidth
              placeholder={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_NAME)}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
            <TimePeriods timePeriods={templateData?.timePeriods} setTemplateData={setTemplateData} />
          </Grid>
          <Grid item xs={12}>
            <PlusIconButton onClick={onPlusClick} />
          </Grid>
          <Grid item xs={12} display="flex">
            <StyledButton
              color="secondary"
              onClick={onOpenModalClick}
              variant="outlined"
              size="large"
              sx={{ marginRight: 2, marginLeft: 'auto' }}
            >
              {t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_BUTTON_CANCEL)}
            </StyledButton>
            <StyledButton
              color="secondary"
              variant="contained"
              size="large"
              type="submit"
              sx={{ paddingLeft: 5, paddingRight: 5 }}
            >
              {t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_BUTTON_SAVE)}
            </StyledButton>
          </Grid>
        </Grid>
      </form>
    </ScheduleBoxWrapper>
  );
};

export default EditTemplate;
