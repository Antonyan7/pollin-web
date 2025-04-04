import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowBackIos } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { format } from 'util';

const MedicalBackgroundHeader = () => {
  const [t] = useTranslation();
  const router = useRouter();
  const patientProfile = useAppSelector(patientsSelector.patientProfile);

  const medicalBackgroundBackToPageLabel = format(
    t(Translation.PAGE_CREATE_ORDER_HEADER_TEXT),
    patientProfile?.fullName
  );

  const handleBackToProfilePage = () => router.push(`/patient-emr/details/${router.query.id}/profile`);

  return (
    <Box component="span" display="flex" alignItems="center">
      <IconButton color="primary" onClick={handleBackToProfilePage}>
        <ArrowBackIos fontSize="small" />
      </IconButton>
      <Typography variant="h4" fontWeight={500}>
        {medicalBackgroundBackToPageLabel}
      </Typography>
    </Box>
  );
};

export default MedicalBackgroundHeader;
