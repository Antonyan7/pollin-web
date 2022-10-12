import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';
import { StyledButton } from '@components/Appointments/CommonMaterialComponents';
import { FormControl, Grid, GridProps, InputLabel, MenuItem, Select, styled, useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { SimpleEditorMode, SimpleEditorProps } from 'types/patient';

import SubCardStyled from '@ui-component/cards/SubCardStyled';

import 'react-quill/dist/quill.snow.css';

const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  '& .quill': {
    bgcolor: theme.palette.grey[50],
    borderRadius: '12px',
    '& .ql-toolbar': {
      bgcolor: theme.palette.grey[100],
      borderColor: theme.palette.grey[400],
      borderTopLeftRadius: '12px',
      borderTopRightRadius: '12px'
    },
    '& .ql-container': {
      borderColor: theme.palette.grey[400],
      borderBottomLeftRadius: '12px',
      borderBottomRightRadius: '12px',
      '& .ql-editor': {
        minHeight: 125
      }
    },
    '& .ql-tooltip': {
      transform: 'translateX(35%)'
    }
  }
}));

const SimpleTextEditor = ({
  editorValue,
  handleEncounterTypeSelect,
  setEditorValue,
  mode,
  handleSave,
  handleCancel
}: SimpleEditorProps) => {
  const encounterTypes = useAppSelector(patientsSelector.encountersTypes);
  const theme = useTheme();
  const [t] = useTranslation();

  useEffect(() => {
    dispatch(patientsMiddleware.getEncountersTypes());
  }, []);

  return (
    <StyledGrid item xs={12} theme={theme}>
      <SubCardStyled sx={{ backgroundColor: theme.palette.grey[300], p: 4 }}>
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
        <ReactQuill
          value={editorValue}
          theme="snow"
          style={{ backgroundColor: theme.palette.common.white }}
          onChange={setEditorValue}
        />
        <Grid container xs={12} justifyContent="flex-end" gap={3} mt={3}>
          <StyledButton type="button" variant="contained" color="secondary" onClick={handleCancel}>
            {t(Translation.PAGE_ENCOUNTERS_CANCEL_LABEL)}
          </StyledButton>
          <StyledButton type="button" variant="contained" color="secondary" onClick={handleSave}>
            {mode === SimpleEditorMode.Add
              ? t(Translation.PAGE_ENCOUNTERS_SAVE_LABEL)
              : t(Translation.PAGE_ENCOUNTERS_UPDATE_LABEL)}
          </StyledButton>
        </Grid>
      </SubCardStyled>
    </StyledGrid>
  );
};

export default SimpleTextEditor;
