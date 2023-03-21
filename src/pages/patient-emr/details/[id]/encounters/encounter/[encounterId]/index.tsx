import React, { Fragment, useCallback, useEffect } from 'react';
import { AddendumsProps, IEncounterDetailsProps } from '@axios/patientEmr/managerPatientEmrTypes';
import { ArrowBackIos, EditOutlined, PrintOutlined, ShareOutlined } from '@mui/icons-material';
import { Box, Divider, Grid, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import parse from 'html-react-parser';
import { t } from 'i18next';
import EncountersLayout from 'layout/EncountersLayout';
import { useRouter, withRouter } from 'next/router';
import { borderRadius, borders, margins, paddings } from 'themes/themeConstants';

import CircularLoading from '@ui-component/circular-loading';
import { ButtonWithIcon } from '@ui-component/common/buttons';
import ParserTypographyWrapper from '@ui-component/common/Typography';
import EncountersWrapper from '@ui-component/encounters/components/EncountersWrapper';
import {
  encountersCustomizedDate,
  encountersCustomizedDateWithoutTime
} from '@ui-component/encounters/helpers/encountersDate';
import encountersRedirect, { EncountersPageTypes } from '@ui-component/encounters/helpers/encountersRedirect';

interface EncounterDetailsPageTitleProps {
  encounterData: IEncounterDetailsProps;
  handleBack: () => void;
  encounterNoteCreatedTime: string;
}

const EncounterDetailsPageTitle = ({
  encounterData,
  handleBack,
  encounterNoteCreatedTime
}: EncounterDetailsPageTitleProps) => (
  <Grid container item alignItems="center" justifyContent="space-between" xs={12}>
    <Grid container item xs={8} sx={{ p: paddings.all16 }} alignItems="center">
      <Grid item>
        <IconButton onClick={handleBack}>
          <ArrowBackIos
            sx={{ color: (theme) => theme.palette.primary.main }}
            data-cy={CypressIds.PAGE_PATIENT_DETAILS_BACK_BTN}
          />
        </IconButton>
      </Grid>
      <Grid item xs={7}>
        <Typography
          variant="h3"
          sx={{
            color: (theme) => theme.palette.common.black,
            fontSize: (theme) => theme.typography.pxToRem(21),
            fontWeight: 500
          }}
        >
          {encounterData.title}
        </Typography>
      </Grid>
    </Grid>
    <Grid container item xs={4} justifyContent="flex-end" pr={paddings.right16}>
      <Typography variant="h4">{encounterNoteCreatedTime}</Typography>
    </Grid>
  </Grid>
);

const FooterEncounter = () => {
  const theme = useTheme();
  const router = useRouter();
  const goToAddAddendumPage = () => encountersRedirect(router, EncountersPageTypes.ADD_ADDENDUM);

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
          data-cy={CypressIds.PAGE_PATIENT_DETAILS_SHARE_BTN}
          icon={<ShareOutlined fontSize="small" />}
        />
        <ButtonWithIcon
          sx={{
            px: paddings.all24,
            color: theme.palette.primary.main,
            border: `${borders.solid1px} ${theme.palette.primary.main}`
          }}
          label={t(Translation.PAGE_ENCOUNTERS_BTN_PRINT)}
          data-cy={CypressIds.PAGE_PATIENT_DETAILS_PRINT_BTN}
          icon={<PrintOutlined fontSize="small" />}
        />
      </Box>
      <Box>
        <ButtonWithIcon
          onClick={goToAddAddendumPage}
          variant="contained"
          sx={{
            border: 'none',
            height: '100%'
          }}
          label={t(Translation.PAGE_ENCOUNTERS_BTN_ADD_ADDENDUM)}
          data-cy={CypressIds.PAGE_PATIENT_DETAILS_ADD_ADDENDUM_BTN}
          icon={<EditOutlined fontSize="small" />}
        />
      </Box>
    </Grid>
  );
};

