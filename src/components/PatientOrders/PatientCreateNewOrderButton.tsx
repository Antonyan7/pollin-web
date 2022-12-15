import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledButtonNew } from '@components/Appointments/CommonMaterialComponents';
import AddIcon from '@mui/icons-material/Add';
import { Typography, useTheme } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';

const CreateNewOrderButton = () => {
  const theme = useTheme();
  const [t] = useTranslation();
  const router = useRouter();
  const currentPatientId = useAppSelector(patientsSelector.currentPatientId);

  const onCreateNewOrderButtonClick = () => {
    router.push(`/patient-emr/details/${currentPatientId}/orders/create`);
  };

  return (
    <StyledButtonNew
      fullWidth
      theme={theme}
      variant="contained"
      endIcon={<AddIcon />}
      onClick={onCreateNewOrderButtonClick}
    >
      <Typography color={theme.palette.common.white} variant="h4">
        {t(Translation.PAGE_PATIENT_PROFILE_CRETAE_NEW_ORDER)}
      </Typography>
    </StyledButtonNew>
  );
};

export default CreateNewOrderButton;
