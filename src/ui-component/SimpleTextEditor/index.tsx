import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';
import { StyledButton } from '@components/Appointments/CommonMaterialComponents';
import {
  FormControl,
  Grid,
  GridProps,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Typography,
  useTheme
} from '@mui/material';
import { Translation } from 'constants/translations';
import { timeAdjuster } from 'helpers/timeAdjuster';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';
import { borderRadius, borders } from 'themes/themeConstants';
import { SimpleEditorMode, SimpleEditorProps } from 'types/patient';

import SubCardStyled from '@ui-component/cards/SubCardStyled';
import { ButtonWithLoading } from '@ui-component/common/buttons';

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
    <Grid item container direction="column" gap={3} sx={{ pt: 2, ml: 2 }}>
      {encounterData.addendums.map((addendum) => (
        <>
          <Grid item container direction="row" alignItems="center">
            <Typography component="h5" variant="h4" sx={{ width: '130px' }}>
              {t(Translation.PAGE_ENCOUNTERS_ADDENDUM_TITLE)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="p" variant="body1">
              {addendum.content}
            </Typography>
          </Grid>
          <Grid item container direction="column" mb={2}>
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
  ) : null;
};

const SimpleTextEditor = ({
  editorValue,
  handleEncounterTypeSelect,
  setEditorValue,
  mode,
  handleSave,
  handleCancel
}: SimpleEditorProps) => {
  const encounterTypes = useAppSelector(patientsSelector.encountersTypes);
  const isEncounterLoading = useAppSelector(patientsSelector.isEncountersListLoading);
  const theme = useTheme();
  const [t] = useTranslation();

  useEffect(() => {
    dispatch(patientsMiddleware.getEncountersTypes());
  }, []);

  return (
    <>
      <StyledGrid item xs={12} theme={theme}>
        <SubCardStyled
          sx={{ backgroundColor: theme.palette.secondary[200], border: `${borders.solid1px} inherit`, p: 2 }}
        >
          {mode === SimpleEditorMode.Add_Note || mode === SimpleEditorMode.Edit_Note ? (
            <Grid item xs={6} mb={2}>
              <FormControl fullWidth>
                <InputLabel id="encounter-label">{t(Translation.PAGE_ENCOUNTERS_ENCOUNTER_TYPE)}</InputLabel>
                <Select
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
                </Select>
              </FormControl>
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
              isLoading={isEncounterLoading}
              type="button"
              variant="contained"
              onClick={handleSave}
            >
              {!isEncounterLoading
                ? t(Translation.PAGE_ENCOUNTERS_SAVE_LABEL)
                : t(Translation.PAGE_ENCOUNTERS_UPDATE_LABEL)}
            </ButtonWithLoading>
          </Grid>
        </SubCardStyled>
      </StyledGrid>
      {mode === SimpleEditorMode.Edit_Note ? <EditEncounterNoteAddendums /> : null}
    </>
  );
};

export default SimpleTextEditor;
