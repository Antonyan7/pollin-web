import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Modal,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material';
import { TextFieldProps as MuiTextFieldPropsType } from '@mui/material/TextField/TextField';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useFormik } from 'formik';
import { schedulingMiddleware, schedulingSelector } from 'redux/slices/scheduling';
import { v4 } from 'uuid';

import { toIsoString } from '@utils/dateUtils';

import { createOptionsGroup } from '../../helpers/berryFunctions';
import { weekDays } from '../../helpers/constants';
import { dispatch, useAppSelector } from '../../redux/hooks';
import { ISingleTemplate, ITemplateGroup, ServiceTypeOrBlock } from '../../types/create-schedule';
import { MinusIconButton, PlusIconButton } from '../../ui-component/common/buttons';
import ErrorModal from '../../ui-component/schedule-template/ErrorModal';

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

  const serviceTypes = useAppSelector(schedulingSelector.serviceTypes);

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

  const onModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onModalOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const onSaveClick = useCallback(() => {
    const body = {
      ...templateData,
      timePeriods: templateData.timePeriods.map((item) => {
        const { id, ...rest } = item;

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

  const onMinusClick = useCallback(
    (index: number) => {
      const newTemplateData = [...templateData.timePeriods];

      newTemplateData.splice(index, 1);
      setTemplateData({ ...templateData, timePeriods: newTemplateData });
    },
    [templateData]
  );

  const renderTitle = (index: number) =>
    !index ? (
      <Box>
        <h3 className="sub-title">Time Period {index + 1}</h3>
      </Box>
    ) : (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="sub-title">Time Period {index + 1}</h3>
        <MinusIconButton onClick={() => onMinusClick(index)} />
      </Box>
    );

  const renderScheduleInputs = (values: { title: string }[]) => values.map((item) => item.title);

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
        {/* TODO: create TimePeriod component for this - code is not maintainable */}
        {templateData.timePeriods.map((item, index) => (
          <Box key={`timePeriod-${item.id}`}>
            {renderTitle(index)}
            <div className="splitter-line" />
            <div className="create-template-box">
              <p>Select Day(s)</p>
              <span className="week-days schedule-inputs">
                {weekDays.map((day, indexOfDay) => (
                  <span key={day}>
                    <Checkbox
                      key={`${day}-${item.id}`}
                      onChange={(e) => {
                        updateInputValue('days', e.target.checked, index, indexOfDay);
                      }}
                      color="secondary"
                      checked={item.days.includes(indexOfDay)}
                    />
                    {day}
                  </span>
                ))}
              </span>
            </div>
            <div className="create-template-box">
              <p>Start Time</p>
              <div className="schedule-inputs">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Start Time"
                    ampm={false}
                    value={item.startTime}
                    onChange={(newTime: Date | null) => {
                      updateInputValue('startTime', toIsoString(newTime as Date), index);
                    }}
                    renderInput={(params: MuiTextFieldPropsType) => <TextField sx={{ width: '100%' }} {...params} />}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div className="create-template-box">
              <p>End Time</p>
              <div className="schedule-inputs">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="End Time"
                    ampm={false}
                    value={item.endTime}
                    onChange={(newTime: Date | null) => {
                      updateInputValue('endTime', toIsoString(newTime as Date), index);
                    }}
                    renderInput={(params: MuiTextFieldPropsType) => <TextField sx={{ width: '100%' }} {...params} />}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div className="create-template-box">
              <p>Service Type or Block</p>
              <RadioGroup
                className="schedule-inputs"
                row
                name="row-radio-buttons-group"
                value={item.periodType}
                onChange={(e) => {
                  updateInputValue('periodType', e.target.value, index);
                }}
              >
                <FormControlLabel value={ServiceTypeOrBlock.ServiceType} control={<Radio />} label="Service Type" />
                <FormControlLabel value={ServiceTypeOrBlock.Block} control={<Radio />} label="Block" />
              </RadioGroup>
            </div>
            {item.periodType === ServiceTypeOrBlock.ServiceType && (
              <div className="create-template-box">
                <p>Service Types</p>
                <Autocomplete
                  className="schedule-inputs"
                  multiple
                  options={createOptionsGroup(serviceTypes)}
                  groupBy={(option) => option.firstLetter}
                  getOptionLabel={(option) => option.title}
                  onChange={(e, newValue) => updateInputValue('serviceTypes', renderScheduleInputs(newValue), index)}
                  renderInput={(params) => <TextField {...params} label="Service Types" />}
                />
              </div>
            )}
            <div className="create-template-box">
              <p>Placeholder Label</p>
              <TextField
                className="schedule-inputs"
                fullWidth
                id="outlined-email-address"
                value={item.placeholderName}
                placeholder="Placeholder Label"
                onChange={(e) => updateInputValue('placeholderName', e.target.value, index)}
              />
            </div>
            <div className="splitter-line" />
          </Box>
        ))}
        <Box sx={{ marginTop: '30px' }}>
          <PlusIconButton onClick={onPlusClick} />
        </Box>
        <Grid container direction="row-reverse" sx={{ marginTop: '200px' }}>
          <Button variant="contained" className="dark-button" size="large" type="submit">
            Save
          </Button>
          <Button
            onClick={onModalOpen}
            variant="outlined"
            className="light-button"
            size="large"
            sx={{ marginRight: '10px' }}
          >
            Cancel
          </Button>
        </Grid>
      </form>
      {isModalOpen ? (
        <Modal open={isModalOpen} onClose={onModalClose}>
          <ErrorModal handleClose={onModalClose} />
        </Modal>
      ) : null}
    </div>
  );
};

export default CreateTemplate;
