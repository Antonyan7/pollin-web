import React from 'react';
import { useTranslation } from 'react-i18next';
import { Main } from '@components/Appointments/AppointmentsContent';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import SpecimensInTransportList from '@components/Specimens/SpecimensInTransportList/SpecimensInTransportList';
import { ArrowBackIos } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { margins } from 'themes/themeConstants';

const SpecimensInTransport = () => {
  const router = useRouter();
  const transportId = router.query.id as string;
  const { t } = useTranslation();

  return (
    <>
      <MainBreadcrumb
        currentPage={transportId}
        navigation={{
          basePath: '/',
          items: [
            {
              name: t(Translation.PAGE_SPECIMENS_TRACKING_TITLE),
              path: '/clinic-test-results/specimen-tracking/transports'
            },
            { name: transportId, path: `/clinic-test-results/specimen-tracking/transports/${transportId}` }
          ]
        }}
      />

      <Main sx={{ marginTop: margins.top16 }}>
        <Box component="span" display="flex" alignItems="center" sx={{ marginTop: 1 }}>
          <IconButton color="primary" onClick={() => router.push('/clinic-test-results/specimen-tracking/transports')}>
            <ArrowBackIos fontSize="small" />
          </IconButton>
          <Typography variant="h4" fontWeight={600}>
            {t(Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_GO_BACK)}
          </Typography>
        </Box>
        <Divider sx={{ marginTop: 2 }} />
        <Box
          component="span"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginTop: 2, marginBottom: 4 }}
        >
          <Typography variant="h4" fontWeight={600} color="primary">
            {transportId}
          </Typography>
          <Button color="primary" variant="contained" size="large" endIcon={<DownloadIcon />}>
            {t(Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_DOWNLOAD_MANIFEST)}
          </Button>
        </Box>
        <SpecimensInTransportList />
      </Main>
    </>
  );
};

export default SpecimensInTransport;
