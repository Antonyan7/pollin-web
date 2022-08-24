import { styled } from '@mui/material/styles';

const ViewSchedulingTemplateStyled = styled('div')(({ theme }) => ({
  '.view-scheduling-template': {
    backgroundColor: theme.palette.common.white,
    border: '1px solid rgb(220, 225, 228)',
    padding: '25px',
    '.view-scheduling-calendar': {
      paddingTop: '25px'
    }
  }
}));

export default ViewSchedulingTemplateStyled;
