import React from 'react';
import { useTranslation } from 'react-i18next';
import API from '@axios/API';
import patientEmrHelpers from '@axios/patientEmr/patinerEmrHelpers';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import { Avatar, Box, Button, ButtonProps, Grid, Stack, Typography, useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { CypressIds } from 'constants/cypressIds';
import { format } from 'date-fns';
import { borderRadius, borders, margins, paddings } from 'themes/themeConstants';

import AssignmentIcon from '@assets/icons/AssignmentIcon';
import DoctorIcon from '@assets/icons/DoctorIcon';
import CircularLoading from '@ui-component/circular-loading';
import { convertTZ } from '@utils/dateUtils';

import { Translation } from '../../constants/translations';
import { UTC_TIMEZONE } from '../../helpers/constants';

const PatientProfile = () => {
  const theme = useTheme();
  const [t] = useTranslation();
  const patientId = useAppSelector(patientsSelector.currentPatientId);
  const patientHighlightHeader = useAppSelector(patientsSelector.patientHighlightHeader);
  const patientProfile = useAppSelector(patientsSelector.patientProfile);
  const isPatientProfileLoading = useAppSelector(patientsSelector.isPatientProfileLoading);

  const onButtonClick =
    (uuid: string): ButtonProps['onClick'] =>
    async () => {
      const patientHighlightDetails = await API.patients.getPatientHighlightDetails(patientId, uuid);

      if (patientHighlightDetails) {
        const modalParams = patientEmrHelpers.getModalParamsFromPatientHighlightDetails(patientHighlightDetails);

        dispatch(viewsMiddleware.openModal(modalParams));
      }
    };

  const isUiidExists = patientHighlightHeader.doctor.uiid;
  const iconCommonColor = isUiidExists ? theme.palette.primary[800] : theme.palette.primary[200];

  const getDateOfBirth = (date: string) => {
    if (!patientProfile) {
      return '';
    }

    const isDateValid = !Number.isNaN(Date.parse(date));

    if (patientProfile.isIntakeComplete && isDateValid) {
      const dateOfBirth = convertTZ(date, UTC_TIMEZONE) as Date;
      const patientAge = new Date().getFullYear() - dateOfBirth.getFullYear();

      return `${t(Translation.PAGE_PATIENT_CHECK_IN_PATIENT_PROFILE_DOB_PREFIX)} - ${patientAge} ${t(
        Translation.PAGE_PATIENT_CHECK_IN_VERIFY_MODAL_YEARS
      )} (${format(dateOfBirth, 'MMM dd, yyyy')})`;
    }

    return patientProfile.subTitle;
  };

  if (isPatientProfileLoading) {
    return <CircularLoading />;
  }

  return patientProfile ? (
    <Box
      sx={{
        border: `1px solid ${theme.palette.primary.light}`,
        borderRadius: borderRadius.radius10,
        marginBottom: margins.bottom16
      }}
    >
      <Box py={paddings.topBottom16} borderBottom={`${borders.solid1px} ${theme.palette.grey[100]}!important`}>
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <Grid container alignItems="center" flexWrap="nowrap">
              <Grid item>
                <Avatar
                  alt={patientProfile.title}
                  src={patientProfile?.avatar?.imageURL}
                  sx={{ width: 60, height: 60, m: margins.all24 }}
                />
              </Grid>
              <Grid item sm zeroMinWidth>
                <Grid container spacing={0}>
                  <Grid container item xs={10} direction="row" alignItems="center" columnGap={2}>
                    <Typography variant="h4" component="div">
                      {patientProfile.title}
                    </Typography>
                    <Button variant="outlined" disabled sx={{ borderRadius: '60px', height: 23 }}>
                      {/* TODO: remove hardcoded value change logic here after cyclestatus solution */}
                      NotActive
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="caption">{getDateOfBirth(patientProfile?.dateOfBirth as string)}</Typography>
                  </Grid>
                  <Stack gap={2} direction="row" justifyContent="center" alignItems="center" flexWrap="wrap">
                    <Stack flexShrink={0}>
                      <Button
                        startIcon={
                          <CallOutlinedIcon
                            sx={{
                              color: iconCommonColor
                            }}
                          />
                        }
                        data-cy={CypressIds.PAGE_PATIENT_DETAILS_PROFILE_CONTACT_INFO}
                        disabled={!patientHighlightHeader.contact.uiid}
                        onClick={onButtonClick(patientHighlightHeader.contact.uiid)}
                      >
                        <Typography variant="body2" fontWeight="bold" color={iconCommonColor}>
                          {patientHighlightHeader.contact.title}
                        </Typography>
                      </Button>
                    </Stack>
                    <Stack flexShrink={0}>
                      <Button
                        startIcon={
                          <AssignmentIcon
                            sx={{
                              color: iconCommonColor
                            }}
                          />
                        }
                        disabled={!patientHighlightHeader.ohip.uiid}
                        onClick={onButtonClick(patientHighlightHeader.ohip.uiid)}
                        data-cy={CypressIds.PAGE_PATIENT_DETAILS_PROFILE_OHIP_INFO}
                      >
                        <Typography variant="body2" fontWeight="bold" color={iconCommonColor}>
                          {patientHighlightHeader.ohip.title}
                        </Typography>
                      </Button>
                    </Stack>
                    <Stack flexShrink={0}>
                      <Button
                        startIcon={
                          <DoctorIcon
                            sx={{
                              color: iconCommonColor
                            }}
                          />
                        }
                        disabled={!isUiidExists || !patientProfile.isIntakeComplete}
                        onClick={onButtonClick(isUiidExists)}
                        data-cy={CypressIds.PAGE_PATIENT_DETAILS_PROFILE_DOCTOR_INFO}
                      >
                        <Typography variant="body2" fontWeight="bold" color={iconCommonColor}>
                          {patientHighlightHeader.doctor.title}
                        </Typography>
                      </Button>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  ) : null;
};

export default PatientProfile;
