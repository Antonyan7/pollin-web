import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowBackIos } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';

import { ListHeaderProps } from '../types';

const ListHeader: React.FC<ListHeaderProps> = ({ isInHouseTest }) => {
  const [t] = useTranslation();
  const router = useRouter();

  const inputResultsBackToPageLabel = isInHouseTest
    ? t(Translation.PAGE_IN_HOUSE_RESULTS_BACK_TO_IN_HOUSE_TESTS)
    : t(Translation.PAGE_INPUT_RESULTS_BACK_TO_EXTERNAL_RESULTS);

  const handleBackToPreviousPage = () => router.back();

  return (
    <Box component="span" display="flex" alignItems="center">
      <IconButton color="primary" onClick={handleBackToPreviousPage}>
        <ArrowBackIos fontSize="small" />
      </IconButton>
      <Typography variant="h4" fontWeight={500}>
        {inputResultsBackToPageLabel}
      </Typography>
    </Box>
  );
};

export default ListHeader;
