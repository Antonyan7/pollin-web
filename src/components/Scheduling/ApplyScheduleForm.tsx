import React, { FormEvent, useEffect, useState } from 'react';
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { Box } from '@mui/system';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DaysLabels } from 'helpers/constants';

export enum ScheduleTerms {
  Resource = 'Resource',
  ScheduleTemplate = 'Schedule Template',
  Template = 'Template',
  Repeats = 'Repeats',
  Every = 'Every',
  StartDate = 'Start Date',
  EndDate = 'End Date'
}

interface ApplyScheduleEntity {
  id: string;
  name: string;
}

export interface Resource extends ApplyScheduleEntity {}
export interface ScheduleTemplate extends ApplyScheduleEntity {}
export interface RepeatWeeks extends ApplyScheduleEntity {}

export interface AppliedDay {
  dayNum: number;
  dayLabel: DaysLabels;
}

const ApplyScheduleForm = () => {
  // TODO - remove when applied to mock-server
  const resourceList: Resource[] = [
    {
      id: 'dvdvefn45thr',
      name: 'Doctor 1'
    },
    {
      id: 'scwweehtb',
      name: 'Doctor 2'
    },
    {
      id: 'e346587',
      name: 'Doctor 3'
    },
    {
      id: 'h78j9k7j6htbfh',
      name: 'Doctor 4'
    }
  ];

  // TODO - remove when applied to mock-server
  const scheduleTemplateList: ScheduleTemplate[] = [
    {
      id: '134t5ytger',
      name: 'Template 1'
    },
    {
      id: 'brnydhfb',
      name: 'Template 2'
    },
    {
      id: 'hrgeg546j',
      name: 'Template 3'
    },
    {
      id: 'ergergerger',
      name: 'Template 4'
    },
    {
      id: '134t5ytger',
      name: 'Template 5'
    },
    {
      id: 'g65h65g76h',
      name: 'Template 6'
    },
    {
      id: 'yjrtdg4',
      name: 'Template 7'
    },
    {
      id: 'd3d2d334',
      name: 'Template 8'
    },

    {
      id: 'rfgthj86j',
      name: 'Template 9'
    },
    {
      id: 'tnynb6href',
      name: 'Template 10'
    },

    {
      id: 'erg34334defe',
      name: 'Template 11'
    },
    {
      id: 'ghuj97k8muj',
      name: 'Template 12'
    }
  ];

  // TODO - remove when applied to mock-server
  const applyDaysList: AppliedDay[] = [
    {
      dayNum: 0,
      dayLabel: DaysLabels.Mon
    },
    {
      dayNum: 1,
      dayLabel: DaysLabels.Tue
    },
    {
      dayNum: 2,
      dayLabel: DaysLabels.Wed
    }
  ];

  // TODO - remove when applied to mock-server
  const repeatWeeksList: RepeatWeeks[] = [
    {
      id: '345y4htgfet',
      name: '1 Week'
    },
    {
      id: 'c34ecvb6n9',
      name: '2 Week'
    },
    {
      id: '7j6h5b44wrvhy',
      name: '3 Week'
    },
    {
      id: 'cedxswdfvby09',
      name: '4 Week'
    },
    {
      id: 'c4g4efg5',
      name: '5 Week'
    }
  ];

  const theme = useTheme();

  const [resource, setResource] = useState<string>('');
  const [scheduleTemplate, setScheduleTemplate] = useState<string>('');
  const [isAppliedDays, setIsAppliedDays] = useState<boolean>(false);
  const [repeatWeeksCount, setRepeatWeeksCount] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  useEffect(() => {
    setIsAppliedDays(true);
  }, []);

  const handleSelectResource = (resourceItem: Resource | null) => {
    if (resourceItem) {
      setResource(resourceItem.id);
    }
  };

  const handleSelectTemplate = (templateItem: ScheduleTemplate | null) => {
    if (templateItem) {
      setScheduleTemplate(templateItem.id);
    }
  };

  const handleRepeatWeeks = (repeatWeeksItem: RepeatWeeks | null) => {
    if (repeatWeeksItem) {
      setRepeatWeeksCount(repeatWeeksItem.id);
    }
  };

  const handleSubmitApply = (event: FormEvent) => {
    event.preventDefault();

    const applyScheduleReq = {
      resourceId: resource,
      templateId: scheduleTemplate,
      repeatWeeksCount
    };

    // TODO - remove it when mock server will be applied
    console.log(applyScheduleReq);
  };

  return (
    <Box
      sx={{
        marginTop: '35px',
        borderRadius: '7px',
        border: '1px solid #dce1e4',
        padding: '0 4rem',
        paddingTop: '2.813rem',
        backgroundColor: theme.palette.background.paper
      }}
    >
      <form onSubmit={handleSubmitApply}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Grid container alignItems="center">
              <Grid item xs={12} lg={4}>
                <Typography variant="body1">{ScheduleTerms.Resource}</Typography>
              </Grid>
              <Grid item xs={12} lg={8}>
                <FormControl fullWidth>
                  <Autocomplete
                    options={resourceList}
                    onChange={(e, value) => {
                      handleSelectResource(value);
                    }}
                    getOptionLabel={(itemResource) => itemResource.name}
                    renderInput={(params) => <TextField {...params} label={ScheduleTerms.Resource} />}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container alignItems="center">
              <Grid item xs={12} lg={4}>
                <Typography variant="body1">{ScheduleTerms.ScheduleTemplate}</Typography>
              </Grid>
              <Grid item xs={12} lg={8}>
                <FormControl fullWidth>
                  <Autocomplete
                    options={scheduleTemplateList}
                    onChange={(e, value) => {
                      handleSelectTemplate(value);
                    }}
                    getOptionLabel={(itemTemplate) => itemTemplate.name}
                    renderInput={(params) => <TextField {...params} label={ScheduleTerms.Template} />}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          {isAppliedDays && applyDaysList.length ? (
            <Grid item xs={12}>
              <Grid container alignItems="center">
                <Grid item xs={12} lg={4}>
                  <Typography variant="body1">Apply Day(s)</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <Grid container spacing={2}>
                    {applyDaysList.map((itemDay: AppliedDay) => (
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Checkbox
                              defaultChecked
                              style={{
                                color: theme.palette.grey[800]
                              }}
                              sx={{ '& .MuiSvgIcon-root': { fontSize: 26 } }}
                            />
                          }
                          label={itemDay.dayLabel}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <div />
          )}

          <Grid item xs={12}>
            <Grid container alignItems="center">
              <Grid item xs={12} lg={4}>
                <Typography variant="body1">{ScheduleTerms.Repeats}</Typography>
              </Grid>
              <Grid item xs={12} lg={8}>
                <FormControl fullWidth>
                  <Autocomplete
                    options={repeatWeeksList}
                    onChange={(e, value) => {
                      handleRepeatWeeks(value);
                    }}
                    getOptionLabel={(itemRepeat) => itemRepeat.name}
                    renderInput={(params) => <TextField {...params} label={ScheduleTerms.Every} />}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container alignItems="center">
              <Grid item xs={12} lg={4}>
                <Typography variant="body1">{ScheduleTerms.StartDate}</Typography>
              </Grid>
              <Grid item xs={12} lg={8}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label={ScheduleTerms.StartDate}
                    inputFormat="MMM dd, yyyy"
                    value={startDate}
                    renderInput={(params) => <TextField fullWidth {...params} />}
                    onChange={(newValue: Date | null) => {
                      setStartDate(newValue);
                    }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container alignItems="center">
              <Grid item xs={12} lg={4}>
                <Typography variant="body1">{ScheduleTerms.EndDate}</Typography>
              </Grid>
              <Grid item xs={12} lg={8}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label={ScheduleTerms.EndDate}
                    inputFormat="MMM dd, yyyy"
                    value={endDate}
                    renderInput={(params) => <TextField fullWidth {...params} />}
                    onChange={(newValue: Date | null) => {
                      setEndDate(newValue);
                    }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container alignItems="center">
              <Grid item xs />
              <Grid item xs />
              <Grid item xs={4} lg={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  style={{
                    background: theme.palette.grey[400],
                    margin: '30px 0'
                  }}
                >
                  Apply
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ApplyScheduleForm;
