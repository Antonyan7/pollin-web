import React, { useCallback, useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import { makeStyles } from '@mui/styles';
import capitalizer from 'helpers/capitalizer';
import { dispatch, useAppSelector } from 'redux/hooks';
import { viewsMiddleware, viewsSelector } from 'redux/slices/views';

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

export const AlertBanner = React.forwardRef(() => {
  const classes = useStyles();
  const alertPopUp = useAppSelector(viewsSelector.alertPopUp);
  const [alertTitle, setAlertTitle] = useState<string>('');

  useEffect(() => {
    if (alertPopUp.props.severityType) {
      const capitalizedAlertTitle = capitalizer(alertPopUp.props.severityType);

      setAlertTitle(capitalizedAlertTitle);
    }
  }, [alertPopUp.props.severityType]);

  const onClose = useCallback(() => {
    dispatch(
      viewsMiddleware.setAlertPopUpState({
        open: false,
        props: {}
      })
    );
  }, []);

  return (
    <Snackbar
      open={alertPopUp.open}
      autoHideDuration={2000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      className={classes.snackbar}
    >
      <Alert variant="filled" severity={alertPopUp.props.severityType} className={classes.alertBanner}>
        <AlertTitle>{alertTitle}</AlertTitle>
        {alertPopUp.props.description}
      </Alert>
    </Snackbar>
  );
});
