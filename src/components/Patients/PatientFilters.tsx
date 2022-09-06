import React, { useCallback } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Autocomplete, Divider, InputAdornment, OutlinedInput, TextField, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';
import { IconSearch } from '@tabler/icons';

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

const filterResults = [
  { name: 'Filter 1', id: 1 },
  { name: 'Filter 2', id: 2 },
  { name: 'Filter 3', id: 3 },
  { name: 'Filter 4', id: 4 }
];

interface PatientFiltersProps {
  setSearchValue: (value: string) => void;
  setFiltersChange: (value: any) => void;
}

const PatientFilters = ({ setSearchValue, setFiltersChange }: PatientFiltersProps) => {
  const theme = useTheme();

  const onSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    },
    [setSearchValue]
  );

  const onFiltersChange = useCallback(
    (event: React.ChangeEvent<{}>, value: any) => {
      setFiltersChange(value);
    },
    [setFiltersChange]
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
              <IconSearch stroke={2} size="1.2rem" color={theme.palette.grey[500]} />
            </InputAdornment>
          }
        />
        <Autocomplete
          fullWidth
          onChange={onFiltersChange}
          options={filterResults}
          getOptionLabel={(option) => option.name}
          popupIcon={<KeyboardArrowDownIcon />}
          renderInput={(params) => <TextField {...params} label="Filter Results" />}
        />
      </MainHeader>
    </>
  );
};

export default PatientFilters;
