import React, { ChangeEvent } from 'react';
import { Checkbox, FormControlLabel, Grid, useTheme } from '@mui/material';
import { IAppliedDay } from 'types/apply-schedule';

interface Props {
  applyDaysListRendering: IAppliedDay[];
  setApplyDays: React.Dispatch<React.SetStateAction<number[]>>;
  applyDays: number[];
}

const ApplyDaysField = ({ applyDaysListRendering, setApplyDays, applyDays }: Props) => {
  const theme = useTheme();

  const onApplyDays = (e: ChangeEvent<HTMLInputElement>, day: IAppliedDay) => {
    if (e.target.checked && !applyDays.includes(day.dayNum)) {
      setApplyDays([...applyDays, day.dayNum]);
    } else {
      setApplyDays([
        ...applyDays.slice(0, applyDays.indexOf(day.dayNum)),
        ...applyDays.slice(applyDays.indexOf(day.dayNum) + 1)
      ]);
    }
  };

  return (
    <Grid container spacing={2}>
      {applyDaysListRendering.map((day: IAppliedDay) => (
        <Grid item key={day.dayNum}>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                style={{
                  color: theme.palette.grey[800]
                }}
                sx={{ '& .MuiSvgIcon-root': { fontSize: 26 } }}
                onChange={(e) => {
                  onApplyDays(e, day);
                }}
              />
            }
            label={day.dayLabel}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ApplyDaysField;
