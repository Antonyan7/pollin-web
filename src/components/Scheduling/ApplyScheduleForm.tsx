import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { AlertBanner } from '@components/Alert/Alert';
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
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { Box } from '@mui/system';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';
import { repeatWeeksList, weekDays } from 'helpers/constants';

import { dispatch, useAppSelector } from '../../redux/hooks';
import { bookingMiddleware, bookingSelector } from '../../redux/slices/booking';
import { schedulingMiddleware, schedulingSelector } from '../../redux/slices/scheduling';
import { IAppliedDay, IApplyScheduleDay, ScheduleTerms } from '../../types/apply-schedule';
import { IApplyScheduleData, ISingleTemplate } from '../../types/create-schedule';
import { IServiceProvider } from '../../types/reduxTypes/booking';
import { SchedulingTemplateProps } from '../../types/reduxTypes/scheduling';

const errorMessage = 'You have to fill all fields.';

// TODO update component to contain 150 lines
// eslint-disable-next-line max-lines-per-function
const ApplyScheduleForm = () => {
  const theme = useTheme();

  const scheduleTemplates = useAppSelector(schedulingSelector.scheduleTemplates);
  const scheduleApplyTemplates = useAppSelector(schedulingSelector.scheduleSingleTemplate);
  const serviceProviders = useAppSelector(bookingSelector.serviceProvidersList);
  const scheduleApplySuccess = useAppSelector(schedulingSelector.scheduleApplySuccess);
  const [resource, setResource] = useState<IServiceProvider>({
    id: '',
    title: ''
  });
  const [scheduleTemplate, setScheduleTemplate] = useState<SchedulingTemplateProps>({
    id: '',
    name: '',
    duration: '',
    lastSavedDay: '',
    status: ''
  });
  const [isAppliedDays, setIsAppliedDays] = useState<boolean>(false);
  const [repeatWeeks, setRepeatWeeks] = useState<IApplyScheduleDay>({ id: 0, name: '' });
  const [startDate, setStartDate] = useState<Date | string | null>(format(new Date(), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState<Date | string | null>(format(new Date(), 'yyyy-MM-dd'));
  const [applyDays, setApplyDays] = useState<number[]>([]);
  const [errorAlert, setErrorAlert] = useState<boolean>(false);
  const [applyDaysListRendering, setApplyDaysListRendering] = useState<IAppliedDay[]>([]);
  const [successAlertOpen, setSuccessAlertOpen] = useState<boolean>(false);

  const resetFormValues = () => {
    setScheduleTemplate({
      id: '',
      name: '',
      duration: '',
      lastSavedDay: '',
      status: ''
    });
    setResource({
      id: '',
      title: ''
    });
    setRepeatWeeks({ id: 0, name: '' });
    setIsAppliedDays(false);
    setStartDate(format(new Date(), 'yyyy-MM-dd'));
    setEndDate(format(new Date(), 'yyyy-MM-dd'));
  };

  const handleApplyClick = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const applyScheduleTemplateData: IApplyScheduleData = {
      resourceId: resource.id,
      templateId: scheduleTemplate.id,
      repeatWeeksCount: repeatWeeks.id,
      applyDays,
      startDate,
      endDate
    };

    if (resource.id && scheduleTemplate.id && repeatWeeks && applyDays && startDate && endDate) {
      dispatch(schedulingMiddleware.applyScheduleTemplate(applyScheduleTemplateData));
    } else {
      setErrorAlert(true);
    }
  };

  const handleSelectTemplate = (templateItem: SchedulingTemplateProps | null) => {
    if (templateItem) {
      dispatch(schedulingMiddleware.getSingleSchedule(templateItem.id));
      setScheduleTemplate(templateItem);
    }
  };

  const onSelectResourceUpdate = (resourceItem: IServiceProvider | null) => {
    if (resourceItem) {
      setResource(resourceItem);
    }
  };
  const onRepeatWeeksUpdate = (repeatWeeksItem: IApplyScheduleDay | null) => {
    if (repeatWeeksItem) {
      setRepeatWeeks(repeatWeeksItem);
    }
  };

  const onStartDateUpdate = (date: Date) => {
    setStartDate(format(date, 'yyyy-MM-dd'));
  };
  const onEndDateUpdate = (date: Date) => {
    setEndDate(format(date, 'yyyy-MM-dd'));
  };
  const onApplyDays = (e: ChangeEvent<HTMLInputElement>, day: IAppliedDay) => {
    const tempApplyDays: number[] = [...applyDays];

    if (e.target.checked) {
      if (!tempApplyDays.includes(day.dayNum)) {
        tempApplyDays.push(day.dayNum);
      }
    } else {
      tempApplyDays.splice(tempApplyDays.indexOf(day.dayNum), 1);
    }

    setApplyDays(tempApplyDays);
  };

  const adjustApplyDays = () => {
    // Logic For Comparing two or more timePeriods
    let timePeriodsApplyDates: number[] = [];

    if (scheduleApplyTemplates?.timePeriods) {
      scheduleApplyTemplates?.timePeriods.forEach((item: ISingleTemplate) => {
        timePeriodsApplyDates = [...timePeriodsApplyDates, ...item.days];
      });
    }

    const uniqueTimePeriodsApplyDates = Array.from(new Set(timePeriodsApplyDates));

    setApplyDays(uniqueTimePeriodsApplyDates);

    // Logic For showing apply days checkboxes
    let applyDaysToDisplay: IAppliedDay[] = [];

    weekDays.forEach((item, index) => {
      if (uniqueTimePeriodsApplyDates.includes(index)) {
        applyDaysToDisplay = [
          ...applyDaysToDisplay,
          {
            dayNum: index,
            dayLabel: item
          }
        ];
      }
    });
    setApplyDaysListRendering(applyDaysToDisplay);
    setIsAppliedDays(true);
  };

  useEffect(() => {
    dispatch(schedulingMiddleware.getSchedulingTemplates());
    dispatch(bookingMiddleware.getServiceProviders());
  }, []);

  useEffect(() => {
    adjustApplyDays();
    // eslint-disable-next-line
  }, [scheduleApplyTemplates]);

  useEffect(() => {
    if (scheduleApplySuccess) {
      setSuccessAlertOpen(true);
      resetFormValues();
      dispatch(schedulingMiddleware.resetSuccessStatusState());
    }
  }, [scheduleApplySuccess]);

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
      <form onSubmit={(event: FormEvent<HTMLFormElement>) => handleApplyClick(event)}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Grid container alignItems="center">
              <Grid item xs={12} lg={4}>
                <Typography variant="body1">{ScheduleTerms.Resource}</Typography>
              </Grid>
              <Grid item xs={12} lg={8}>
                <FormControl fullWidth>
                  <Autocomplete
                    options={serviceProviders}
                    onChange={(e, value) => {
                      onSelectResourceUpdate(value);
                    }}
                    value={{ id: resource.id, title: resource.title }}
                    getOptionLabel={(itemResource) => itemResource.title}
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
                    value={{
                      id: scheduleTemplate.id,
                      name: scheduleTemplate.name,
                      duration: scheduleTemplate.duration,
                      lastSavedDay: scheduleTemplate.lastSavedDay,
                      status: scheduleTemplate.status
                    }}
                    options={scheduleTemplates}
                    onChange={(e, value: SchedulingTemplateProps | null) => {
                      handleSelectTemplate(value);
                    }}
                    getOptionLabel={(itemTemplate) => itemTemplate.name}
                    renderInput={(params) => <TextField {...params} label={ScheduleTerms.Template} />}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          {isAppliedDays && applyDaysListRendering.length ? (
            <Grid item xs={12}>
              <Grid container alignItems="center">
                <Grid item xs={12} lg={4}>
                  <Typography variant="body1">Apply Day(s)</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <Grid container spacing={2}>
                    {applyDaysListRendering.map((day: IAppliedDay) => (
                      <Grid item>
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
                      onRepeatWeeksUpdate(value);
                    }}
                    value={{ id: repeatWeeks.id, name: repeatWeeks.name }}
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
                    onChange={(date: Date | null) => {
                      if (date) {
                        onStartDateUpdate(date);
                      }
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
                    onChange={(date: Date | null) => {
                      if (date) {
                        onEndDateUpdate(date);
                      }
                    }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Grid>
          <Snackbar
            open={successAlertOpen}
            autoHideDuration={2000}
            onClose={() => setSuccessAlertOpen(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <Alert variant="filled" severity="success">
              Successfully Applied
            </Alert>
          </Snackbar>

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
          <AlertBanner
            visible={errorAlert}
            errorDescription={errorMessage}
            severityType="error"
            setVisible={setErrorAlert}
          />
        </Grid>
      </form>
    </Box>
  );
};

export default ApplyScheduleForm;
