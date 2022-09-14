import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledOutlinedInput } from '@components/Patients/PatientFilters';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Translation } from '../../constants/translations';
import { MainHeader } from '../../pages/booking/appointments';

const EncounterFilters = () => {
  const theme = useTheme();
  const [t] = useTranslation();

  const encounterFilters: string[] = [
    'Encounter Filter 1',
    'Encounter Filter 2',
    'Encounter Filter 3',
    'Encounter Filter 4'
  ];

  return (
    <MainHeader>
      <StyledOutlinedInput
        id="input-search-encounters"
        placeholder={`${t(Translation.PAGE_ENCOUNTERS_LIST_SEARCH)}`}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon sx={{ color: theme.palette.grey[400] }} />
          </InputAdornment>
        }
      />
      <Autocomplete
        id="encounterFilterId"
        fullWidth
        multiple
        options={encounterFilters}
        popupIcon={<KeyboardArrowDownIcon />}
        renderInput={(params) => <TextField {...params} label={t(Translation.PAGE_PATIENT_LIST_FIELD_FILTERS)} />}
      />
    </MainHeader>
  );
};

export default EncounterFilters;
