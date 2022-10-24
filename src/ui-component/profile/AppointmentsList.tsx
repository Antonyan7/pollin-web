import React from 'react';
import { useTranslation } from 'react-i18next';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import {
  Autocomplete,
  Box,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { Translation } from 'constants/translations';

import AppointmentsListTable from '@ui-component/profile/AppointmentsListTable';

interface Props {
  onBack: () => void;
}

const AppointmentsList = ({ onBack }: Props) => {
  const theme = useTheme();
  const [t] = useTranslation();

  return (
    <Stack rowGap={1.5}>
      <Grid container item xs={12} columnGap={1} direction="row" justifyItems="center">
        <IconButton onClick={onBack}>
          <ChevronLeftIcon />
        </IconButton>
        <Typography display="flex" alignItems="center" variant="h4">
          {t(Translation.PAGE_PATIENT_PROFILE_APPOINTMENTS_LIST_TITLE)}
        </Typography>
      </Grid>
      <Divider />
      <Grid container justifyContent="space-between" rowGap={1}>
        <Grid item xs={12} md={4.5}>
          <OutlinedInput
            fullWidth
            placeholder="Search"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon sx={{ color: theme.palette.primary.main }} />
              </InputAdornment>
            }
          />
        </Grid>
        <Grid item xs={12} md={7.3}>
          <Autocomplete
            fullWidth
            multiple
            loadingText={
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <CircularProgress size={20} />
              </Box>
            }
            options={[]}
            popupIcon={<KeyboardArrowDownIcon sx={{ color: theme.palette.primary.main }} />}
            renderInput={(params) => <TextField {...params} label="Appointment Recency" />}
          />
        </Grid>
      </Grid>
      <AppointmentsListTable />
    </Stack>
  );
};

export default AppointmentsList;
