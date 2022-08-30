import React, { useCallback } from 'react';
import { Autocomplete, Box, Checkbox, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { TextFieldProps as MuiTextFieldPropsType } from '@mui/material/TextField/TextField';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { MinusIconButton } from '@ui-component/common/buttons';
import { toIsoString, utcDate } from '@utils/dateUtils';

import { createOptionsGroup } from '../../../helpers/berryFunctions';
import { weekDays } from '../../../helpers/constants';
import { useAppSelector } from '../../../redux/hooks';
import { schedulingSelector } from '../../../redux/slices/scheduling';
import { ISingleTemplate, ITemplateGroup, ServiceTypeOrBlock } from '../../../types/create-schedule';

export const TimePeriods = (props: {
  singleTemplate: ISingleTemplate;
  index: number;
  updateInputValue: (
    input: keyof ISingleTemplate,
    value: string | undefined | boolean | string[],
    itemIndex: number,
    indexOfDay?: number
  ) => void;
  templateData: ITemplateGroup;
  setTemplateData: (value: ITemplateGroup) => void;
}) => {
  const serviceTypes = useAppSelector(schedulingSelector.serviceTypes);
  const { singleTemplate, index, updateInputValue, templateData, setTemplateData } = props;

  const renderScheduleInputs = (values: { title: string }[]) => values.map((item) => item.title);
  const onMinusClick = useCallback(
    (timePeriodIndex: number) => {
      const newTemplateData = [...templateData.timePeriods];

      newTemplateData.splice(timePeriodIndex, 1);
      setTemplateData({ ...templateData, timePeriods: newTemplateData });
    },
    [setTemplateData, templateData]
  );
  const renderTitle = (timePeriodNumber: number) =>
    !index ? (
      <Box>
        <h3 className="sub-title">Time Period {timePeriodNumber + 1}</h3>
      </Box>
    ) : (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="sub-title">Time Period {timePeriodNumber + 1}</h3>
        <MinusIconButton onClick={() => onMinusClick(timePeriodNumber)} />
      </Box>
    );

  return (
    <Box key={`timePeriod-${singleTemplate.id}`}>
      {renderTitle(index)}
      <div className="splitter-line" />
      <div className="create-template-box">
        <p>Select Day(s)</p>
        <span className="week-days schedule-inputs">
          {weekDays.map((day, indexOfDay) => (
            <span key={day}>
              <Checkbox
                key={`${day}-${singleTemplate.id}`}
                onChange={(e) => {
                  updateInputValue('days', e.target.checked, index, indexOfDay);
                }}
                color="secondary"
                checked={singleTemplate.days.includes(indexOfDay)}
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
              value={singleTemplate.startTime}
              onChange={(newTime: Date | null) => {
                if (newTime) {
                  updateInputValue('startTime', toIsoString(utcDate(newTime as Date)), index);
                }
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
              value={singleTemplate.endTime}
              onChange={(newTime: Date | null) => {
                if (newTime) {
                  updateInputValue('endTime', toIsoString(utcDate(newTime as Date)), index);
                }
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
          value={singleTemplate.periodType}
          onChange={(e) => {
            updateInputValue('periodType', e.target.value, index);
          }}
        >
          <FormControlLabel value={ServiceTypeOrBlock.ServiceType} control={<Radio />} label="Service Type" />
          <FormControlLabel value={ServiceTypeOrBlock.Block} control={<Radio />} label="Block" />
        </RadioGroup>
      </div>
      {singleTemplate.periodType === ServiceTypeOrBlock.ServiceType && (
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
          value={singleTemplate.placeholderName}
          placeholder="Placeholder Label"
          onChange={(e) => updateInputValue('placeholderName', e.target.value, index)}
        />
      </div>
      <div className="splitter-line" />
    </Box>
  );
};
