import React, { PropsWithChildren, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Main } from '@components/Appointments/AppointmentsContent';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import PatientAlertView from '@components/Patients/PatientAlertView';
import PatientHighlightsView from '@components/Patients/PatientHighlightsView';
import { Translation } from 'constants/translations';
import getPatientName from 'helpers/getPatientName';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';
import { margins } from 'themes/themeConstants';

const EncountersLayout = ({ children }: PropsWithChildren) => {
  const [t] = useTranslation();
  const router = useRouter();
  const currentPatientId = useAppSelector(patientsSelector.currentPatientId);
  const patientProfile = useAppSelector(patientsSelector.patientProfile);

  useEffect(() => {
    if (!currentPatientId && router.query.id) {
      dispatch(patientsMiddleware.setCurrentPatient(router.query.id as string));
    }
  }, [currentPatientId, router.query.id]);

  const patientFullName = getPatientName(patientProfile?.title as string);

  return (
    <>
      <MainBreadcrumb
        currentPage={patientFullName}
        navigation={{
          basePath: '/',
          items: [
            { name: t(Translation.PAGE_PATIENT_LIST_TITLE), path: '/patient-emr/list' },
            {
              name: patientFullName,
              path: `/patient-emr/details/${currentPatientId}`
            },
            {
              name: t(Translation.PAGE_ENCOUNTERS_LIST_TITLE),
              path: `/patient-emr/details/${currentPatientId}/encounters`
            }
          ]
        }}
      />
      <br />
      <PatientAlertView />
      <PatientHighlightsView />
      <br />
      <Main sx={{ marginTop: margins.top0 }}>{children}</Main>
    </>
  );
};

export default EncountersLayout;
