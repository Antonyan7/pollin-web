import React, { useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material';
import { TextFieldProps as MuiTextFieldPropsType } from '@mui/material/TextField/TextField';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { v4 } from 'uuid';

import { createOptionsGroup, sortGroups } from '../../helpers/berryFunctions';
import { weekDays } from '../../helpers/constants';
import { ITemplate } from '../../types/create-schedule';
import { MinusIconButton, PlusIconButton } from '../../ui-component/common/buttons';

const CreateTemplate = () => {
  const emptyTemplateData: ITemplate = {
    id: v4(),
    days: [],
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    isServiceType: false,
    serviceTypes: [],
    placeholder: ''
  };
  const [createTemplateData, setCreateTemplateData] = useState<ITemplate[]>([emptyTemplateData]);

  // TODO: update to not use mock data
  const [serviceTypes] = useState([
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 }
  ]);

  const optionsGroup = createOptionsGroup(serviceTypes);

  const updateInputValue = (
    input: keyof ITemplate,
    value: string | undefined | boolean | string[],
    itemIndex: number
  ) => {
    setCreateTemplateData(
      createTemplateData.map((data, index) => {
        if (index === itemIndex) {
          return {
            ...data,
            [input]: value
          };
        }

        return { ...data };
      })
    );
  };

  const onDayChange = (value: boolean, indexOfDay: number, itemIndex: number) => {
    setCreateTemplateData(
      createTemplateData.map((data, index) => {
        if (index === itemIndex) {
          return {
            ...data,
            days: value ? [...data.days, indexOfDay] : data.days.filter((item) => item !== indexOfDay)
          };
        }

        return { ...data };
      })
    );
  };

  const onPlusClick = () => setCreateTemplateData([...createTemplateData, { ...emptyTemplateData, id: v4() }]);

  const onMinusClick = (index: number) => {
    const newTemplateData = [...createTemplateData];

    newTemplateData.splice(index, 1);
    setCreateTemplateData(newTemplateData);
  };

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

  return (
    <div className="create-template">
      <div className="create-template-box">
        <p>Name of Template</p>
        <TextField className="schedule-inputs" fullWidth placeholder="Name of Template" />
      </div>
      <div className="splitter-line" />
      {createTemplateData.map((item, index) => (
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
                      onDayChange(e.target.checked, indexOfDay, index);
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
                    updateInputValue('startTime', newTime?.toISOString(), index);
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
                    updateInputValue('endTime', newTime?.toISOString(), index);
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
              value={item.isServiceType}
              onChange={(e) => {
                updateInputValue('isServiceType', e.target.value === 'true', index);
              }}
            >
              <FormControlLabel value control={<Radio />} label="Service Type" />
              <FormControlLabel value={false} control={<Radio />} label="Block" />
            </RadioGroup>
          </div>
          {item.isServiceType && (
            <div className="create-template-box">
              <p>Service Types</p>
              <Autocomplete
                className="schedule-inputs"
                multiple
                options={sortGroups(optionsGroup)}
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
              value={item.placeholder}
              placeholder="Placeholder Label"
              onChange={(e) => updateInputValue('placeholder', e.target.value, index)}
            />
          </div>
          <div className="splitter-line" />
        </Box>
      ))}
      <Box sx={{ marginTop: '30px' }}>
        <PlusIconButton onClick={onPlusClick} />
      </Box>
      <Grid container direction="row-reverse" sx={{ marginTop: '200px' }}>
        <Button variant="contained" className="dark-button" size="large">
          Save
        </Button>
        <Button variant="outlined" className="light-button" size="large" sx={{ marginRight: '10px' }}>
          Cancel
        </Button>
      </Grid>
    </div>
  );
};

export default CreateTemplate;
