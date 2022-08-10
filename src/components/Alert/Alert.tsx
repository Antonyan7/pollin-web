import React, { useEffect, useState } from 'react';
import Alert, { AlertColor } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import { makeStyles } from '@mui/styles';

interface AlertProps {
  visible: boolean;
  errorDescription: string;
  severityType: AlertColor;
  setVisible: (isVisible: boolean) => void;
}

export enum SeveritiesType {
  success = 'success',
  error = 'error',
  info = 'info',
  warning = 'warning'
}

const useStyles = makeStyles({
  snackbar: {
    width: '250px',
    '@media (min-width: 780px)': {
      width: '500px'
    }
  },
  alertBanner: {
    width: '100%'
  }
});

export const AlertBanner = React.forwardRef(({ visible, errorDescription, severityType, setVisible }: AlertProps) => {
  const classes = useStyles();
  const [alertTitle, setAlertTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    switch (severityType) {
      case SeveritiesType.error:
        setAlertTitle('Error');
        setDescription(errorDescription);
        break;
      case SeveritiesType.success:
        setAlertTitle('Success');
        setDescription(errorDescription);
        break;
      case SeveritiesType.info:
        setAlertTitle('Info');
        setDescription(errorDescription);
        break;
      case SeveritiesType.warning:
        setAlertTitle('Warning');
        setDescription(errorDescription);
        break;
      default:
        setAlertTitle('Error');
        setDescription(errorDescription);
        break;
    }
  }, [severityType, errorDescription]);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <Snackbar
      open={visible}
      autoHideDuration={1500}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      className={classes.snackbar}
    >
      <Alert variant="filled" severity={severityType} className={classes.alertBanner}>
        <AlertTitle>{alertTitle}</AlertTitle>
        {description}
      </Alert>
    </Snackbar>
  );
});
