import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { checkInFormValues, ICheckInFormValues } from '@components/CheckIn/formValues';
import PatientField from '@components/Modals/Tasks/form/fields/Patient';
import NoResultsFound from '@components/NoResultsFound';
import { PatientListStyled } from '@components/Patients/PatientListStyled';
import { Box, CircularProgress, Divider, Grid, TableContainer, Typography, useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { bookingMiddleware, bookingSelector } from '@redux/slices/booking';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';

import { ButtonWithLoading } from '@ui-component/common/buttons';

import Table from './CheckInTable';

const CheckIn = () => {
  const theme = useTheme();
  const appointments = useAppSelector(bookingSelector.checkInAppointmentsList);
  const isAppointmentsLoading = useAppSelector(bookingSelector.isCheckInAppointmentsLoading);
  const isCheckInLoading = useAppSelector(bookingSelector.isCheckInLoading);
  const patientsList = useAppSelector(patientsSelector.patientsList);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [isCheckInButtonDisabled, setIsCheckInButtonDisabled] = useState(true);
  const [isCheckInButtonVisible, setIsCheckInButtonVisible] = useState(true);
  const [t] = useTranslation();

  const patientLabel = t(Translation.PAGE_PATIENT_CHECK_IN_PATIENT_LABEL);

  const methods = useForm({
    mode: 'onSubmit',
    defaultValues: checkInFormValues
  });

  const { watch, handleSubmit } = methods;

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      const { patient, checkInAppointments } = value;

      if (patient && name === 'patient') {
        dispatch(bookingMiddleware.getCheckInAppointments(patient));
        setIsTableVisible(true);
      }

      if (!patient) {
        setIsTableVisible(false);
      }

      if (!checkInAppointments?.length) {
        setIsCheckInButtonDisabled(true);
      } else {
        setIsCheckInButtonDisabled(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (values: ICheckInFormValues) => {
    const patientName = patientsList.patients.find((item) => item.id === values.patient)?.name;

    const data = {
      patientId: values.patient,
      appointments: values.checkInAppointments.map((item) => ({
        id: item
      }))
    };

    const message = `${patientName} ${t(Translation.PAGE_PATIENT_CHECK_IN_ALERT_SUCCESS)}`;

    dispatch(bookingMiddleware.checkInAppointment(data, message));
  };

  useEffect(() => {
    setIsCheckInButtonVisible(appointments.some((item) => item.checkInAllowed));
  }, [appointments]);

  const renderTable = () => {
    if (isTableVisible) {
      return (
        <Box sx={{ marginTop: margins.top24 }}>
          <Box
            sx={{
              border: `1px solid ${theme.palette.primary.light}`,
              borderRadius: '10px',
              paddingBottom: isCheckInButtonVisible ? paddings.bottom12 : paddings.bottom0
            }}
          >
            <Grid sx={{ height: '40px' }} container alignItems="center">
              <Grid ml={3} alignItems="center" item>
                <Typography variant="h5">{t(Translation.PAGE_PATIENT_CHECK_IN_APPOINTMENTS_NAME)}</Typography>
              </Grid>
            </Grid>
            <Divider />
            {isAppointmentsLoading ? (
              <Box sx={{ display: 'grid', justifyContent: 'center', alignItems: 'center', marginTop: margins.top16 }}>
                <CircularProgress sx={{ margin: margins.auto }} />
              </Box>
            ) : (
              <TableContainer>
                <Table />
              </TableContainer>
            )}
            {appointments.length === 0 && !isAppointmentsLoading && <NoResultsFound />}
            <Grid justifyContent="flex-end" container>
              <Grid display="flex" justifyContent="center" item xs={2}>
                {isCheckInButtonVisible ? (
                  <ButtonWithLoading
                    isLoading={isCheckInLoading}
                    sx={{
                      mt: margins.top12,
                      py: paddings.topBottom12,
                      px: paddings.leftRight24
                    }}
                    disabled={isCheckInButtonDisabled}
                    color="primary"
                    variant="contained"
                    type="submit"
                  >
                    {t(Translation.COMMON_BUTTON_CONFIRM_LABEL)}
                  </ButtonWithLoading>
                ) : null}
              </Grid>
            </Grid>
          </Box>
        </Box>
      );
    }

    return null;
  };

  return (
    <PatientListStyled>
      <Box sx={{ minHeight: '500px' }}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container justifyContent="center">
              <Grid item xs={6}>
                <PatientField label={patientLabel} />
              </Grid>
            </Grid>
            {renderTable()}
          </form>
        </FormProvider>
      </Box>
    </PatientListStyled>
  );
};

export default CheckIn;
