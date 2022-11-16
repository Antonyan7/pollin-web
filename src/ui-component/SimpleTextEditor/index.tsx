import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';
import { AddendumsProps } from '@axios/patientEmr/managerPatientEmrTypes';
import { StyledButton } from '@components/Appointments/CommonMaterialComponents';
import { Divider, Grid, GridProps, MenuItem, styled, Typography, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import parse from 'html-react-parser';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';
import { borderRadius, borders, margins, paddings } from 'themes/themeConstants';
import { SimpleEditorMode, SimpleEditorProps } from 'types/patient';

import { BaseSelectWithLoading } from '@ui-component/BaseDropdownWithLoading';
import SubCardStyled from '@ui-component/cards/SubCardStyled';
import { ButtonWithLoading } from '@ui-component/common/buttons';
import ParserTypographyWrapper from '@ui-component/common/Typography';
import CurrentAddendum from '@ui-component/encounters/components/CurrentAddendum';
import { encountersCustomizedDate } from '@ui-component/encounters/helpers/encountersDate';

import 'react-quill/dist/quill.snow.css';

const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  '& .quill': {
    borderRadius: borderRadius.radius12,
    '& .ql-toolbar': {
      backgroundColor: theme.palette.grey[50],
      borderColor: 'transparent',
      borderTopLeftRadius: borderRadius.radius12,
      borderTopRightRadius: borderRadius.radius12
    },
    '& .ql-container': {
      borderColor: 'transparent',
      borderBottomLeftRadius: borderRadius.radius12,
      borderBottomRightRadius: borderRadius.radius12,
      '& .ql-editor': {
        minHeight: 125
      }
    },
    '& .ql-tooltip': {
      transform: 'translateX(35%)'
    }
  }
}));

const EditEncounterNoteAddendums = () => {
  const encounterData = useAppSelector(patientsSelector.encounterDetails);
  const [t] = useTranslation();

  return encounterData ? (
    <Grid item container direction="column" gap={3} sx={{ pt: paddings.top16, ml: margins.left16 }}>
      {encounterData.addendums.map((addendum: AddendumsProps, addendumIndex: number) => (
        <>
          <Grid item container direction="row" alignItems="center">
            <Typography variant="h4" sx={{ width: '130px' }}>
              {t(Translation.PAGE_ENCOUNTERS_ADDENDUM_TITLE)}
            </Typography>
          </Grid>
          <Grid item>
            <ParserTypographyWrapper variant="body1">{parse(addendum.content)}</ParserTypographyWrapper>
          </Grid>
          <Grid item container direction="column" mb={margins.bottom16}>
            <Typography variant="h4">{addendum.author}</Typography>
            <Typography variant="body1">
              {`${t(Translation.PAGE_ENCOUNTERS_ENCOUNTER_CREATED_ON)} ${encountersCustomizedDate(
                new Date(addendum.date as Date)
              )}`}
            </Typography>
          </Grid>
          <Divider sx={{ display: addendumIndex === encounterData.addendums.length - 1 ? 'none' : 'block' }} />
        </>
      ))}
    </Grid>
  ) : null;
};

const SimpleTextEditor = ({
  editorValue,
  handleEncounterTypeSelect,
  setEditorValue,
  mode,
  handleSave,
  handleCancel,
  secondPartAddendums,
  loadingButtonState
}: SimpleEditorProps) => {
  const encounterTypes = useAppSelector(patientsSelector.encountersTypes);
  const isEncounterLoading = useAppSelector(patientsSelector.isEncountersListLoading);
  const buttonWithLoadingState = loadingButtonState ?? isEncounterLoading;
  const theme = useTheme();
  const [t] = useTranslation();

  useEffect(() => {
    dispatch(patientsMiddleware.getEncountersTypes());
  }, []);

  const isEncountersTypeSelectDisabled = mode === SimpleEditorMode.Edit_Note;

  return (
    <>
      <StyledGrid item xs={12} theme={theme}>
        <SubCardStyled
          sx={{ backgroundColor: theme.palette.secondary[200], border: `${borders.solid1px} inherit`, p: 2 }}
        >
          {mode === SimpleEditorMode.Add_Note || mode === SimpleEditorMode.Edit_Note ? (
            <Grid item xs={6} mb={2}>
              <BaseSelectWithLoading
                disabled={isEncountersTypeSelectDisabled}
                labelId="encounter-label"
                id="encounter-type"
                label={t(Translation.PAGE_ENCOUNTERS_ENCOUNTER_TYPE)}
                onChange={handleEncounterTypeSelect}
              >
                {encounterTypes?.map((encounterType) => (
                  <MenuItem value={encounterType.id} key={encounterType.toString()}>
                    {encounterType.title}
                  </MenuItem>
                ))}
              </BaseSelectWithLoading>
            </Grid>
          ) : null}
          <ReactQuill
            value={editorValue}
            style={{ backgroundColor: theme.palette.common.white }}
            onChange={setEditorValue}
          />
          <Grid container xs={12} justifyContent="flex-end" gap={3} mt={3}>
            <StyledButton type="button" variant="outlined" onClick={handleCancel}>
              {t(Translation.PAGE_ENCOUNTERS_CANCEL_LABEL)}
            </StyledButton>
            <ButtonWithLoading
              sx={{ borderRadius: borderRadius.radius8 }}
              isLoading={buttonWithLoadingState}
              type="button"
              variant="contained"
              onClick={handleSave}
            >
              <Typography mr={buttonWithLoadingState ? margins.right8 : margins.all0}>
                {!buttonWithLoadingState
                  ? t(Translation.PAGE_ENCOUNTERS_SAVE_LABEL)
                  : t(Translation.PAGE_ENCOUNTERS_UPDATE_LABEL)}
              </Typography>
            </ButtonWithLoading>
          </Grid>
        </SubCardStyled>
      </StyledGrid>
      {mode === SimpleEditorMode.Edit_Note ? <EditEncounterNoteAddendums /> : null}
      {mode === SimpleEditorMode.Edit_Addendum && secondPartAddendums?.length
        ? secondPartAddendums.map((addendum: AddendumsProps) => <CurrentAddendum currentAddendum={addendum} />)
        : null}
    </>
  );
};

export default SimpleTextEditor;
