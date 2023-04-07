import React from 'react';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField, Typography } from '@mui/material';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

const SearchPharmacyAddress = () => {
  const [t] = useTranslation();

  return (
    <>
      <Typography variant="h5" pb={paddings.bottom4}>
        Pharmacy Address
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label={t(Translation.MODAL_PRESCRIPTIONS_SEARCH_FOR_PHARMACY_ADDRESS)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: (theme) => theme.palette.primary.main }} />
            </InputAdornment>
          )
        }}
      />
    </>
  );
};

export default SearchPharmacyAddress;
