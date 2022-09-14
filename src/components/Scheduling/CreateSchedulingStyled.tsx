import { styled } from '@mui/material/styles';

const CreateSchedulingTemplateStyled = styled('div')(({ theme }) => ({
  '.create-scheduling-template': {
    '.create-template': {
      marginTop: '33px',
      padding: '0 66px 70px 66px',
      border: `1px solid ${theme.palette.grey[300]}`
    },

    '.create-template-box': {
      display: 'grid',
      gridTemplateColumns: ' repeat(3, minmax(0, 1fr))',
      margin: ' 25px 0',

      '.schedule-inputs': {
        gridColumn: ' span 2 / span 2'
      }
    },

    '.sub-title': {
      width: '100%',
      fontSize: '18px',
      lineHeight: '14px',
      color: theme.palette.common.black,
      margin: '20px 0'
    },

    '.week-days': {
      display: ' flex',
      justifyContent: ' space-between'
    },

    '.plus-icon': {
      background: theme.palette.grey['700'],
      color: theme.palette.common.white
    },
    '.minus-icon': {
      minWidth: '40px',
      height: '40px',
      fontSize: '12px',
      borderRadius: '50%',
      color: theme.palette.common.black,
      border: `1px solid ${theme.palette.grey[400]}`,
      padding: '5px'
    },
    '.dark-button': {
      background: `${theme.palette.grey[700]}`
    },
    '.light-button': {
      background: theme.palette.grey[100],
      color: theme.palette.common.black,
      border: `1px solid ${theme.palette.grey[300]}`
    }
  }
}));

export default CreateSchedulingTemplateStyled;
