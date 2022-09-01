import * as React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { Grid, ListItem, Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import MuiTooltip from '@mui/material/Tooltip';

interface IInfoProps {
  title: string;
  messages: {
    title: string;
  };
}
interface PatientAlertProps {
  info?: IInfoProps[];
}

// TODO remove when Mock will be ready
const data = [
  {
    title: 'Latex Allergy:',
    messages: {
      title: 'This patient is allergic to latex. Lorem ipsum dolor sit amet.'
    }
  },
  {
    title: 'Duplicate Name: ',
    messages: {
      title: 'Multiple patient share this name. Always confirm this patients date of birth. '
    }
  },
  {
    title: 'Custom Alert: ',
    messages: {
      title: 'Lorem ipsum dolor sit amet.'
    }
  }
];

const PatientAlert = ({ info = data }: PatientAlertProps) => {
  const theme = useTheme();

  return info ? (
    <MuiTooltip
      title={info.map((titleContent: IInfoProps) => (
        <Grid item>
          <Typography variant="caption" color={theme.palette.background.paper}>
            {titleContent.title}
          </Typography>
          <ListItem sx={{ paddingTop: 0 }}>&#9679;{titleContent.messages.title}</ListItem>
        </Grid>
      ))}
    >
      <Button sx={{ m: 1 }}>
        <InfoIcon fontSize="large" />
      </Button>
    </MuiTooltip>
  ) : null;
};

export default PatientAlert;
