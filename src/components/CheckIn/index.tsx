import React, { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AppointmentsTableField from '@components/CheckIn/AppointmentsTableField';
import { checkInFormValues, ICheckInFormValues } from '@components/CheckIn/formValues';
import PatientAlertView from '@components/CheckIn/PatientAlert';
import PatientField from '@components/Modals/Tasks/form/fields/Patient';
import { PatientListStyled } from '@components/Patients/PatientListStyled';
import { Box, Grid } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { bookingMiddleware, bookingSelector } from '@redux/slices/booking';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { AlertStatus, ProfilePhotoStatus } from 'types/reduxTypes/patient-emrStateTypes';

import { margins } from '../../themes/themeConstants';

import PatientProfile from './PatientProfile';

const CheckIn = () => {
  const appointments = useAppSelector(bookingSelector.checkInAppointmentsList);
  const isAppointmentsLoading = useAppSelector(bookingSelector.isCheckInAppointmentsLoading);
  const isCheckInLoading = useAppSelector(bookingSelector.isCheckInLoading);
  const isRefreshCheckInAppointments = useAppSelector(bookingSelector.isRefreshCheckInAppointments);
  const patientProfile = useAppSelector(patientsSelector.patientProfile);
  const patientsList = useAppSelector(patientsSelector.patientsList);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [isCheckInButtonDisabled, setIsCheckInButtonDisabled] = useState(true);
  const [isCheckInButtonVisible, setIsCheckInButtonVisible] = useState(true);
  const [t] = useTranslation();
  const isIntakeWarningVisible = useMemo(
    () => isTableVisible && patientProfile && !patientProfile?.isIntakeComplete,
    [isTableVisible, patientProfile]
  );
  const isPhotoMissingWarningVisible = useMemo(
    () => isTableVisible && patientProfile && patientProfile?.avatar?.status === ProfilePhotoStatus.Missing,
    [isTableVisible, patientProfile]
  );
  const isVerificationWarningVisible = useMemo(
    () => isTableVisible && patientProfile?.avatar?.status === ProfilePhotoStatus.Pending,
    [isTableVisible, patientProfile?.avatar?.status]
  );
  const isNoResultsFound = useMemo(
    () => !isAppointmentsLoading && !appointments.length,
    [appointments, isAppointmentsLoading]
  );

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
        dispatch(patientsMiddleware.getPatientProfile(patient));
        dispatch(patientsMiddleware.getPatientHighlight(patient));
        dispatch(patientsMiddleware.setCurrentPatient(patient));
        dispatch(bookingMiddleware.getCheckInAppointments(patient));
        dispatch(patientsMiddleware.getPatientProfile(patient));
        setIsTableVisible(true);
      }

      if (!patient) {
        dispatch(patientsMiddleware.emptyPatientProfile());
        setIsTableVisible(false);
      }

      if (!checkInAppointments?.length) {
        setIsCheckInButtonDisabled(true);
      } else {
        setIsCheckInButtonDisabled(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, isRefreshCheckInAppointments]);

  useEffect(() => {
    const { patient } = watch();

    if (isRefreshCheckInAppointments) {
      dispatch(patientsMiddleware.getPatientProfile(patient));
      dispatch(patientsMiddleware.getPatientHighlight(patient));
      dispatch(patientsMiddleware.setCurrentPatient(patient));
      dispatch(bookingMiddleware.getCheckInAppointments(patient));
      dispatch(patientsMiddleware.getPatientProfile(patient));
      dispatch(bookingMiddleware.refreshCheckInAppointments(false));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefreshCheckInAppointments]);

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
    setIsCheckInButtonVisible(appointments.some((item) => item.checkInAllowed) && !isIntakeWarningVisible);
  }, [appointments, isIntakeWarningVisible]);

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
            <Grid xs={12} sx={{ mt: margins.top24 }}>
              {isIntakeWarningVisible ? <PatientAlertView alert={AlertStatus.Intake} /> : null}
              {isVerificationWarningVisible ? <PatientAlertView alert={AlertStatus.Verification} /> : null}
              {isPhotoMissingWarningVisible ? <PatientAlertView alert={AlertStatus.PhotoMissing} /> : null}
            </Grid>

            {isTableVisible ? (
              <>
                <PatientProfile />
                <AppointmentsTableField
                  isAppointmentsLoading={isAppointmentsLoading}
                  isCheckInButtonDisabled={isCheckInButtonDisabled}
                  isCheckInButtonVisible={isCheckInButtonVisible}
                  isCheckInLoading={isCheckInLoading}
                  isNoResultsFound={isNoResultsFound}
                />
              </>
            ) : null}
          </form>
        </FormProvider>
      </Box>
    </PatientListStyled>
  );
};

export default CheckIn;
