import React from 'react';
import { useTranslation } from 'react-i18next';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import { Box } from '@mui/material';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';

import AddEncounterNote from '@ui-component/encounters/AddEncounterNote';

const CreateEncounter = () => {
  const [t] = useTranslation();
  const router = useRouter();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <MainBreadcrumb
        currentPage={t(Translation.PAGE_ENCOUNTERS_CREATE_ENCOUNTER)}
        navigation={{
          basePath: '/',
          items: [
            {
              name: t(Translation.PAGE_ENCOUNTERS_CREATE_ENCOUNTER),
              path: `/patient-emr/create-encounter/${router.query.id}`
            }
          ]
        }}
      />
      <AddEncounterNote />
    </Box>
  );
};

export default CreateEncounter;
