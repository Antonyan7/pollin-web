import React, { useEffect, useState } from 'react';
import bookingManager from '@axios/booking/bookingManager';
import { IPatientAppointmentsListFilter } from '@axios/booking/managerBookingTypes';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Autocomplete, Box, CircularProgress, Grid, TextField, useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';

const AppointmentListFilter = () => {
  const theme = useTheme();
  const { list, orderBy, order, search } = useAppSelector(patientsSelector.patientAppointments);
  const { currentPage } = list;

  const [filters, setFilters] = useState<IPatientAppointmentsListFilter[] | null>(null);

  useEffect(() => {
    if (filters === null) {
      bookingManager.getAppointmentListFilters().then(({ data }) => {
        setFilters(data.filters);
      });
    }
  }, [filters]);

  const onAppointmentRecencyChange = (
    _event: React.SyntheticEvent<Element, Event>,
    value: IPatientAppointmentsListFilter | null
  ) => {
    const newFilterId = value?.id ?? 'allFilterId';

    dispatch(patientsMiddleware.getPatientAppointments(search, newFilterId, currentPage, order, orderBy));
  };

  return (
    <Grid item xs={12} md={7.3}>
      <Autocomplete
        fullWidth
        loadingText={
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <CircularProgress size={20} />
          </Box>
        }
        onChange={onAppointmentRecencyChange}
        options={filters ?? [{ title: '', id: '' }]}
        getOptionLabel={(option) => option.title}
        popupIcon={<KeyboardArrowDownIcon sx={{ color: theme.palette.primary.main }} />}
        renderInput={(params) => <TextField {...params} label="Appointment Recency" />}
      />
    </Grid>
  );
};

export default AppointmentListFilter;
