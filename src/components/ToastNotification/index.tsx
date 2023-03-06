import React from 'react';
import { CheckCircleOutlineTwoTone, Circle, ReportTwoTone } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Grid, IconButton, List, ListItem, Typography } from '@mui/material';
import { dispatch, useAppSelector } from 'redux/hooks';
import { viewsMiddleware, viewsSelector } from 'redux/slices/views';
import { margins, paddings } from 'themes/themeConstants';

import Toast from './styled/Toast';

export const ToastNotification = React.forwardRef(() => {
  const toastNotificationPopUp = useAppSelector(viewsSelector.toastNotificationPopUp);
  const notificationType = toastNotificationPopUp.props.severityType;
  const notificationDescription = toastNotificationPopUp.props?.description;
  const notificationRenderList = toastNotificationPopUp.props?.renderList;
  const notificationDataCy = toastNotificationPopUp.props?.dataCy;

  const onClose = () =>
    dispatch(
      viewsMiddleware.setToastNotificationPopUpState({
        open: false,
        props: {}
      })
    );

  return (
    <Toast
      open={toastNotificationPopUp.open}
      autoHideDuration={2000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <div {...(notificationDataCy && { 'data-cy': notificationDataCy })}>
        <Alert
          variant="filled"
          severity={notificationType}
          icon={notificationType === 'error' ? <ReportTwoTone /> : <CheckCircleOutlineTwoTone />}
          className="alert-banner"
          action={
            <IconButton
              aria-label="close"
              sx={{
                fontSize: (theme) => theme.typography.pxToRem(24)
              }}
              onClick={onClose}
            >
              <CloseIcon fontSize="inherit" sx={{ color: (theme) => theme.palette.common.white }} />
            </IconButton>
          }
        >
          {notificationDescription && (
            <Typography sx={{ fontWeight: 600, color: (theme) => theme.palette.common.white }}>
              {notificationDescription}
            </Typography>
          )}
          {notificationRenderList && (
            <Grid>
              <Typography>{notificationRenderList.header}</Typography>
              <List>
                {notificationRenderList.items.map((item: string) => (
                  <ListItem
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      margin: 0,
                      padding: 0,
                      pl: paddings.left8
                    }}
                  >
                    <Circle
                      sx={{
                        fontSize: (theme) => theme.typography.pxToRem(7),
                        color: (theme) => theme.palette.common.white
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: (theme) => theme.typography.pxToRem(14),
                        color: (theme) => theme.palette.common.white,
                        ml: margins.left8
                      }}
                    >
                      {item}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Grid>
          )}
        </Alert>
      </div>
    </Toast>
  );
});
