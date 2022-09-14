import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScheduleBoxWrapper, StyledButton } from '@components/Appointments/CommonMaterialComponents';
import { TimePeriods } from '@components/Scheduling/scheduleTemplates/TimePeriods';
import { Divider, Grid, Modal, TextField, Typography } from '@mui/material';
import { Translation } from 'constants/translations';
import { useFormik } from 'formik';
import { schedulingMiddleware } from 'redux/slices/scheduling';
import { v4 } from 'uuid';

import { PlusIconButton } from '@ui-component/common/buttons';
import ErrorModal from '@ui-component/schedule-template/ErrorModal';
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [t] = useTranslation();

  useEffect(() => {
    dispatch(schedulingMiddleware.getServiceTypes());
  }, []);

  const updateInputValue = useCallback(
    (
      input: keyof ISingleTemplate,
      value: string | undefined | boolean | string[],
      itemIndex: number,
      indexOfDay?: number
    ) => {
      setTemplateData({
        ...templateData,
        timePeriods: templateData.timePeriods.map((data, index) => {
          // updating days
          if (index === itemIndex && indexOfDay !== undefined) {
            return {
              ...data,
              [input]: value ? [...data.days, indexOfDay] : data.days.filter((item) => item !== indexOfDay)
            };
          }

          // updating other fields
          if (index === itemIndex) {
            return {
              ...data,
              [input]: value
            };
          }

          // couldn't identify what to update
          return {
            ...data
          };
        })
      });
    },
    [templateData]
  );

  const onModalOpenClose = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  const onSaveClick = useCallback(() => {
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
  }, [templateData]);

  const onPlusClick = useCallback(() => {
    setTemplateData({
      ...templateData,
      timePeriods: [...templateData.timePeriods, { ...getDefaultTimePeriodState(), id: v4() }]
    });
  }, [templateData]);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTemplateData({ ...templateData, name: e.target.value });
  };

  const createScheduleForm = useFormik({
    initialValues: getEmptyTemplateState(),
    onSubmit: () => onSaveClick()
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
              {templateData.timePeriods.map((item, index) => (
                <>
                  <Divider
                    sx={{ margin: '24px 0px 12px', display: templateData.timePeriods.length ? 'none' : 'block' }}
                  />
                  <TimePeriods
                    singleTemplate={item}
                    index={index}
                    updateInputValue={updateInputValue}
                    setTemplateData={setTemplateData}
                    templateData={templateData}
                  />
                  <Divider sx={{ margin: '12px 0px' }} />
                </>
              ))}
            </Grid>
            <Grid item xs={12}>
              <PlusIconButton onClick={onPlusClick} />
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="row-reverse" sx={{ margin: '50px 0px 50px 0px' }}>
                <StyledButton variant="contained" size="large" type="submit">
                  {t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_BUTTON_SAVE)}
                </StyledButton>
                <StyledButton onClick={onModalOpenClose} variant="contained" size="large" sx={{ marginRight: '10px' }}>
                  {t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_BUTTON_CANCEL)}
                </StyledButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
      {isModalOpen ? (
        <Modal open={isModalOpen} onClose={onModalOpenClose}>
          <ErrorModal handleClose={onModalOpenClose} />
        </Modal>
      ) : null}
    </ScheduleBoxWrapper>
  );
};

export default CreateTemplate;
