import React, { useCallback, useEffect } from 'react';
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
import { usePatientProfileNavigatorContext } from 'context/PatientProfileNavigatorContext';
import { PatientProfilePageName } from 'context/types/PatientProfileNavigatorContextTypes';
import { timeAdjuster } from 'helpers/timeAdjuster';
import { viewsMiddleware } from 'redux/slices/views';
import { ModalName } from 'types/modals';
import { AppointmentType } from 'types/patientProfile';

import SubCardStyled from '@ui-component/cards/SubCardStyled';

interface Props {
  appointmentType: AppointmentType;
}

const AppointmentsCard = ({ appointmentType }: Props) => {
  const [t] = useTranslation();
  const theme = useTheme();
  const { navigateTo } = usePatientProfileNavigatorContext();

  const { list } = useAppSelector(patientsSelector.patientAppointments);
  const { appointments: appointmentsList } = list;

  useEffect(() => {
    if (appointmentsList === null) {
      dispatch(patientsMiddleware.getInitialPatientAppointments());
    }
  }, [appointmentsList]);

  const currentAppointmentType =
    appointmentType === AppointmentType.Upcoming
      ? t(Translation.PAGE_PATIENT_PROFILE_UPCOMING_APPOINTMENTS)
      : t(Translation.PAGE_PATIENT_PROFILE_PAST_APPOINTMENTS);

  const onViewAllClick = () => {
    navigateTo(PatientProfilePageName.AppointmentsList);
    dispatch(patientsMiddleware.setCurrentAppointmentType(currentAppointmentType));
  };

  const onOpenAppointmentsModalAdd = useCallback(() => {
    dispatch(viewsMiddleware.openModal({ name: ModalName.AddPatientAppointmentsModal, props: {} }));
  }, []);

  return (
    <SubCardStyled
      title={currentAppointmentType}
      secondary={
        appointmentType === AppointmentType.Upcoming && (
          <IconButton>
            <AddIcon onClick={onOpenAppointmentsModalAdd} />
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
