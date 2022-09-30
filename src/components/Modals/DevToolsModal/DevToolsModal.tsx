import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { updateManagersBaseUrls } from '@axios/API';
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
import { CookieKey } from 'constants/cookieKey';
import { devToolsDefaultConfig } from 'constants/defaultConfigs';
import { ModalName } from 'constants/modals';
import { useRouter } from 'next/router';
import { dispatch } from 'redux/hooks';
import { viewsMiddleware } from 'redux/slices/views';

import { getFromCookie, setToCookie } from '@utils/cookies';

const DevToolsModal = () => {
  const router = useRouter();
  const currentConfig = useMemo(() => getFromCookie(CookieKey.DEV_CONFIG, devToolsDefaultConfig), []);
  const [devConfig, setDevConfig] = useState(getFromCookie(CookieKey.DEV_CONFIG, devToolsDefaultConfig));
  const isMockServer = useMemo(() => devConfig.server === '/api', [devConfig.server]);

  useEffect(() => {
    if (devConfig) {
      setToCookie(CookieKey.DEV_CONFIG, devConfig, { maxAge: 60 * 60 * 24 * 365 });
    }
  }, [devConfig]);

  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.setModalState({ name: ModalName.NONE, props: {} }));

    if (devConfig.server !== currentConfig.server) {
      router.reload();
    }
  }, [currentConfig, devConfig, router]);

  const onServerChange = useCallback(
    (_: React.ChangeEvent<HTMLInputElement>, server: string) => {
      setDevConfig({ ...devConfig, server });
      updateManagersBaseUrls(server);
    },
    [devConfig]
  );

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
