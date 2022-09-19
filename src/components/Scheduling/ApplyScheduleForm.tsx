import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SeveritiesType } from '@components/Alert/Alert';
import { ScheduleBoxWrapper, StyledButton } from '@components/Appointments/CommonMaterialComponents';
import EventIcon from '@mui/icons-material/Event';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
  TextFieldProps,
  Typography,
  useTheme
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Translation } from 'constants/translations';
import { format } from 'date-fns';
import { repeatWeeksList, weekDays } from 'helpers/constants';
import { viewsMiddleware } from 'redux/slices/views';

import { dispatch, useAppSelector } from '../../redux/hooks';
import { bookingMiddleware, bookingSelector } from '../../redux/slices/booking';
import { schedulingMiddleware, schedulingSelector } from '../../redux/slices/scheduling';
import { IAppliedDay, IApplyScheduleDay } from '../../types/apply-schedule';
import { IApplyScheduleData, ISingleTemplate } from '../../types/create-schedule';
import { IServiceProvider } from '../../types/reduxTypes/booking';
import { SchedulingTemplateProps } from '../../types/reduxTypes/scheduling';

// TODO update component to contain 150 lines
// eslint-disable-next-line max-lines-per-function
const ApplyScheduleForm = () => {
  const theme = useTheme();
  const [t] = useTranslation();

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
  const [applyDaysListRendering, setApplyDaysListRendering] = useState<IAppliedDay[]>([]);

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
      dispatch(
        viewsMiddleware.setAlertPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.error,
            description: t(Translation.PAGE_SCHEDULING_APPLY_ALERT_ERROR)
          }
        })
      );
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
    dispatch(schedulingMiddleware.getSchedulingTemplates(1));
    dispatch(bookingMiddleware.getServiceProviders(1));
  }, []);

  useEffect(() => {
    adjustApplyDays();
    // eslint-disable-next-line
  }, [scheduleApplyTemplates]);

  useEffect(() => {
    if (scheduleApplySuccess) {
      dispatch(
        viewsMiddleware.setAlertPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.success,
            description: t(Translation.PAGE_SCHEDULING_APPLY_ALERT_SUCCESS)
          }
        })
      );
      resetFormValues();
      dispatch(schedulingMiddleware.resetSuccessStatusState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleApplySuccess]);

  return (
    <ScheduleBoxWrapper>
      <form onSubmit={(event: FormEvent<HTMLFormElement>) => handleApplyClick(event)}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Grid container alignItems="center">
              <Grid item xs={12} lg={4}>
                <Typography variant="body1">{t(Translation.PAGE_SCHEDULING_APPLY_RESOURCE)}</Typography>
              </Grid>
              <Grid item xs={12} lg={8}>
                <FormControl fullWidth>
                  <Autocomplete
                    popupIcon={<KeyboardArrowDownIcon />}
                    options={serviceProviders}
                    onChange={(e, value) => {
                      onSelectResourceUpdate(value);
                    }}
                    value={{ id: resource.id, title: resource.title }}
                    getOptionLabel={(itemResource) => itemResource.title}
                    renderInput={(params) => (
                      <TextField {...params} label={t(Translation.PAGE_SCHEDULING_APPLY_RESOURCE)} />
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container alignItems="center">
              <Grid item xs={12} lg={4}>
                <Typography variant="body1">{t(Translation.PAGE_SCHEDULING_APPLY_TEMPLATE)}</Typography>
              </Grid>
              <Grid item xs={12} lg={8}>
                <FormControl fullWidth>
                  <Autocomplete
                    popupIcon={<KeyboardArrowDownIcon />}
                    value={{
                      id: scheduleTemplate.id,
                      name: scheduleTemplate.name,
                      duration: scheduleTemplate.duration,
                      lastSavedDay: scheduleTemplate.lastSavedDay,
                      status: scheduleTemplate.status
                    }}
                    options={scheduleTemplates.templates}
                    onChange={(e, value: SchedulingTemplateProps | null) => {
                      handleSelectTemplate(value);
                    }}
                    getOptionLabel={(itemTemplate) => itemTemplate.name}
                    renderInput={(params) => (
                      <TextField {...params} label={t(Translation.PAGE_SCHEDULING_APPLY_TEMPLATE)} />
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          {isAppliedDays && applyDaysListRendering.length ? (
            <Grid item xs={12}>
              <Grid container alignItems="center">
                <Grid item xs={12} lg={4}>
                  <Typography variant="body1">{t(Translation.PAGE_SCHEDULING_APPLY_APPLIED_DAYS)}</Typography>
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
                <Typography variant="body1">{t(Translation.PAGE_SCHEDULING_APPLY_REPEATS)}</Typography>
              </Grid>
              <Grid item xs={12} lg={8}>
                <FormControl fullWidth>
                  <Autocomplete
                    popupIcon={<KeyboardArrowDownIcon />}
                    options={repeatWeeksList}
                    onChange={(e, value) => {
                      onRepeatWeeksUpdate(value);
                    }}
                    value={{ id: repeatWeeks.id, name: repeatWeeks.name }}
                    getOptionLabel={(itemRepeat) => itemRepeat.name}
                    renderInput={(params) => (
                      <TextField {...params} label={t(Translation.PAGE_SCHEDULING_APPLY_EVERY)} />
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container alignItems="center">
              <Grid item xs={12} lg={4}>
                <Typography variant="body1">{t(Translation.PAGE_SCHEDULING_APPLY_DATE_START)}</Typography>
              </Grid>
              <Grid item xs={12} lg={8}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label={t(Translation.PAGE_SCHEDULING_APPLY_DATE_START)}
                    inputFormat="MMM dd, yyyy"
                    value={startDate}
                    renderInput={(params: TextFieldProps) => (
                      <TextField
                        fullWidth
                        {...params}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <EventIcon sx={{ color: theme.palette.primary.main }} />
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
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
                <Typography variant="body1">{t(Translation.PAGE_SCHEDULING_APPLY_DATE_END)}</Typography>
              </Grid>
              <Grid item xs={12} lg={8}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label={t(Translation.PAGE_SCHEDULING_APPLY_DATE_END)}
                    inputFormat="MMM dd, yyyy"
                    value={endDate}
                    renderInput={(params: TextFieldProps) => (
                      <TextField
                        fullWidth
                        {...params}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <EventIcon sx={{ color: theme.palette.primary.main }} />
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
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
          <Grid item xs={12}>
            <Grid container alignItems="center">
              <Grid item xs />
              <Grid item xs />
              <Grid item xs={4} lg={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <StyledButton
                  type="submit"
                  variant="contained"
                  size="large"
                  style={{
                    margin: '30px 0'
                  }}
                >
                  {t(Translation.PAGE_SCHEDULING_APPLY_BUTTON_APPLY)}
                </StyledButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </ScheduleBoxWrapper>
  );
};

export default ApplyScheduleForm;
