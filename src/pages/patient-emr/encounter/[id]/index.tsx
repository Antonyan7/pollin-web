import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IEncounterDetailsProps } from '@axios/patientEmr/managerPatientEmr';
import { ArrowBackIos, EditOutlined, PrintOutlined, ShareOutlined } from '@mui/icons-material';
import { Box, Card, Divider, Grid, IconButton, Typography } from '@mui/material';
import { Theme, useTheme } from '@mui/system';
import { Translation } from 'constants/translations';
import { timeAdjuster } from 'helpers/timeAdjuster';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';

import SubCardStyled from '@ui-component/cards/SubCardStyled';
import { ButtonWithIcon } from '@ui-component/common/buttons';

interface EncounterDetailsPageTitleProps {
  theme: Theme;
  encounterData: IEncounterDetailsProps;
  handleBack: () => void;
  encounterNoteEditedTime: string;
}

const EncounterDetailsPageTitle = ({
  theme,
  encounterData,
  handleBack,
  encounterNoteEditedTime
}: EncounterDetailsPageTitleProps) => (
  <Grid container alignItems="center" justifyContent="space-between">
    <Grid container item xs={6} sx={{ p: 2 }} alignItems="center">
      <Grid item xs={1}>
        <IconButton sx={{ display: 'flex' }} onClick={handleBack}>
          <ArrowBackIos sx={{ color: theme.palette.primary.main }} />
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
          {encounterData.title}
        </Typography>
      </Grid>
    </Grid>
    <Grid container item xs={2} justifyContent="flex-end" pr={4}>
      <Typography component="h4" variant="h4">
        {encounterNoteEditedTime}
      </Typography>
    </Grid>
  </Grid>
);

const EncounterDetailsPage = () => {
  const encounterData = useAppSelector(patientsSelector.encounterDetails);
  const currentPatientId = useAppSelector(patientsSelector.currentPatientId);
  const theme = useTheme();
  const [t] = useTranslation();
  const router = useRouter();
  const encounterNoteEditedTime = timeAdjuster(new Date(encounterData?.updatedOn as Date)).customizedDate;
  const encounterNoteCreatedTime = timeAdjuster(new Date(encounterData?.createdOn as Date)).customizedDate;
  const goToEditEncounterPage = () => router.push(`/patient-emr/encounter/${router.query.id}/edit-note`);
  const goToAddAddendumPage = () => router.push(`/patient-emr/encounter/${router.query.id}/add-addendum`);
  const goToEditAddendumPage = (addendumId: string) =>
    router.push(`/patient-emr/encounter/${addendumId}/edit-addendum`);

  useEffect(() => {
    if (router.query.id) {
      dispatch(patientsMiddleware.getEncounterDetailsInformation(router.query.id as string));
      dispatch(patientsMiddleware.setCurrentEncounterId(router.query.id as string));
    }
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
            <EncounterDetailsPageTitle
              theme={theme}
              encounterData={encounterData}
              handleBack={() => router.push(`/patient-emr/details/${currentPatientId}/encounters`)}
              encounterNoteEditedTime={encounterNoteEditedTime}
            />
          }
        >
          <Grid container sx={{ px: 4, pt: 3.5, flexDirection: 'column' }}>
            <Grid item container sx={{ pt: 2 }} alignItems="center" gap={3}>
              <Typography component="h5" variant="h4" sx={{ width: '130px' }}>
                {t(Translation.PAGE_ENCOUNTERS_ENCOUNTER_TYPE)}
              </Typography>
              <IconButton
                sx={{
                  color: theme.palette.primary.main,
                  border: `1px solid ${theme.palette.primary.main}`,
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
            <Grid item container direction="column" sx={{ gap: '1.5rem', pt: 2 }}>
              {encounterData.addendums.map((addendum) => (
                <>
                  <Divider />
                  <Grid item container direction="row" alignItems="center" gap={3}>
                    <Typography component="h5" variant="h4" sx={{ width: '130px' }}>
                      {t(Translation.PAGE_ENCOUNTERS_ADDENDUM_TITLE)}
                    </Typography>
                    <IconButton
                      disabled={addendum.isEdited}
                      sx={{
                        color: theme.palette.primary.main,
                        border: `1px solid ${theme.palette.primary.main}`,
                        borderRadius: '8px'
                      }}
                      onClick={() => goToEditAddendumPage(addendum.id)}
                    >
                      <EditOutlined />
                    </IconButton>
                  </Grid>
                  <Grid item pt={2.75}>
                    <Typography component="p" variant="body1">
                      {addendum.content}
                    </Typography>
                  </Grid>
                  <Grid item container direction="column" gap={2} sx={{ pt: 3.5 }}>
                    <Typography component="h4" variant="h4">
                      {addendum.author}
                    </Typography>
                    <Typography variant="body1" component="p">
                      {t(Translation.PAGE_ENCOUNTERS_ENCOUNTER_CREATED_ON)}{' '}
                      {timeAdjuster(new Date(addendum.date as Date)).customizedDate}
                    </Typography>
                  </Grid>
                </>
              ))}
            </Grid>
            <Grid item sx={{ mt: 8, pb: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', gap: '20px' }}>
                <ButtonWithIcon
                  sx={{
                    px: 2.5,
                    color: theme.palette.primary.main,
                    border: `1px solid ${theme.palette.primary.main}`
                  }}
                  label={t(Translation.PAGE_ENCOUNTERS_BTN_SHARE)}
                  icon={<ShareOutlined fontSize="small" />}
                />
                <ButtonWithIcon
                  sx={{
                    px: 2.5,
                    color: theme.palette.primary.main,
                    border: `1px solid ${theme.palette.primary.main}`
                  }}
                  label={t(Translation.PAGE_ENCOUNTERS_BTN_PRINT)}
                  icon={<PrintOutlined fontSize="small" />}
                />
              </Box>
              <Box>
                <ButtonWithIcon
                  onClick={goToAddAddendumPage}
                  variant="contained"
                  sx={{
                    paddingRight: 2.5,
                    color: theme.palette.primary.white,
                    background: theme.palette.primary.main,
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

export default EncounterDetailsPage;
