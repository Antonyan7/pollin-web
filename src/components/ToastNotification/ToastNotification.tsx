/* eslint-disable react/no-danger */
import React from 'react';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import { makeStyles } from '@mui/styles';
import { dispatch, useAppSelector } from 'redux/hooks';
import { viewsMiddleware, viewsSelector } from 'redux/slices/views';

const useStyles = makeStyles({
  snackbar: {
    width: '30wv',
    '@media (min-width: 780px)': {
      width: '40wv'
    }
  },
  alertBanner: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    '& .MuiAlert-icon': {
      fontSize: 30
    }
  }
});

export const ToastNotification = React.forwardRef(() => {
  const classes = useStyles();
  const toastNotificationPopUp = useAppSelector(viewsSelector.toastNotificationPopUp);

  const onClose = () =>
    dispatch(
      viewsMiddleware.setToastNotificationPopUpState({
        open: false,
        props: {}
      })
    );

  return (
    <Snackbar
      open={toastNotificationPopUp.open}
      autoHideDuration={2000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      className={classes.snackbar}
    >
      <Alert
        icon={<CheckCircleTwoToneIcon fontSize="inherit" sx={{ color: (theme) => theme.palette.common.white }} />}
        variant="filled"
        severity={toastNotificationPopUp.props.severityType}
        className={classes.alertBanner}
        action={
          <IconButton aria-label="close" size="large" onClick={onClose}>
            <CloseIcon fontSize="inherit" sx={{ color: (theme) => theme.palette.common.white }} />
          </IconButton>
        }
      >
        <Typography sx={{ fontWeight: 600, color: (theme) => theme.palette.common.white }}>
          <div dangerouslySetInnerHTML={{ __html: toastNotificationPopUp.props.description }} />
        </Typography>
      </Alert>
    </Snackbar>
  );
});
