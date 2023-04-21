import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import API from '@axios/API';
import patientEmrHelpers from '@axios/patientEmr/patientEmrHelpers';
import StyledTooltip from '@components/PatientProfile/StyledTooltip';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Avatar, Box, Button, ButtonProps, Grid, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { IconBell } from '@tabler/icons';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { borders, margins, paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';
import { ProfilePhotoStatus } from 'types/reduxTypes/patient-emrStateTypes';

import AssignmentIcon from '@assets/icons/AssignmentIcon';
import DoctorIcon from '@assets/icons/DoctorIcon';
import { useFlags } from '@hooks/useFlagsHook';
import { isDashValue } from '@utils/stringUtils';

interface ContactListProps {
  setOpen: (open: boolean) => void;
  open: boolean;
}

const disabledButtonStyled = {
  '&[disabled]': {
    opacity: 0.5
  }
};

const ICButton = ({ buttonLabel }: { buttonLabel: string }) => {
  const theme = useTheme();
  const router = useRouter();
  const navigateToICForm = () => {
    router.push(`/patient-emr/details/${router.query.id}/ic-form`);
  };

  return (
    <Button
      onClick={navigateToICForm}
      variant="contained"
      sx={{
        width: 250,
        height: 32,
        margin: margins.all8,
        borderRadius: `${borders.solid2px} ${theme.palette.primary.main}`
      }}
    >
      {buttonLabel}
    </Button>
  );
};

const ICFormButton = () => {
  const [t] = useTranslation();
  const isPatientHighlightIntakeComplete = useAppSelector(patientsSelector.isPatientHighlightIntakeComplete);
  const isICFormComplete = useAppSelector(patientsSelector.isICFormComplete);
  const disableOnlyMedicalBackgroundButton = isPatientHighlightIntakeComplete && !isICFormComplete;
  const enableICAndMedicalBackgroundButtons = isPatientHighlightIntakeComplete && isICFormComplete;
  const viewICFormLabel = t(Translation.PAGE_PATIENT_PROFILE_VIEW_INITIAL_CONSULTATION_FORM);
  const completeICFormLabel = t(Translation.PAGE_PATIENT_PROFILE_COMPLETE_INITIAL_CONSULTATION_FORM);

  return (
    <>
      {disableOnlyMedicalBackgroundButton ? <ICButton buttonLabel={completeICFormLabel} /> : null}
      {enableICAndMedicalBackgroundButtons ? <ICButton buttonLabel={viewICFormLabel} /> : null}
    </>
  );
};

// eslint-disable-next-line max-lines-per-function
const ContactList = ({ setOpen, open }: ContactListProps) => {
  const theme = useTheme();
  const router = useRouter();
  const [t] = useTranslation();
  const { DOMAIN_MEDICAL_BACKGROUND } = useFlags();
  const patientId = useAppSelector(patientsSelector.currentPatientId);
  const patientHighlightHeader = useAppSelector(patientsSelector.patientHighlightHeader);
  const isPatientHighlightIntakeComplete = useAppSelector(patientsSelector.isPatientHighlightIntakeComplete);
  // const isICFormComplete = useAppSelector(patientsSelector.isICFormComplete);
  const isICFormComplete = true; // TODO till data will come from backend side
  const isPatientHighlightIntakeReminderActive = useAppSelector(
    patientsSelector.isPatientHighlightIntakeReminderActive
  );
  const patientProfile = useAppSelector(patientsSelector.patientProfile);
  const disableOnlyMedicalBackgroundButton = isPatientHighlightIntakeComplete && !isICFormComplete;
  const avatarPlaceholder = '/assets/images/users';

  const avatarProfile = useMemo(() => {
    if (patientProfile && patientProfile?.avatar?.status === ProfilePhotoStatus.Verified) {
      return patientProfile.avatar?.imageURL;
    }

    return avatarPlaceholder;
  }, [patientProfile]);

  const handleAvatarClick = useCallback(() => {
    dispatch(
      viewsMiddleware.openModal({
        name: ModalName.ImageModal,
        props: {
          imgSrc: avatarProfile,
          alt: patientProfile?.fullName
        }
      })
    );
  }, [avatarProfile, patientProfile]);

  const onButtonClick =
    (uuid: string): ButtonProps['onClick'] =>
    async () => {
      const patientHighlightDetails = await API.patients.getPatientHighlightDetails(patientId, uuid);

      if (patientHighlightDetails) {
        const modalParams = patientEmrHelpers.getModalParamsFromPatientHighlightDetails(patientHighlightDetails);

        dispatch(viewsMiddleware.openModal(modalParams));
      }
    };

  const patientName =
    patientProfile &&
    `${patientProfile?.fullName} ${
      isDashValue(patientProfile?.pronoun as string) ? '' : `(${patientProfile?.pronoun})`
    }  - ${patientProfile?.identifier}`;

  const onSendIntakeButtonClick = () => {
    dispatch(patientsMiddleware.sendPatientIntakeReminder(patientId));
  };

  const navigateToMedicalBackground = () => {
    router.push(`/patient-emr/details/${router.query.id}/medical-background`);
  };
  const completeICFormLabel = t(Translation.PAGE_PATIENT_PROFILE_COMPLETE_INITIAL_CONSULTATION_FORM);

  return (
    <Box py={paddings.topBottom16} borderBottom={`1px solid ${theme.palette.grey[100]}!important`}>
      <Grid container alignItems="center">
        <Grid item xs={12} sm={6} style={{ cursor: 'pointer' }}>
          <Grid container alignItems="center" sx={{ flexWrap: 'nowrap' }}>
            <Grid item onClick={handleAvatarClick}>
              <Avatar
                alt={patientProfile?.fullName}
                src={avatarProfile}
                sx={{ width: 60, height: 60, m: margins.all24 }}
              />
            </Grid>
            <Grid item sm zeroMinWidth>
              <Grid container spacing={0}>
                <Grid item xs={8}>
                  <Typography variant="h4" component="div">
                    {patientName}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="outlined" disabled sx={{ borderRadius: '60px', height: 23 }}>
                    {patientProfile?.cycleStatus ? 'Active' : 'Not Active'}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption">{patientProfile?.subTitle}</Typography>
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
                      sx={disabledButtonStyled}
                    >
                      <Typography
                        variant="body2"
                        fontWeight={500}
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
                      sx={disabledButtonStyled}
                    >
                      <Typography
                        variant="body2"
                        fontWeight={500}
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
                      disabled={!patientHighlightHeader.doctor.uiid || !patientProfile?.isIntakeComplete}
                      onClick={onButtonClick(patientHighlightHeader.doctor.uiid)}
                      sx={disabledButtonStyled}
                    >
                      <Typography
                        variant="body2"
                        fontWeight={500}
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
            sx={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              [theme.breakpoints.down('md')]: { justifyContent: 'flex-start' }
            }}
          >
            <Grid item>
              {!isPatientHighlightIntakeComplete ? (
                <StyledTooltip
                  placement="bottom"
                  title={t(Translation.PAGE_PATIENT_PROFILE_INITIAL_CONSULTATION_FORM_ACCESSED)}
                >
                  <span>
                    <Button
                      variant="outlined"
                      disabled
                      sx={{
                        width: 250,
                        height: 32,
                        margin: margins.all8,
                        borderRadius: `${borders.solid2px} ${theme.palette.primary.main}`
                      }}
                    >
                      {completeICFormLabel}
                    </Button>
                  </span>
                </StyledTooltip>
              ) : (
                <ICFormButton />
              )}
            </Grid>
            {isPatientHighlightIntakeComplete ? (
              <Grid item>
                {DOMAIN_MEDICAL_BACKGROUND ? (
                  <Button
                    onClick={navigateToMedicalBackground}
                    variant="outlined"
                    disabled={disableOnlyMedicalBackgroundButton}
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
