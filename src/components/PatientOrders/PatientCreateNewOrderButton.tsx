import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledButtonNew } from '@components/Appointments/CommonMaterialComponents';
import AddIcon from '@mui/icons-material/Add';
import { Typography, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';

const CreateNewOrderButton = () => {
  const theme = useTheme();
  const [t] = useTranslation();

  return (
    <StyledButtonNew fullWidth theme={theme} variant="contained" endIcon={<AddIcon />}>
      <Typography color={theme.palette.common.white} variant="h4">
        {t(Translation.PAGE_PATIENT_PROFILE_CRETAE_NEW_ORDER)}
      </Typography>
    </StyledButtonNew>
  );
};

export default CreateNewOrderButton;
