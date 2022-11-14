import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AddendumsProps, IEncounterDetailsProps } from '@axios/patientEmr/managerPatientEmrTypes';
import { ArrowBackIos, EditOutlined, PrintOutlined, ShareOutlined } from '@mui/icons-material';
import { Box, CircularProgress, Divider, Grid, IconButton, Typography } from '@mui/material';
import { Theme, useTheme } from '@mui/system';
import { Translation } from 'constants/translations';
import { timeAdjuster } from 'helpers/timeAdjuster';
import parse from 'html-react-parser';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';
import { borderRadius, borders, margins, paddings } from 'themes/themeConstants';

import { ButtonWithIcon } from '@ui-component/common/buttons';
import ParserTypographyWrapper from '@ui-component/common/Typography';
import EncountersWrapper from '@ui-component/encounters/components/EncountersWrapper';
import { encountersCustomizedDate } from '@ui-component/encounters/helpers/encountersDate';

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
    <Grid container item xs={2} justifyContent="flex-end" pr={2}>
      <Typography component="h4" variant="h4">
        {encounterNoteEditedTime}
      </Typography>
    </Grid>
  </Grid>
);

const FooterEncounter = () => {
  const theme = useTheme();
  const [t] = useTranslation();
  const router = useRouter();
  const goToAddAddendumPage = () => router.push(`/patient-emr/encounter/${router.query.id}/add-addendum`);

  return (
    <Grid item sx={{ mt: margins.top64, mb: margins.bottom48, display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex' }} gap={2}>
        <ButtonWithIcon
          sx={{
            px: paddings.all24,
            color: theme.palette.primary.main,
            border: `${borders.solid1px} ${theme.palette.primary.main}`
          }}
          label={t(Translation.PAGE_ENCOUNTERS_BTN_SHARE)}
          icon={<ShareOutlined fontSize="small" />}
        />
        <ButtonWithIcon
          sx={{
            px: paddings.all24,
            color: theme.palette.primary.main,
            border: `${borders.solid1px} ${theme.palette.primary.main}`
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
            border: 'none'
          }}
          label={t(Translation.PAGE_ENCOUNTERS_BTN_ADD_ADDENDUM)}
          icon={<EditOutlined fontSize="small" />}
        />
      </Box>
    </Grid>
  );
};

const EncounterDetailsPage = () => {
  const encounterData = useAppSelector(patientsSelector.encounterDetails);
  const currentPatientId = useAppSelector(patientsSelector.currentPatientId);
  const isEncountersDetailsLoading = useAppSelector(patientsSelector.isEncountersDetailsLoading);
  const theme = useTheme();
  const [t] = useTranslation();
  const router = useRouter();
  const encounterNoteEditedTime = timeAdjuster(new Date(encounterData?.updatedOn as Date)).customizedDate;
  const encounterNoteCreatedTime = encountersCustomizedDate(new Date(encounterData?.createdOn as Date));
  const encounterNoteUpdatedTime = encountersCustomizedDate(new Date(encounterData?.updatedOn as Date));
  const goToEditEncounterPage = () => router.push(`/patient-emr/encounter/${router.query.id}/edit-note`);
  const goToEditAddendumPage = (addendumId: string) =>
    router.push(`/patient-emr/encounter/${addendumId}/edit-addendum`);
  const handleBack = useCallback(() => {
    router.push(`/patient-emr/details/${currentPatientId}/encounters`);
    dispatch(patientsMiddleware.getEncounterDetailsInformation());
  }, [currentPatientId, router]);

  useEffect(() => {
    if (router.query.id) {
      dispatch(patientsMiddleware.getEncounterDetailsInformation(router.query.id as string));
      dispatch(patientsMiddleware.setCurrentEncounterId(router.query.id as string));
    }
  }, [router.query.id, encounterData?.addendums.length]);

  const isEncounterNoteUpdated =
    new Date(encounterData?.createdOn as Date).getTime() !== new Date(encounterData?.updatedOn as Date).getTime();

  return encounterData && !isEncountersDetailsLoading ? (
    <EncountersWrapper
      title={
        <EncounterDetailsPageTitle
          theme={theme}
          encounterData={encounterData}
          handleBack={handleBack}
          encounterNoteEditedTime={encounterNoteEditedTime}
        />
      }
    >
      <Grid container sx={{ px: paddings.all32, pt: paddings.top28, flexDirection: 'column' }}>
        <Grid item container pt={paddings.top16} alignItems="center" gap={3}>
          <Typography component="h5" variant="h4" sx={{ width: '130px' }}>
            {t(Translation.PAGE_ENCOUNTERS_ADDENDUM_NOTE)}
          </Typography>
          <IconButton
            sx={{
              color: theme.palette.primary.main,
              border: `${borders.solid1px} ${theme.palette.primary.main}`,
              borderRadius: borderRadius.radius8
            }}
            onClick={goToEditEncounterPage}
          >
            <EditOutlined />
          </IconButton>
        </Grid>
        <Grid item pt={paddings.top22}>
          <ParserTypographyWrapper variant="body1">{parse(encounterData.content)}</ParserTypographyWrapper>
        </Grid>
        <Grid item pt={paddings.top28}>
          <Typography component="h4" variant="h4">
            {encounterData.author}
          </Typography>
          <Typography pt={paddings.top8} component="p">
            {isEncounterNoteUpdated
              ? `${t(Translation.PAGE_ENCOUNTERS_ENCOUNTER_UPDATED_ON)} ${encounterNoteUpdatedTime}`
              : `${t(Translation.PAGE_ENCOUNTERS_ENCOUNTER_CREATED_ON)} ${encounterNoteCreatedTime}`}
          </Typography>
        </Grid>
        <Grid item container direction="column" gap={2} sx={{ pt: paddings.top16 }}>
          {encounterData.addendums.map((addendum: AddendumsProps) => (
            <>
              <Divider />
              <Grid item container direction="row" alignItems="center" gap={3}>
                <Typography component="h5" variant="h4" sx={{ width: '130px' }}>
                  {t(Translation.PAGE_ENCOUNTERS_ADDENDUM_TITLE)}
                </Typography>
                <IconButton
                  sx={{
                    color: theme.palette.primary.main,
                    border: `${borders.solid1px} ${theme.palette.primary.main}`,
                    borderRadius: borderRadius.radius8
                  }}
                  onClick={() => goToEditAddendumPage(addendum.id)}
                >
                  <EditOutlined />
                </IconButton>
              </Grid>
              <Grid item>
                <ParserTypographyWrapper variant="body1">{parse(addendum.content)}</ParserTypographyWrapper>
              </Grid>
              <Grid item container direction="column" sx={{ pt: paddings.top16 }}>
                <Typography component="h4" variant="h4">
                  {addendum.author}
                </Typography>
                <Typography variant="body1" component="p">
                  {`${t(Translation.PAGE_ENCOUNTERS_ENCOUNTER_CREATED_ON)} ${encountersCustomizedDate(
                    addendum.date as Date
                  )}`}
                </Typography>
              </Grid>
            </>
          ))}
        </Grid>
        <FooterEncounter />
      </Grid>
    </EncountersWrapper>
  ) : (
    <Box sx={{ display: 'grid', justifyContent: 'center', alignItems: 'center', marginTop: margins.top16 }}>
      {isEncountersDetailsLoading && <CircularProgress sx={{ margin: margins.auto }} />}
    </Box>
  );
};

export default EncounterDetailsPage;
