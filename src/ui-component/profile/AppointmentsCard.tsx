import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import {
  Button,
  CardActions,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { ProfilePageName } from 'context/PatientProfileNavigatorContext';
import { timeAdjuster } from 'helpers/timeAdjuster';
import { AppointmentType } from 'types/patientProfile';

import { usePatientProfileNavigator } from '@hooks/usePatientProfileNavigator';
import SubCardStyled from '@ui-component/cards/SubCardStyled';

interface Props {
  appointmentType: AppointmentType;
}

const AppointmentsCard = ({ appointmentType }: Props) => {
  const [t] = useTranslation();
  const theme = useTheme();
  const { navigateTo } = usePatientProfileNavigator();

  const { list } = useAppSelector(patientsSelector.patientAppointments);
  const { appointments: appointmentsList } = list;

  useEffect(() => {
    if (appointmentsList === null) {
      dispatch(patientsMiddleware.getInitialPatientAppointments());
    }
  }, [appointmentsList]);

  const onViewAllClick = () => navigateTo(ProfilePageName.AppointmentsListPage);

  return (
    <SubCardStyled
      title={t(
        appointmentType === AppointmentType.Upcoming
          ? Translation.PAGE_PATIENT_PROFILE_UPCOMING_APPOINTMENTS
          : Translation.PAGE_PATIENT_PROFILE_PAST_APPOINTMENTS
      )}
      secondary={
        appointmentType === AppointmentType.Upcoming && (
          <IconButton>
            <AddIcon />
          </IconButton>
        )
      }
      content={false}
    >
      <TableContainer>
        <Table>
          <TableBody>
            {appointmentsList &&
              appointmentsList.slice(0, 3).map(({ id, status, type, date, time }) => (
                <TableRow hover key={id}>
                  <TableCell width="65%" sx={{ verticalAlign: 'middle' }}>
                    <Typography variant="h5">{type}</Typography>
                    <Typography fontWeight="lighter" variant="h6" color={theme.palette.grey[700]}>
                      {status}
                    </Typography>
                  </TableCell>
                  <TableCell width="25%" sx={{ verticalAlign: 'middle' }}>
                    <Typography variant="h5">{timeAdjuster(new Date(date)).customizedDate}</Typography>
                    <Typography fontWeight="lighter" variant="h6" color={theme.palette.grey[700]}>
                      @ {time}
                    </Typography>
                  </TableCell>
                  <TableCell width="10%">
                    <Stack>
                      <IconButton disableRipple>
                        <ChevronRightOutlinedIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {appointmentsList && appointmentsList.length > 0 && (
        <CardActions>
          <Grid container justifyContent="right">
            <Button variant="text" onClick={onViewAllClick}>
              {t(Translation.COMMON_BUTTON_VIEW_ALL)}
              <ChevronRightOutlinedIcon />
            </Button>
          </Grid>
        </CardActions>
      )}
    </SubCardStyled>
  );
};

export default AppointmentsCard;
