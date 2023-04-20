import React, { useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import { Main } from '@components/common/AppointmentsContent';
import SpecimensInTransportList from '@components/Specimens/SpecimensInTransportList/SpecimensInTransportList';
import { ArrowBackIos } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';
import { Box, Divider, IconButton, Link, Typography } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { margins } from 'themes/themeConstants';

import { ButtonWithLoading } from '@ui-component/common/buttons';

const SpecimensInTransport = () => {
  const router = useRouter();
  const transportId = router.query.id as string;
  const transportList = useAppSelector(resultsSelector.transportList);
  const { t } = useTranslation();
  const downloadManifestRef = useRef<HTMLAnchorElement | null>(null);
  const downloadedTransportTitle = useMemo(
    () => transportList.folders.find((folder) => folder.id === transportId)?.title,
    [transportId, transportList.folders]
  );
  const specimensInTransportList = useAppSelector(resultsSelector.specimensInTransportList);
  const transportFolderTitle = specimensInTransportList.transportFolder.title;

  const handleDownloadClick = useCallback(
    async (transportFolderId: string) => {
      const blob = await dispatch(resultsMiddleware.downloadTransportFolderManifest(transportFolderId));

      if (blob && downloadManifestRef.current) {
        const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));

        downloadManifestRef.current.href = url;
        downloadManifestRef.current.download = `${downloadedTransportTitle}.pdf`;
        downloadManifestRef.current.click();
        window.URL.revokeObjectURL(url);
      }
    },
    [downloadedTransportTitle]
  );
  const isTransportFolderDownloaded = useAppSelector(resultsSelector.isTransportFolderDownloaded);

  return (
    <>
      <MainBreadcrumb
        currentPage={transportFolderTitle}
        navigation={{
          basePath: '/',
          items: [
            {
              name: t(Translation.PAGE_SPECIMENS_TRACKING_TITLE),
              path: '/clinic-test-results/specimen-tracking/transports'
            },
            { name: transportFolderTitle, path: `/clinic-test-results/specimen-tracking/transports/${transportId}` }
          ]
        }}
      />

      <Main sx={{ marginTop: margins.top16 }}>
        <Box component="span" display="flex" alignItems="center" sx={{ marginTop: 1 }}>
          <IconButton
            color="primary"
            onClick={() => router.push('/clinic-test-results/specimen-tracking/transports')}
            data-cy={CypressIds.PAGE_SPECIMEN_TRACKING_IN_TRANSPORT_BACK_TO_TRANSPORT_PAGE}
          >
            <ArrowBackIos fontSize="small" />
          </IconButton>
          <Typography variant="h4" fontWeight={500}>
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
          <Typography variant="h4" fontWeight={500} color="primary">
            {transportFolderTitle}
          </Typography>
          <ButtonWithLoading
            isLoading={isTransportFolderDownloaded}
            color="primary"
            variant="contained"
            size="large"
            endIcon={<DownloadIcon />}
            onClick={() => handleDownloadClick(transportId)}
            dataCy={CypressIds.PAGE_SPECIMEN_TRACKING_IN_TRANSPORT_DOWNLOAD_MANIFEST}
          >
            {t(Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_DOWNLOAD_MANIFEST)}
            <Link component="a" ref={downloadManifestRef} hidden href="#download" />
          </ButtonWithLoading>
        </Box>
        <SpecimensInTransportList />
      </Main>
    </>
  );
};

export default SpecimensInTransport;
