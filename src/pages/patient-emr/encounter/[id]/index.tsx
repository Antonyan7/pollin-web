import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowBackIos, EditOutlined, PrintOutlined, ShareOutlined } from '@mui/icons-material';
import { Box, Card, Grid, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { timeAdjuster } from 'helpers/timeAdjuster';
import { useRouter } from 'next/router';

import SubCardStyled from '@ui-component/cards/SubCardStyled';
import { ButtonWithIcon } from '@ui-component/common/buttons';

const EncouterDetailsPage = () => {
  const encounterData = useAppSelector(patientsSelector.encounterDetails);
  const theme = useTheme();
  const [t] = useTranslation();
  const router = useRouter();
  const encounterNoteEditedTime = timeAdjuster(new Date(encounterData?.updatedOn as Date)).customizedDate;
  const encounterNoteCreatedTime = timeAdjuster(new Date(encounterData?.createdOn as Date)).customizedDate;
  const handleBack = () => router.back();
  const goToEditEncounterPage = () => router.push(`/patient-emr/encounter/${router.query.id}/edit-note`);

  useEffect(() => {
    dispatch(patientsMiddleware.getEncounterDetailsInformation(router.query.id as string));
  }, [router.query.id]);

  return (
    encounterData && (
      <Card sx={{ p: 3, mt: 1 }}>
        <Typography component="h2" variant="h2" sx={{ pl: 4, pb: 3 }}>
          {t(Translation.PAGE_ENCOUNTERS_LIST_TITLE)}
        </Typography>
        <SubCardStyled
          sx={{
            outline: '1px solid #D2DDD8',
            '& > .MuiCardHeader-root': {
              p: 0
            }
          }}
          title={
            <Grid
              container
              sx={{ borderBottom: '1px solid #D2DDD8' }}
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid container item xs={6} sx={{ p: 2 }} alignItems="center">
                <Grid item xs={1}>
                  <IconButton sx={{ display: 'flex', color: theme.palette.secondary.main }} onClick={handleBack}>
                    <ArrowBackIos />
                  </IconButton>
                </Grid>
                <Grid item xs={5}>
                  <Typography
                    component="h3"
                    variant="h3"
                    sx={{ color: theme.palette.common.black, marginRight: '20px' }}
                    fontSize="21px"
                    fontWeight="500"
                  >
                    {t(Translation.PAGE_ENCOUNTERS_CONSULTATION_IN_CLINIC)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container item xs={2} justifyContent="flex-end" pr={4}>
                <Typography component="h4" variant="h4">
                  {encounterNoteEditedTime}
                </Typography>
              </Grid>
            </Grid>
          }
        >
          <Grid container sx={{ px: 4, pt: 3.5, flexDirection: 'column' }}>
            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '1.5rem', pt: 2 }}>
              <Typography component="h5" variant="h4">
                {encounterData.title}
              </Typography>
              <IconButton
                sx={{
                  color: theme.palette.secondary.main,
                  border: `1px solid ${theme.palette.secondary[200]}`,
                  borderRadius: '8px'
                }}
                onClick={goToEditEncounterPage}
              >
                <EditOutlined />
              </IconButton>
            </Grid>
            <Grid item pt={2.75}>
              <Typography component="p" variant="body1">
                {encounterData.content}
              </Typography>
            </Grid>
            <Grid item sx={{ pt: 3.5 }}>
              <Typography component="h4" variant="h4">
                {encounterData.author}
              </Typography>
              <Typography pt={1} component="p">
                {t(Translation.PAGE_ENCOUNTERS_ENCOUNTER_CREATED_ON)} {encounterNoteCreatedTime}
              </Typography>
            </Grid>
            <Grid item sx={{ mt: 8, pb: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex' }}>
                <ButtonWithIcon
                  sx={{
                    px: 2.5,
                    color: theme.palette.secondary.main,
                    border: `1px solid ${theme.palette.secondary.main}`
                  }}
                  label={t(Translation.PAGE_ENCOUNTERS_BTN_SHARE)}
                  icon={<ShareOutlined fontSize="small" />}
                />
                <ButtonWithIcon
                  sx={{
                    marginLeft: 2.5,
                    px: 2.5,
                    color: theme.palette.secondary.main,
                    border: `1px solid ${theme.palette.secondary.main}`
                  }}
                  label={t(Translation.PAGE_ENCOUNTERS_BTN_PRINT)}
                  icon={<PrintOutlined fontSize="small" />}
                />
              </Box>
              <Box>
                <ButtonWithIcon
                  variant="contained"
                  sx={{
                    paddingRight: 2.5,
                    color: theme.palette.common.white,
                    background: theme.palette.secondary.main,
                    border: 'none'
                  }}
                  label={t(Translation.PAGE_ENCOUNTERS_BTN_ADD_ADDENDUM)}
                  icon={<EditOutlined fontSize="small" />}
                />
              </Box>
            </Grid>
          </Grid>
        </SubCardStyled>
      </Card>
    )
  );
};

export default EncouterDetailsPage;
