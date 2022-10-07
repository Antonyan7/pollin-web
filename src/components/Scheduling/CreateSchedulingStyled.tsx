import { styled } from '@mui/material/styles';

const CreateSchedulingTemplateStyled = styled('div')(({ theme }) => ({
  '.create-scheduling-template': {
    marginTop: theme.spacing(3),
    '.create-template-box': {
      display: 'grid',
      gridTemplateColumns: ' repeat(4, minmax(0, 1fr))',
      margin: `${theme.spacing(3)} 0`,
      gridGap: theme.spacing(3),

      '.schedule-inputs': {
        gridColumn: ' span 3 / span 3'
      },
      '.schedule-days-checkbox': {
        maxWidth: 520
      }
    },

    '.sub-title': {
      width: '100%',
      fontSize: '18px'
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
      minWidth: theme.spacing(7),
      height: theme.spacing(7),
      borderRadius: '50%',
      color: theme.palette.secondary.main,
      border: `1px solid ${theme.palette.secondary.main}`,
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
