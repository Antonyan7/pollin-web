import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import API from '@axios/API';
import patientEmrHelpers from '@axios/patientEmr/patinerEmrHelpers';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Avatar, Box, Button, ButtonProps, Grid, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { IconBell } from '@tabler/icons';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { borders, margins, paddings } from 'themes/themeConstants';

import AssignmentIcon from '@assets/icons/AssignmentIcon';
import DoctorIcon from '@assets/icons/DoctorIcon';
import { useFlags } from '@hooks/useFlagsHook';

const avatarImage = '/assets/images/users';

interface ContactListProps {
  avatar?: string;
  name?: string;
  date?: string;
  cycleStatus?: string | boolean;
  setOpen: (open: boolean) => void;
  open: boolean;
}

// eslint-disable-next-line max-lines-per-function
const ContactList = ({ avatar, name, date, cycleStatus, setOpen, open }: ContactListProps) => {
  const theme = useTheme();
  const router = useRouter();
  const [t] = useTranslation();
  const { DOMAIN_MEDICAL_BACKGROUND } = useFlags();
  const avatarProfile = avatar && `${avatarImage}/${avatar}`;
  const patientId = useSelector(patientsSelector.currentPatientId);
  const patientHighlightHeader = useSelector(patientsSelector.patientHighlightHeader);
  const isPatientHighlightIntakeComplete = useSelector(patientsSelector.isPatientHighlightIntakeComplete);
  const isPatientHighlightIntakeReminderActive = useSelector(patientsSelector.isPatientHighlightIntakeReminderActive);
  const onButtonClick =
    (uuid: string): ButtonProps['onClick'] =>
    async () => {
      const patientHighlightDetails = await API.patients.getPatientHighlightDetails(patientId, uuid);

      if (patientHighlightDetails) {
        const modalParams = patientEmrHelpers.getModalParamsFromPatientHighlightDetails(patientHighlightDetails);

        dispatch(viewsMiddleware.openModal(modalParams));
      }
    };

  const onSendIntakeButtonClick = () => {
    dispatch(
      patientsMiddleware.sendPatientIntakeReminder(
        patientId,
        t(Translation.MODAL_EXTERNAL_RESULTS_PATIENT_SENT_REMINDER_MESSAGE_SUCCESS),
        t(Translation.MODAL_EXTERNAL_RESULTS_PATIENT_SENT_REMINDER_MESSAGE_FAIL)
      )
    );
  };

  const navigateToMedicalBackground = () => {
    router.push(`/patient-emr/details/${router.query.id}/medical-background`);
  };

  return (
    <Box py={paddings.topBottom16} borderBottom={`1px solid ${theme.palette.grey[100]}!important`}>
      <Grid container alignItems="center">
        <Grid item xs={12} sm={6} style={{ cursor: 'pointer' }}>
          <Grid container alignItems="center" sx={{ flexWrap: 'nowrap' }}>
            <Grid item>
              <Avatar alt={name} src={avatarProfile} sx={{ width: 60, height: 60, m: margins.all24 }} />
            </Grid>
            <Grid item sm zeroMinWidth>
              <Grid container spacing={0}>
                <Grid item xs={8}>
                  <Typography variant="h4" component="div">
                    {name}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="outlined" disabled sx={{ borderRadius: '60px', height: 23 }}>
                    {cycleStatus ? 'Active' : 'Not Active'}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption">{date}</Typography>
                </Grid>
                <Stack gap={2} direction="row" justifyContent="center" alignItems="center" flexWrap="wrap">
                  <Stack flexShrink={0}>
                    <Button
                      startIcon={
                        <CallOutlinedIcon
                          sx={{
                            color: patientHighlightHeader.doctor.uiid
                              ? theme.palette.primary[800]
                              : theme.palette.primary[200]
                          }}
                        />
                      }
                      disabled={!patientHighlightHeader.contact.uiid}
                      onClick={onButtonClick(patientHighlightHeader.contact.uiid)}
                    >
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        color={
                          patientHighlightHeader.doctor.uiid ? theme.palette.primary[800] : theme.palette.primary[200]
                        }
                      >
                        {patientHighlightHeader.contact.title}
                      </Typography>
                    </Button>
                  </Stack>
                  <Stack flexShrink={0}>
                    <Button
                      startIcon={
                        <AssignmentIcon
                          sx={{
                            color: patientHighlightHeader.doctor.uiid
                              ? theme.palette.primary[800]
                              : theme.palette.primary[200]
                          }}
                        />
                      }
                      disabled={!patientHighlightHeader.ohip.uiid}
                      onClick={onButtonClick(patientHighlightHeader.ohip.uiid)}
                    >
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        color={
                          patientHighlightHeader.doctor.uiid ? theme.palette.primary[800] : theme.palette.primary[200]
                        }
                      >
                        {patientHighlightHeader.ohip.title}
                      </Typography>
                    </Button>
                  </Stack>
                  <Stack flexShrink={0}>
                    <Button
                      startIcon={
                        <DoctorIcon
                          sx={{
                            color: patientHighlightHeader.doctor.uiid
                              ? theme.palette.primary[800]
                              : theme.palette.primary[200]
                          }}
                        />
                      }
                      disabled={!patientHighlightHeader.doctor.uiid}
                      onClick={onButtonClick(patientHighlightHeader.doctor.uiid)}
                    >
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        color={
                          patientHighlightHeader.doctor.uiid ? theme.palette.primary[800] : theme.palette.primary[200]
                        }
                      >
                        {patientHighlightHeader.doctor.title}
                      </Typography>
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid
            container
            spacing={1}
            sx={{ justifyContent: 'flex-end', [theme.breakpoints.down('md')]: { justifyContent: 'flex-start' } }}
          >
            {isPatientHighlightIntakeComplete ? (
              <Grid item>
                {DOMAIN_MEDICAL_BACKGROUND ? (
                  <Button
                    onClick={navigateToMedicalBackground}
                    variant="outlined"
                    sx={{
                      minWidth: 32,
                      height: 32,
                      margin: margins.all8,
                      borderRadius: `${borders.solid2px} ${theme.palette.primary.main}`
                    }}
                  >
                    {t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_TITLE)}
                  </Button>
                ) : null}
                <Tooltip placement="top" title="Message">
                  <Button sx={{ minWidth: 32, height: 32 }} onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
                  </Button>
                </Tooltip>
              </Grid>
            ) : (
              <Grid item>
                <Tooltip
                  placement="bottom-start"
                  componentsProps={{
                    tooltip: {
                      sx: {
                        background: theme.palette.primary.main,
                        color: theme.palette.common.white,
                        padding: paddings.all8
                      }
                    }
                  }}
                  title={
                    !isPatientHighlightIntakeReminderActive
                      ? t(Translation.MODAL_EXTERNAL_RESULTS_PATIENT_SENT_REMINDER_MESSAGE)
                      : ''
                  }
                >
                  <Box component="span">
                    <Button
                      startIcon={
                        <IconBell
                          color={
                            isPatientHighlightIntakeReminderActive
                              ? theme.palette.primary[800]
                              : theme.palette.primary[200]
                          }
                        />
                      }
                      disabled={!isPatientHighlightIntakeReminderActive}
                      onClick={onSendIntakeButtonClick}
                    >
                      <Typography
                        variant="h5"
                        color={
                          isPatientHighlightIntakeReminderActive
                            ? theme.palette.primary[800]
                            : theme.palette.primary[200]
                        }
                      >
                        {t(Translation.MODAL_EXTERNAL_RESULTS_PATIENT_SEND_INTAKE)}
                      </Typography>
                    </Button>
                  </Box>
                </Tooltip>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactList;
