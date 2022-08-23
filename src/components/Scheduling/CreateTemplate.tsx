import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
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
import { v4 } from 'uuid';

import { toIsoString } from '@utils/dateUtils';

import { createOptionsGroup } from '../../helpers/berryFunctions';
import { weekDays } from '../../helpers/constants';
import { dispatch } from '../../redux/hooks';
import { createScheduleTemplate } from '../../redux/utils/schedule-template';
import { ISingleTemplate, ITemplateGroup, ServiceTypeOrBlock } from '../../types/create-schedule';
import { MinusIconButton, PlusIconButton } from '../../ui-component/common/buttons';
import ErrorModal from '../../ui-component/schedule-template/ErrorModal';

const CreateTemplate = () => {
  const timePeriods: ISingleTemplate = useMemo(
    () => ({
      id: v4(),
      days: [],
      startTime: toIsoString(new Date()),
      endTime: toIsoString(new Date()),
      periodType: ServiceTypeOrBlock.Block,
      serviceTypes: [],
      placeholderName: ''
    }),
    []
  );

  const emptyTemplateData: ITemplateGroup = useMemo(
    () => ({
      name: '',
      timePeriods: [timePeriods]
    }),
    [timePeriods]
  );
  const [createTemplateData, setCreateTemplateData] = useState<ITemplateGroup>(emptyTemplateData);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // TODO: update to not use mock data
  const [serviceTypes] = useState([
    {
      id: 'serviceType1',
      title: 'ServiceType',
      isVirtual: true
    },
    {
      id: 'serviceType2',
      title: 'Block',
      isVirtual: false
    }
  ]);

  const updateInputValue = useCallback(
    (
      input: keyof ISingleTemplate,
      value: string | undefined | boolean | string[],
      itemIndex: number,
      indexOfDay?: number
    ) => {
      setCreateTemplateData({
        ...createTemplateData,
        timePeriods: createTemplateData.timePeriods.map((data, index) => {
          if (index === itemIndex && indexOfDay) {
            return {
              ...data,
              [input]: value ? [...data.days, indexOfDay] : data.days.filter((item) => item !== indexOfDay)
            };
          }

          if (index === itemIndex) {
            return {
              ...data,
              [input]: value
            };
          }

          return {
            ...data
          };
        })
      });
    },
    [createTemplateData]
  );

  const onModalClose = useCallback(async () => {
    setIsModalOpen(false);
  }, []);

  const onModalOpen = useCallback(async () => {
    setIsModalOpen(true);
  }, []);

  const onSaveClick = useCallback(async () => {
    try {
      // TODO: change after PCP-260
      await dispatch(
        createScheduleTemplate({
          ...createTemplateData,
          timePeriods: createTemplateData.timePeriods.map((item) => {
            const { id, ...rest } = item;

            return rest;
          })
        })
      );
      // TODO: change the URL after PCP-190
      // redirectTo('/');
    } catch (err) {
      // TODO: change after requirements
      console.log(err);
    }
  }, [createTemplateData]);

  const onPlusClick = useCallback(() => {
    setCreateTemplateData({
      ...createTemplateData,
      timePeriods: [...createTemplateData.timePeriods, { ...timePeriods, id: v4() }]
    });
  }, [timePeriods, createTemplateData]);

  const onMinusClick = useCallback(
    (index: number) => {
      const newTemplateData = [...createTemplateData.timePeriods];

      newTemplateData.splice(index, 1);
      setCreateTemplateData({ ...createTemplateData, timePeriods: newTemplateData });
    },
    [createTemplateData]
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
    setCreateTemplateData({ ...createTemplateData, name: e.target.value });
  };

  const createScheduleForm = useFormik({
    initialValues: emptyTemplateData,
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
        {createTemplateData.timePeriods.map((item, index) => (
          <Box key={item.id}>
            {renderTitle(index)}
            <div className="splitter-line" />
            <div className="create-template-box">
              <p>Select Day(s)</p>
              <span className="week-days schedule-inputs">
                {weekDays.map((day, indexOfDay) => (
                  <span key={day}>
                    <Checkbox
                      key={day + 1}
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
      <Modal open={isModalOpen} onClose={onModalClose}>
        <ErrorModal handleClose={onModalClose} />
      </Modal>
    </div>
  );
};

export default CreateTemplate;
