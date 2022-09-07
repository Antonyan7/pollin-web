import React, { useCallback, useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Divider, InputAdornment, OutlinedInput, TextField, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';
import { reformatedFilterResults } from 'helpers/patientFilters';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';

import { MainHeader } from '../../pages/booking/appointments';

const OutlinedInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
  width: 500,
  height: 53,
  marginBottom: 20,
  marginRight: 20,
  paddingLeft: 16,
  paddingRight: 16,
  background: 'transparent',
  '& input': {
    background: 'transparent',
    paddingLeft: '4px'
  },
  [theme.breakpoints.down('lg')]: {
    width: 250
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: 4,
    background: theme.palette.common.white
  }
}));

interface PatientFiltersProps {
  setSearchValue: (value: string) => void;
  setFiltersChange?: (value: any) => void;
}

const PatientFilters = ({ setSearchValue }: PatientFiltersProps) => {
  const theme = useTheme();
  const filtersList = useAppSelector(patientsSelector.filtersList);

  useEffect(() => {
    dispatch(patientsMiddleware.getPatientSearchFilters());
  }, []);

  const onSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    },
    [setSearchValue]
  );

  return (
    <>
      <header
        style={{
          display: 'flex'
        }}
      >
        <Typography variant="h3">Patient List</Typography>
      </header>
      <Divider variant="fullWidth" sx={{ marginTop: '17px', marginLeft: '-64px', marginRight: '-64px' }} />
      <MainHeader>
        <OutlinedInputStyle
          id="input-search-patients"
          placeholder="Search Patients"
          onChange={onSearchChange}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon sx={{ color: theme.palette.primary.main }} />
            </InputAdornment>
          }
        />
        <Autocomplete
          id="patientFilterId"
          fullWidth
          multiple
          options={reformatedFilterResults(filtersList)}
          groupBy={(option) => option.options.titleName}
          getOptionLabel={(option) => option.options.title as string}
          isOptionEqualToValue={(option, value) => option.options.id === value.options.id}
          popupIcon={<KeyboardArrowDownIcon />}
          renderInput={(params) => <TextField {...params} label="Filter Results" />}
        />
      </MainHeader>
    </>
  );
};

export default PatientFilters;
