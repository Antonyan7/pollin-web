import React, { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScheduleBoxWrapper, StyledButton } from '@components/Appointments/CommonMaterialComponents';
import { TimePeriods } from '@components/Scheduling/scheduleTemplates/TimePeriods';
import { Divider, Grid, TextField, Typography } from '@mui/material';
import { ModalName } from 'constants/modals';
import { Translation } from 'constants/translations';
import { useFormik } from 'formik';
import { schedulingMiddleware } from 'redux/slices/scheduling';
import { viewsMiddleware } from 'redux/slices/views';
import { v4 } from 'uuid';

import { PlusIconButton } from '@ui-component/common/buttons';
import { toIsoString, utcDate } from '@utils/dateUtils';

import { dispatch } from '../../redux/hooks';
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

const CreateTemplate = () => {
  const [templateData, setTemplateData] = useState<ITemplateGroup>(getEmptyTemplateState());
  const [t] = useTranslation();

  useEffect(() => {
    dispatch(schedulingMiddleware.getServiceTypes());
  }, []);

  const onOpenModalClick = () => {
    dispatch(viewsMiddleware.setModalState({ name: ModalName.CreateTemplateModal, props: {} }));
  };

  const handleSaveClick = () => {
    const body = {
      ...templateData,
      timePeriods: templateData.timePeriods.map((item) => {
        const { id, ...rest } = item;

        if (rest.startTime && rest.endTime) {
          rest.startTime = toIsoString(utcDate(new Date(rest.startTime)));
          rest.endTime = toIsoString(utcDate(new Date(rest.endTime)));
        }

        return rest;
      })
    };

    dispatch(schedulingMiddleware.createScheduleTemplate(body));
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
    <ScheduleBoxWrapper sx={{ padding: '45px 24px 0px' }}>
      <form onSubmit={createScheduleForm.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Grid container alignItems="center">
              <Grid item xs={12} lg={4}>
                <Typography>{t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_NAME)}</Typography>
              </Grid>
              <Grid item xs={12} lg={8}>
                <TextField
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleNameChange(e)}
                  className="schedule-inputs"
                  fullWidth
                  placeholder={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_NAME)}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ margin: '24px 0px 12px' }} />
              <TimePeriods timePeriods={templateData.timePeriods} setTemplateData={setTemplateData} />
              <Divider sx={{ margin: '12px 0px' }} />
            </Grid>
            <Grid item xs={12}>
              <PlusIconButton onClick={onPlusClick} />
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="row-reverse" sx={{ margin: '50px 0px 50px 0px' }}>
                <StyledButton variant="contained" size="large" type="submit">
                  {t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_BUTTON_SAVE)}
                </StyledButton>
                <StyledButton onClick={onOpenModalClick} variant="contained" size="large" sx={{ marginRight: '10px' }}>
                  {t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_BUTTON_CANCEL)}
                </StyledButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </ScheduleBoxWrapper>
  );
};

export default CreateTemplate;