const EncounterDetailsPage = () => {
  const encounterData = useAppSelector(patientsSelector.encounterDetails);
  const currentEncounterId = useAppSelector(patientsSelector.currentEncounterId);
  const isEncountersDetailsLoading = useAppSelector(patientsSelector.isEncountersDetailsLoading);
  const theme = useTheme();
  const router = useRouter();
  const encounterNoteCreatedTime = encountersCustomizedDateWithoutTime(new Date(encounterData?.createdOn as Date));
  const encounterNoteUpdatedTime = encountersCustomizedDate(new Date(encounterData?.updatedOn as Date));
  const goToEditEncounterPage = () => encountersRedirect(router, EncountersPageTypes.EDIT_ENCOUNTER);
  const goToEditAddendumPage = (addendumId: string) =>
    encountersRedirect(router, EncountersPageTypes.EDIT_ADDENDUM, addendumId);

  const handleBack = useCallback(() => {
    encountersRedirect(router, EncountersPageTypes.BACK);
    dispatch(patientsMiddleware.getEncounterDetailsInformation());
  }, [router]);

  useEffect(() => {
    if (typeof router.query.encounterId === 'string') {
      dispatch(patientsMiddleware.getEncounterDetailsInformation(router.query.encounterId));
      dispatch(patientsMiddleware.setCurrentEncounterId(router.query.encounterId));
    }
  }, [router.query.encounterId]);

  const isEncounterNoteUpdated =
    new Date(encounterData?.createdOn as Date).getTime() !== new Date(encounterData?.updatedOn as Date).getTime();

  useEffect(() => {
    if (currentEncounterId) {
      dispatch(patientsMiddleware.getEncounterDetailsInformation(currentEncounterId));
    }
  }, [currentEncounterId]);

  useEffect(() => {
    if (typeof router.query.id === 'string') {
      dispatch(patientsMiddleware.setCurrentPatient(router.query.id));
    }
  }, [router.query.id]);

  return (
    <EncountersLayout>
      {encounterData && !isEncountersDetailsLoading ? (
        <EncountersWrapper
          title={
            <EncounterDetailsPageTitle
              encounterData={encounterData}
              handleBack={handleBack}
              encounterNoteCreatedTime={encounterNoteCreatedTime}
            />
          }
        >
          <Grid container direction="column" px={paddings.all4}>
            <Grid item container pt={paddings.top12} alignItems="center" gap={3}>
              <Typography variant="h4" sx={{ width: '130px' }}>
                {t(Translation.PAGE_ENCOUNTERS_ADDENDUM_NOTE)}
              </Typography>
              <IconButton
                sx={{
                  color: theme.palette.primary.main,
                  border: `${borders.solid1px} ${theme.palette.primary.main}`,
                  borderRadius: borderRadius.radius8
                }}
                onClick={goToEditEncounterPage}
                data-cy={`${CypressIds.PAGE_PATIENT_EDIT_ENCOUNTER_BTN}`}
              >
                <EditOutlined />
              </IconButton>
            </Grid>
            <Grid item pt={paddings.top22}>
              <ParserTypographyWrapper variant="body1">{parse(encounterData.content)}</ParserTypographyWrapper>
            </Grid>
            <Grid item pt={paddings.top28}>
              <Typography variant="h4">{encounterData.author}</Typography>
              <Typography pt={paddings.top8}>
                {isEncounterNoteUpdated
                  ? `${t(Translation.PAGE_ENCOUNTERS_ENCOUNTER_UPDATED_ON)} ${encounterNoteUpdatedTime}`
                  : `${t(Translation.PAGE_ENCOUNTERS_ENCOUNTER_CREATED_ON)} ${encounterNoteCreatedTime}`}
              </Typography>
            </Grid>
            <Grid item container direction="column" gap={2} sx={{ pt: paddings.top16 }}>
              {encounterData.addendums.map((addendum: AddendumsProps, index) => {
                const isEditedTitle = addendum?.isEdited
                  ? t(Translation.PAGE_ENCOUNTERS_ENCOUNTER_UPDATED_ON)
                  : t(Translation.PAGE_ENCOUNTERS_ENCOUNTER_CREATED_ON);

                return (
                  <Fragment key={addendum.id}>
                    <Divider />
                    <Grid item container direction="row" alignItems="center" gap={3}>
                      <Typography variant="h4" sx={{ width: '130px' }}>
                        {t(Translation.PAGE_ENCOUNTERS_ADDENDUM_TITLE)}
                      </Typography>
                      <IconButton
                        sx={{
                          color: theme.palette.primary.main,
                          border: `${borders.solid1px} ${theme.palette.primary.main}`,
                          borderRadius: borderRadius.radius8
                        }}
                        onClick={() => goToEditAddendumPage(addendum.id)}
                        data-cy={`${CypressIds.PAGE_PATIENT_DETAILS_ADDENDUM_EDIT_ICON}-${index}`}
                      >
                        <EditOutlined />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <ParserTypographyWrapper variant="body1">{parse(addendum.content)}</ParserTypographyWrapper>
                    </Grid>
                    <Grid item container direction="column" sx={{ pt: paddings.top16 }}>
                      <Typography variant="h4">{addendum.author}</Typography>
                      <Typography variant="body1">
                        {`${isEditedTitle} ${encountersCustomizedDate(addendum.date as Date)}`}
                      </Typography>
                    </Grid>
                  </Fragment>
                );
              })}
            </Grid>
            <FooterEncounter />
          </Grid>
        </EncountersWrapper>
      ) : null}
      {isEncountersDetailsLoading ? <CircularLoading /> : null}
    </EncountersLayout>
  );
};

export default withRouter(EncounterDetailsPage);
