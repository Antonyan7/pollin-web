import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { StyledButton } from '@components/Appointments/CommonMaterialComponents';
import { TimePeriods } from '@components/Scheduling/scheduleTemplates/TimePeriods';
import { Box, Grid, Modal, TextField } from '@mui/material';
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
  startTime: toIsoString(new Date()),
  endTime: toIsoString(new Date()),
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

        rest.startTime = toIsoString(utcDate(new Date(rest.startTime)));
        rest.endTime = toIsoString(utcDate(new Date(rest.endTime)));

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
    <div className="create-template">
      <form onSubmit={createScheduleForm.handleSubmit}>
        <div className="create-template-box">
          <p>Name of Template</p>
          <TextField
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleNameChange(e)}
            className="schedule-inputs"
            fullWidth
            placeholder="Name of Template"
          />
        </div>
        <div className="splitter-line" />
        {templateData.timePeriods.map((item, index) => (
          <TimePeriods
            singleTemplate={item}
            index={index}
            updateInputValue={updateInputValue}
            setTemplateData={setTemplateData}
            templateData={templateData}
          />
        ))}
        <Box sx={{ marginTop: '30px' }}>
          <PlusIconButton onClick={onPlusClick} />
        </Box>
        <Grid container direction="row-reverse" sx={{ marginTop: '200px' }}>
          <StyledButton variant="contained" size="large" type="submit">
            Save
          </StyledButton>
          <StyledButton onClick={onModalOpenClose} variant="contained" size="large" sx={{ marginRight: '10px' }}>
            Cancel
          </StyledButton>
        </Grid>
      </form>
      {isModalOpen ? (
        <Modal open={isModalOpen} onClose={onModalOpenClose}>
          <ErrorModal handleClose={onModalOpenClose} />
        </Modal>
      ) : null}
    </div>
  );
};

export default CreateTemplate;
