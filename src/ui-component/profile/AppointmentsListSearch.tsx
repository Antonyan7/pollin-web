import React, { useEffect, useMemo } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, InputAdornment, OutlinedInput, useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import throttle from 'lodash.throttle';

const THROTTLE_TIMEOUT = 1000;

const AppointmentsListSearch = () => {
  const theme = useTheme();

  const { list, orderBy, order, filterId } = useAppSelector(patientsSelector.patientAppointments);
  const { currentPage } = list;

  // using useMemo to keep the function between re-renders and have access to the state variables in the component function scope
  const throttledSearchRequest = useMemo(
    () =>
      throttle(
        (...args: Parameters<typeof patientsMiddleware.getPatientAppointments>) => {
          dispatch(patientsMiddleware.getPatientAppointments(...args));
        },
        THROTTLE_TIMEOUT,
        {
          leading: false,
          trailing: true
        }
      ),
    []
  );

  useEffect(
    () => () => {
      // clear up scheduled throttle callback to avoid memory leaks
      throttledSearchRequest.cancel();
    },
    [throttledSearchRequest]
  );

  const onSearchChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (e) => {
    throttledSearchRequest(e.target.value, filterId, currentPage, order, orderBy);
  };

  return (
    <Grid item xs={12} md={4.5}>
      <OutlinedInput
        fullWidth
        placeholder="Search"
        onChange={onSearchChange}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon sx={{ color: theme.palette.primary.main }} />
          </InputAdornment>
        }
      />
    </Grid>
  );
};

export default AppointmentsListSearch;
