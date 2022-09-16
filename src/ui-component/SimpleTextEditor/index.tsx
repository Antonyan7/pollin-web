import React from 'react';
import ReactQuill from 'react-quill';
import { StyledButton } from '@components/Appointments/CommonMaterialComponents';
import { Grid, GridProps, styled, useTheme } from '@mui/material';
import { SimpleEditorMode, SimpleEditorProps } from 'types/patient';

import SubCard from '@ui-component/cards/SubCard';

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

const SimpleTextEditor = ({ editorValue, mode }: SimpleEditorProps) => {
  const theme = useTheme();

  return (
    <StyledGrid item xs={12} theme={theme}>
      <SubCard sx={{ backgroundColor: theme.palette.grey[300] }}>
        <ReactQuill value={editorValue} theme="snow" style={{ backgroundColor: theme.palette.common.white }} />
        <Grid container xs={12} justifyContent="flex-end" gap={3} mt={3}>
          <StyledButton type="button" variant="contained">
            Cancel
          </StyledButton>
          <StyledButton type="button" variant="contained">
            {mode === SimpleEditorMode.Add ? 'Save' : 'Update'}
          </StyledButton>
        </Grid>
      </SubCard>
    </StyledGrid>
  );
};

export default SimpleTextEditor;
