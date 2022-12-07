import React from 'react';
import { useTranslation } from 'react-i18next';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import SpecimenCollectionHeader from '@components/SpecimenCollection/SpecimenCollectionHeader';
import { Paper, Stack } from '@mui/material';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import dynamic from 'next/dynamic';
import { margins, paddings } from 'themes/themeConstants';

const SpecimenCollectionCalendar = dynamic(() => import('@components/SpecimenCollection/SpecimenCollectionCalendar'));

const SpecimenCollection = () => {
  const [t] = useTranslation();

  return (
    <Stack gap={margins.all16}>
      <MainBreadcrumb
        data-cy={CypressIds.PAGE_SPECIMEN_COLLECTION_TITLE}
        currentPage={t(Translation.PAGE_SPECIMEN_COLLECTION_TITLE)}
        navigation={{
          basePath: '/',
          items: [
            {
              name: `${t(Translation.PAGE_SPECIMEN_COLLECTION_TITLE)}`,
              path: 'clinic-test-results/specimen-collection'
            }
          ]
        }}
      />
      <Paper elevation={0}>
        <Stack px={paddings.all24} py={paddings.all12} gap={8}>
          <SpecimenCollectionHeader />
        </Stack>
        <Stack px={paddings.all24}>
          <SpecimenCollectionCalendar />
        </Stack>
      </Paper>
    </Stack>
  );
};

export default SpecimenCollection;
