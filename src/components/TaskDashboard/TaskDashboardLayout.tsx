import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledButtonNew } from '@components/common/MaterialComponents';
import AddIcon from '@mui/icons-material/Add';
import { Grid, Typography, useTheme } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { dispatch } from '@redux/hooks';
import { Translation } from 'constants/translations';
import { viewsMiddleware } from 'redux/slices/views';
import { ModalName } from 'types/modals';

export const TaskDashboardLayout = ({
  onlyUserTasks,
  handleUserTasksToggle
}: {
  onlyUserTasks: boolean;
  handleUserTasksToggle: (value: boolean) => void;
}) => {
  const theme = useTheme();
  const [t] = useTranslation();

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleUserTasksToggle(event.target.checked);
  };

  const onCreateTask = () => {
    dispatch(
      viewsMiddleware.openModal({
        name: ModalName.CreateTaskModal,
        props: {}
      })
    );
  };

  return (
    <Grid container justifyContent="flex-end" alignItems="center">
      <Grid item>
        <FormControlLabel
          label={t(Translation.PAGE_TASKS_MANAGER_SWITCH_SHOW_MY_TASKS)}
          control={
            <Switch
              sx={{
                '& .MuiSwitch-switchBase': {
                  color: theme.palette.primary[200]
                }
              }}
              checked={onlyUserTasks}
              onChange={handleToggle}
            />
          }
        />
      </Grid>
      <Grid item>
        <StyledButtonNew onClick={onCreateTask} fullWidth theme={theme} variant="contained" endIcon={<AddIcon />}>
          <Typography color={theme.palette.common.white}>{t(Translation.PAGE_TASK_DASHBOARD_CREATE_TASK)}</Typography>
        </StyledButtonNew>
      </Grid>
    </Grid>
  );
};
