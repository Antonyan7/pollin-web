import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledOutlinedInput } from '@components/Patients/PatientFilters';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, IconButton, InputAdornment, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Translation } from '../../constants/translations';
import { MainHeader } from '../../pages/booking/appointments';
import { dispatch } from '../../redux/hooks';
import { patientsMiddleware } from '../../redux/slices/patients';
import { IEncountersReqBody } from '../../types/patient';

const EncounterFilters = ({ page }: { page: number }) => {
  const theme = useTheme();
  const [t] = useTranslation();
  const [searchValue, setSearchValue] = useState<string>('');
  const encounterFilters: string[] = [
    'Encounter Filter 1',
    'Encounter Filter 2',
    'Encounter Filter 3',
    'Encounter Filter 4'
  ];

  const onEncounterSearchChange = () => {
    const data: IEncountersReqBody = {
      page: page + 1,
      searchString: searchValue,
      filters: []
    };

    // TODO: Refactor this logic.
    if (!data.searchString?.length) {
      data.searchString = ' ';
    }

    dispatch(patientsMiddleware.getEncounterList(data));
  };

  const onSearchFieldClearIconClick = () => {
    setSearchValue('');
  };

  useEffect(() => {
    const data: IEncountersReqBody = {
      page: page + 1,
      searchString: '',
      filters: []
    };

    // TODO: Refactor this logic once we will decide the problem with mock server
    if (!data.searchString?.length) {
      data.searchString = ' ';
    }

    dispatch(patientsMiddleware.getEncounterList(data));
  }, [page]);

  return (
    <MainHeader>
      <StyledOutlinedInput
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onEncounterSearchChange();
          }
        }}
        id="input-search-encounters"
        placeholder={`${t(Translation.PAGE_ENCOUNTERS_LIST_SEARCH)}`}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon sx={{ color: theme.palette.grey[400] }} />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={onSearchFieldClearIconClick} edge="end">
              <HighlightOffIcon />
            </IconButton>
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
