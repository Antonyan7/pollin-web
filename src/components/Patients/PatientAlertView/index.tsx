import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { Button, Grid, Stack, Tooltip, tooltipClasses, TooltipProps, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';
import { borderRadius, margins, paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';
import { AlertDetailsMessagesProps, AlertDetailsProps } from 'types/reduxTypes/patient-emrStateTypes';

const PatientAlertView = () => {
  const router = useRouter();
  const rowId = router.query.id as string;
  const theme = useTheme();
  const patientAlertDetails = useAppSelector(patientsSelector.patientAlertDetails);
  const isPatientAlertViewOpen = useAppSelector(patientsSelector.isPatientAlertViewOpen);
  const [t] = useTranslation();
  const patientCustomAlerts = patientAlertDetails.filter((alert) => alert.id);

  useEffect(() => {
    if (rowId) {
      dispatch(patientsMiddleware.getPatientAlertDetails(rowId));
    }
  }, [rowId]);

  const MuiTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.primary.main,
      fontSize: theme.typography.pxToRem(12),
      padding: paddings.all12
    }
  }));

  return (
    <Stack
      width="100%"
      mb={margins.bottom16}
      bgcolor={theme.palette.warning.light}
      px={paddings.leftRight24}
      py={paddings.topBottom12}
      borderRadius={borderRadius.radius16}
    >
      {patientAlertDetails?.length && isPatientAlertViewOpen ? (
        <>
          {patientAlertDetails.map((titleContent: AlertDetailsProps, index) => (
            <Grid container>
              <MuiTooltip
                followCursor
                title={
                  titleContent.id ? (
                    <>
                      {titleContent?.createdBy?.name} - {titleContent?.createdBy?.date}
                    </>
                  ) : null
                }
              >
                <Grid item container alignItems="center" justifyContent="center">
                  <Grid item xs={0.5}>
                    <ReportGmailerrorredIcon sx={{ color: theme.palette.warning.dark }} />
                  </Grid>
                  <Grid item xs={10.5}>
                    <Typography fontWeight={500} variant="subtitle1">
                      {titleContent.title}
                    </Typography>
                    {titleContent.messages.map((message: AlertDetailsMessagesProps) => (
                      <Typography variant="subtitle2" color={theme.palette.common.black} marginBottom={margins.bottom8}>
                        {message.title}
                      </Typography>
                    ))}
                  </Grid>
                  <Grid item xs={0.5} container alignItems="center" justifyContent="center">
                    {patientAlertDetails[index].isEditable ? (
                      <Button
                        sx={{ color: theme.palette.warning.dark, mr: margins.right32 }}
                        variant="text"
                        onClick={() => {
                          dispatch(
                            viewsMiddleware.openModal({
                              name: ModalName.AddOrEditCustomAlertModal,
                              props: {
                                alertId: titleContent.id,
                                title: titleContent.title,
                                description: titleContent.messages[0].title
                              }
                            })
                          );
                        }}
                      >
                        <Typography variant="subtitle2" color={theme.palette.warning.dark}>
                          {t(Translation.COMMON_BUTTON_EDIT_LABEL)}
                        </Typography>
                      </Button>
                    ) : null}
                  </Grid>
                  <Grid item xs={0.5} container alignItems="center" justifyContent="center">
                    {index === 0 ? (
                      <Button
                        sx={{ color: theme.palette.warning.dark }}
                        onClick={() => dispatch(patientsMiddleware.isPatientAlertViewOpen(false))}
                      >
                        <CloseIcon sx={{ fontSize: theme.typography.pxToRem(20) }} />
                      </Button>
                    ) : null}
                  </Grid>
                </Grid>
              </MuiTooltip>
            </Grid>
          ))}
        </>
      ) : null}

      {patientCustomAlerts.length < 10 ? (
        <Stack direction="row" alignItems="center" justifyContent="center" color={theme.palette.warning.dark} gap={1}>
          <Button
            sx={{
              color: theme.palette.warning.dark
            }}
            size="small"
            onClick={() => {
              dispatch(
                viewsMiddleware.openModal({
                  name: ModalName.AddOrEditCustomAlertModal,
                  props: {}
                })
              );
            }}
          >
            <Stack flexBasis={24}>
              <AddIcon />
            </Stack>
            <Typography color={theme.palette.warning.dark}>{t(Translation.PAGE_PATIENT_ALERT_ADD)}</Typography>
          </Button>
        </Stack>
      ) : null}
    </Stack>
  );
};

export default PatientAlertView;
