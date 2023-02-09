import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledButtonNew } from '@components/Appointments/CommonMaterialComponents';
import AddIcon from '@mui/icons-material/Add';
import { Grid, Typography, useTheme } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Translation } from 'constants/translations';

export const TaskDashboardLayout = ({
  toggle,
  setToggle
}: {
  toggle: boolean;
  setToggle: (value: boolean) => void;
}) => {
  const theme = useTheme();
  const [t] = useTranslation();

  const handleChangeToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToggle(event.target.checked);
  };

  return (
    <Grid container justifyContent="flex-end" alignItems="center">
      <Grid item>
        <FormControlLabel
          label="Show My Tasks"
          control={
            <Switch
              sx={{
                '& .MuiSwitch-switchBase': {
                  color: theme.palette.primary[200]
                }
              }}
              checked={toggle}
              onChange={handleChangeToggle}
            />
          }
        />
      </Grid>
      <Grid item>
        <StyledButtonNew fullWidth theme={theme} variant="contained" endIcon={<AddIcon />}>
          <Typography color={theme.palette.common.white}>{t(Translation.PAGE_TASK_DASHBOARD_CREATE_TASK)}</Typography>
        </StyledButtonNew>
      </Grid>
    </Grid>
  );
};
