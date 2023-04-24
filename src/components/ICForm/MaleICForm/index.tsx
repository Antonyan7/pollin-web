import React from 'react';
import BackButton from '@components/ICForm/components/common/BackButton';
import ICFormWrapper from '@components/ICForm/components/common/ICFormWrapper';
import ViewMaleICForm from '@components/ICForm/MaleICForm/view';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';

const MaleICForm = () => {
  const isPatientHighlightIntakeComplete = useAppSelector(patientsSelector.isPatientHighlightIntakeComplete);
  const isICFormComplete = useAppSelector(patientsSelector.isICFormComplete);
  const showEditState = isPatientHighlightIntakeComplete && !isICFormComplete;

  return (
    <ICFormWrapper>
      {showEditState ? <Grid>Edit</Grid> : <ViewMaleICForm />}
      <BackButton />
    </ICFormWrapper>
  );
};

export default MaleICForm;
