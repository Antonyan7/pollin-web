import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowForwardIos } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';

import WidgetLayout from './Layout';

const PartnerProfileOverview = () => {
  const currentPatientId = useAppSelector(patientsSelector.currentPatientId);
  const profileTestResults = useAppSelector(patientsSelector.profileTestResults);
  const isPatientProfileOverviewLoading = useAppSelector(patientsSelector.isPatientProfileOverviewLoading);
  const [t] = useTranslation();
  const router = useRouter();

  useEffect(() => {
    if (!profileTestResults && currentPatientId) {
      dispatch(patientsMiddleware.getProfileTestResults(currentPatientId));
    }
  }, [currentPatientId, profileTestResults]);

  const goToPartnerProfile = (patientId: string) => {
    if (patientId) {
      const partnerProfileURL = router.pathname.replace('[id]', patientId);

      dispatch(patientsMiddleware.setCurrentPatient(patientId));
      router.push(partnerProfileURL);
    }
  };

  const isProfilePartnersInformationAvailable =
    Array.isArray(profileTestResults?.partners) &&
    profileTestResults?.partners?.length &&
    !isPatientProfileOverviewLoading;

  return (
    <Box display="flex" flexDirection="column" rowGap={3}>
      {isProfilePartnersInformationAvailable ? (
        profileTestResults?.partners?.map((partner) => {
          const { profile, patientId, ...partnerData } = partner;

          return (
            <WidgetLayout
              key={patientId}
              data={partnerData}
              profile={profile}
              secondary={
                <IconButton onClick={() => goToPartnerProfile(patientId)}>
                  <ArrowForwardIos fontSize="small" color="primary" />
                </IconButton>
              }
            />
          );
        })
      ) : (
        <WidgetLayout
          loading={isPatientProfileOverviewLoading}
          emptyWidgetTitle={t(Translation.PAGE_PATIENT_WIDGET_PROFILE_PARTNERS_TITLE)}
        />
      )}
    </Box>
  );
};

export default PartnerProfileOverview;
