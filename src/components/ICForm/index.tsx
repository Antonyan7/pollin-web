import React, { useEffect } from 'react';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { useRouter } from 'next/router';
import { margins } from 'themes/themeConstants';
import { SexAtBirth } from 'types/reduxTypes/patient-emrStateTypes';

import SubCardStyled from '@ui-component/cards/SubCardStyled';
import CircularLoading from '@ui-component/circular-loading';

import ICFormHeader from './components/common/ICFormHeader';
import MaleICForm from './MaleICForm';

const InitialConsultationForm = () => {
  const { query } = useRouter();
  const patientProfile = useAppSelector(patientsSelector.patientProfile);
  const isIcFormLoading = useAppSelector(patientsSelector.isIcFormLoading);
  const sexAtBirth = patientProfile?.sexAtBirth;

  useEffect(() => {
    if (typeof query.id === 'string') {
      dispatch(patientsMiddleware.getPatientHighlight(query.id));
    }
  }, [query.id]);

  if (isIcFormLoading) {
    return <CircularLoading />;
  }

  return (
    <SubCardStyled
      cardContent
      sx={{
        mt: margins.top20
      }}
      title={<ICFormHeader />}
    >
      {sexAtBirth === SexAtBirth.Male && <MaleICForm />}
      {sexAtBirth === SexAtBirth.Female && <div>Implement Female</div>}
    </SubCardStyled>
  );
};

export default InitialConsultationForm;
