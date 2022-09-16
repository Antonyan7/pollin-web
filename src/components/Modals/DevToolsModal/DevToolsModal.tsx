import React, { useCallback, useMemo } from 'react';
import API, { updateManagersBaseUrls } from '@axios/API';
import { CloseOutlined } from '@mui/icons-material';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material';
import { ModalName } from 'constants/modals';
import { dispatch } from 'redux/hooks';
import { viewsMiddleware } from 'redux/slices/views';

const getBaseURL = () => API.booking.axiosInstance.defaults.baseURL;

const DevToolsModal = () => {
  const [server, setServer] = React.useState<string>(getBaseURL());

  const isMockServer = useMemo(() => server === '/api', [server]);
  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.setModalState({ name: ModalName.NONE, props: {} }));
  }, []);

  const onServerChange = useCallback((_: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setServer(value);
    updateManagersBaseUrls(value);
  }, []);

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <Grid>
        <DialogTitle>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 700
                }}
              >
                Dev tools
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={onClose}>
                <CloseOutlined />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormLabel id="server">Server</FormLabel>
              <RadioGroup onChange={onServerChange} name="server" aria-labelledby="server">
                <FormControlLabel value="/api" control={<Radio checked={isMockServer} />} label="Mock" />
                <FormControlLabel
                  value="https://pollin-backend-dev.nn.r.appspot.com"
                  control={<Radio checked={!isMockServer} />}
                  label="Dev"
                />
              </RadioGroup>
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
      </Grid>
    </Dialog>
  );
};

export default DevToolsModal;
