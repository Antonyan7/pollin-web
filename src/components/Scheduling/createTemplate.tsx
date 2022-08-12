import React, { useState } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import {
  Autocomplete,
  Button,
  Checkbox,
  Fab,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material';
import { TextFieldProps as MuiTextFieldPropsType } from '@mui/material/TextField/TextField';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { createOptionsGroup, sortGroups } from '../../helpers/berryFunctions';
import { weekDays } from '../../helpers/constants';

const CreateTemplate = () => {
  const [isServiceTypeActive, setIsServiceTypeActive] = useState(false);
  const [startTime, setStartTime] = useState<string>(new Date().toISOString());
  const [endTime, setEndTime] = useState<string>(new Date().toISOString());

  // TODO: update to not use mock data
  const [serviceTypes] = useState([
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 }
  ]);

  const optionsGroup = createOptionsGroup(serviceTypes);

  const setTime = (setWhere: (value: string) => void, value: Date | null) => {
    if (value) {
      setWhere(value.toString());
    }
  };

  return (
    <div className="create-template">
      <div className="create-template-box">
        <p>Name of Template</p>
        <TextField className="schedule-inputs" fullWidth placeholder="Name of Template" />
      </div>
      <div className="splitter-line" />
      <h3 className="sub-title">Time Period 1</h3>
      <div className="splitter-line" />
      <div className="create-template-box">
        <p>Select Day(s)</p>
        <span className="week-days schedule-inputs">
          {weekDays.map((day) => (
            <span>
              <Checkbox color="secondary" />
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
              value={startTime}
              onChange={(newTime: Date | null) => {
                setTime(setStartTime, newTime);
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
              value={endTime}
              onChange={(newTime: Date | null) => {
                setTime(setEndTime, newTime);
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
          value={isServiceTypeActive}
          onChange={(e) => {
            setIsServiceTypeActive(e.target.value === 'true');
          }}
        >
          <FormControlLabel value control={<Radio />} label="Service Type" />
          <FormControlLabel value={false} control={<Radio />} label="Block" />
        </RadioGroup>
      </div>
      {isServiceTypeActive && (
        <div className="create-template-box">
          <p>Service Types</p>
          <Autocomplete
            className="schedule-inputs"
            multiple
            options={sortGroups(optionsGroup)}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => <TextField {...params} label="Service Types" />}
          />
        </div>
      )}
      <div className="create-template-box">
        <p>Placeholder Label</p>
        <TextField className="schedule-inputs" fullWidth id="outlined-email-address" placeholder="Placeholder Label" />
      </div>
      <div className="splitter-line" />
      <Grid container direction="row-reverse" sx={{ marginTop: '30px' }}>
        <Grid item>
          <Fab size="small" className="plus-icon">
            <AddRoundedIcon fontSize="medium" />
          </Fab>
        </Grid>
      </Grid>
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
