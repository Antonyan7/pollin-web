import React, { useEffect } from 'react';
import { FieldValues, SubmitHandler, useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';
import { AddendumsProps } from '@axios/patientEmr/managerPatientEmrTypes';
import { StyledButton } from '@components/common/MaterialComponents';
import { Divider, Grid, GridProps, MenuItem, styled, Typography, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import parse from 'html-react-parser';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';
import { borderRadius, borders, margins, paddings } from 'themes/themeConstants';
import { EncountersFormField, SimpleEditorMode, SimpleEditorProps } from 'types/patient';

import { BaseSelectWithLoading } from '@ui-component/BaseDropdownWithLoading';
import SubCardStyled from '@ui-component/cards/SubCardStyled';
import { ButtonWithLoading } from '@ui-component/common/buttons';
import ParserTypographyWrapper from '@ui-component/common/Typography';
import CurrentAddendum from '@ui-component/encounters/components/CurrentAddendum';
import { encountersCustomizedDate } from '@ui-component/encounters/helpers/encountersDate';

import 'react-quill/dist/quill.snow.css';

const EditorWrapper = styled(Grid)<GridProps>(({ theme }) => ({
  width: '100%',
  marginTop: margins.top24,
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
      {encounterData.addendums.map((addendum: AddendumsProps, addendumIndex: number) => {
        const isEditedTitle = addendum?.isEdited
          ? t(Translation.PAGE_ENCOUNTERS_ENCOUNTER_UPDATED_ON)
          : t(Translation.PAGE_ENCOUNTERS_ENCOUNTER_CREATED_ON);
        const isLatestAddendum = addendumIndex === encounterData.addendums.length - 1;

        return (
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
                {`${isEditedTitle} ${encountersCustomizedDate(new Date(addendum.date as Date))}`}
              </Typography>
            </Grid>
            {!isLatestAddendum ? <Divider /> : null}
          </>
        );
      })}
    </Grid>
  ) : null;
};

const SimpleTextEditor = ({
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
  const onSubmit = handleSave as SubmitHandler<FieldValues>;
  const theme = useTheme();
  const [t] = useTranslation();
  const { handleSubmit, control } = useFormContext();

  useEffect(() => {
    dispatch(patientsMiddleware.getEncountersTypes());
  }, []);

  const encountersTypeFieldName = EncountersFormField.EncountersTypeField;
  const editorFieldName = EncountersFormField.EditorContentField;

  const { field: typeField } = useController({ control, name: encountersTypeFieldName });
  const { field: editorField } = useController({ control, name: editorFieldName });
  const { value, onChange } = typeField;
  const { onChange: onEditorFieldChange, ...fieldProps } = editorField;

  return (
    <>
      <EditorWrapper item xs={12} theme={theme} as="form" onSubmit={handleSubmit(onSubmit)}>
        <SubCardStyled
          sx={{ backgroundColor: theme.palette.secondary[200], border: `${borders.solid1px} inherit`, p: 2 }}
        >
          {mode === SimpleEditorMode.Add_Note ? (
            <Grid item xs={6} mb={2}>
              <BaseSelectWithLoading
                labelId="encounter-label"
                id="encounter-type"
                label={t(Translation.PAGE_ENCOUNTERS_ENCOUNTER_TYPE)}
                value={value}
                onChange={(event) => onChange(event.target.value)}
              >
                {encounterTypes?.map((encounterType) => (
                  <MenuItem value={encounterType.id} key={encounterType.id}>
                    {encounterType.title}
                  </MenuItem>
                ))}
              </BaseSelectWithLoading>
            </Grid>
          ) : null}
          <ReactQuill
            style={{ backgroundColor: theme.palette.common.white }}
            onChange={(event) => {
              onEditorFieldChange(event);
              setEditorValue(event);
            }}
            {...fieldProps}
          />
          <Grid container xs={12} justifyContent="flex-end" gap={3} mt={3}>
            <StyledButton type="button" variant="outlined" onClick={handleCancel}>
              {t(Translation.PAGE_ENCOUNTERS_CANCEL_LABEL)}
            </StyledButton>
            <ButtonWithLoading isLoading={buttonWithLoadingState} type="submit" variant="contained">
              <Typography mr={buttonWithLoadingState ? margins.right8 : margins.all0}>
                {!buttonWithLoadingState
                  ? t(Translation.PAGE_ENCOUNTERS_SAVE_LABEL)
                  : t(Translation.PAGE_ENCOUNTERS_UPDATE_LABEL)}
              </Typography>
            </ButtonWithLoading>
          </Grid>
        </SubCardStyled>
      </EditorWrapper>
      {mode === SimpleEditorMode.Edit_Note ? <EditEncounterNoteAddendums /> : null}
      {mode === SimpleEditorMode.Edit_Addendum && secondPartAddendums?.length
        ? secondPartAddendums.map((addendum: AddendumsProps) => <CurrentAddendum currentAddendum={addendum} />)
        : null}
    </>
  );
};

export default SimpleTextEditor;
