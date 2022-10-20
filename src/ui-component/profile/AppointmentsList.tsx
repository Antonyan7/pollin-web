import React from 'react';
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
  TablePagination,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

import AppointmentsListTable from '@ui-component/profile/AppointmentsListTable';

interface Props {
  onBack: () => void;
}

const AppointmentsList = ({ onBack }: Props) => {
  const theme = useTheme();

  return (
    <Stack rowGap={1}>
      <Grid container xs={12} columnGap={1} direction="row" justifyItems="center">
        <IconButton onClick={onBack}>
          <ChevronLeftIcon />
        </IconButton>
        <Typography display="flex" alignItems="center" variant="h4">
          Appointments
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
      <TablePagination
        rowsPerPageOptions={[12, 24, 48]}
        component="div"
        count={12}
        rowsPerPage={12}
        page={0}
        onPageChange={() => {}}
      />
    </Stack>
  );
};

export default AppointmentsList;
