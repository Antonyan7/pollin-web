import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Autocomplete, Box, Checkbox, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { TextFieldProps as MuiTextFieldPropsType } from '@mui/material/TextField/TextField';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Translation } from 'constants/translations';
import { IServiceType } from 'types/reduxTypes/booking';

import { MinusIconButton } from '@ui-component/common/buttons';
import { PickerTimeIcon } from '@ui-component/common/TimeDateIcons';

import { createOptionsGroup } from '../../../helpers/berryFunctions';
import { weekDays } from '../../../helpers/constants';
import { useAppSelector } from '../../../redux/hooks';
import { schedulingSelector } from '../../../redux/slices/scheduling';
import { ISingleTemplate, ITemplateGroup, ServiceTypeOrBlock } from '../../../types/create-schedule';

const renderScheduleInputs = (values: IServiceType[]) => values.map((item) => item.title);

// eslint-disable-next-line max-lines-per-function
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
  const serviceTypes: IServiceType[] = useAppSelector(schedulingSelector.serviceTypes);
  const { singleTemplate, index, updateInputValue, templateData, setTemplateData } = props;
  const [t] = useTranslation();

  const serviceTypeOptions = useMemo(() => createOptionsGroup(serviceTypes), [serviceTypes]);

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
        <h3 className="sub-title">
          {t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_TIME_PERIOD)} {timePeriodNumber + 1}
        </h3>
      </Box>
    ) : (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="sub-title">
          {t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_TIME_PERIOD)} {timePeriodNumber + 1}
        </h3>
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
        <p>{t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_START)}</p>
        <div className="schedule-inputs">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_START)}
              ampm={false}
              value={singleTemplate.startTime}
              onChange={(newTime: Date | null) => {
                if (newTime) {
                  updateInputValue('startTime', newTime.toISOString(), index);
                }
              }}
              renderInput={(params: MuiTextFieldPropsType) => (
                <TextField fullWidth {...params} InputProps={{ endAdornment: <PickerTimeIcon /> }} />
              )}
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className="create-template-box">
        <p>{t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_END)}</p>
        <div className="schedule-inputs">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_END)}
              ampm={false}
              value={singleTemplate.endTime}
              onChange={(date: Date | null) => {
                if (date) {
                  updateInputValue('endTime', date.toISOString(), index);
                }
              }}
              renderInput={(params: MuiTextFieldPropsType) => (
                <TextField fullWidth {...params} InputProps={{ endAdornment: <PickerTimeIcon /> }} />
              )}
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className="create-template-box">
        <p>{t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_PERIOD_TYPE)}</p>
        <RadioGroup
          className="schedule-inputs"
          row
          name="row-radio-buttons-group"
          value={singleTemplate.periodType}
          onChange={(e) => {
            updateInputValue('periodType', e.target.value, index);
          }}
        >
          <FormControlLabel
            value={ServiceTypeOrBlock.ServiceType}
            control={<Radio />}
            label={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_SERVICE_TYPE)}
          />
          <FormControlLabel
            value={ServiceTypeOrBlock.Block}
            control={<Radio />}
            label={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_BLOCK)}
          />
        </RadioGroup>
      </div>
      {singleTemplate.periodType === ServiceTypeOrBlock.ServiceType && (
        <div className="create-template-box">
          <p>{t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_SERVICE_TYPES)}</p>
          <Autocomplete
            className="schedule-inputs"
            multiple
            options={serviceTypeOptions}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.item.title}
            onChange={(e, newValues) =>
              updateInputValue('serviceTypes', renderScheduleInputs(newValues.map((value) => value.item)), index)
            }
            renderInput={(params) => <TextField {...params} label="Service Types" />}
          />
        </div>
      )}
      <div className="create-template-box">
        <p>{t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_PLACEHOLDER)}</p>
        <TextField
          className="schedule-inputs"
          fullWidth
          id="outlined-email-address"
          value={singleTemplate.placeholderName}
          placeholder={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_PLACEHOLDER)}
          onChange={(e) => updateInputValue('placeholderName', e.target.value, index)}
        />
      </div>
      <div className="splitter-line" />
    </Box>
  );
};
