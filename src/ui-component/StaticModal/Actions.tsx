import React, { useContext } from 'react';
import { Button, DialogActions, Grid, Stack } from '@mui/material';
import { borderRadius, margins, paddings } from 'themes/themeConstants';

import StaticDataContext from './context';

const Actions = () => {
  const { onClose, data, toConfirm } = useContext(StaticDataContext);
  const confirmButtonLabel = data.confirmLabel;
  const cancelButtonLabel = data.cancelLabel;
  const handleConfirmation = () => {
    toConfirm();
  };

  return (
    <DialogActions sx={{ marginTop: margins.top4 }}>
      <Grid container justifyContent="flex-end" alignItems="center">
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            {cancelButtonLabel && (
              <Button
                sx={{
                  borderRadius: borderRadius.radius8,
                  py: paddings.top12,
                  px: paddings.leftRight24,
                  mr: margins.right16
                }}
                color="primary"
                variant="outlined"
                onClick={onClose}
              >
                {cancelButtonLabel}
              </Button>
            )}

            <Button
              sx={{
                borderRadius: borderRadius.radius8,
                py: paddings.top12,
                px: paddings.leftRight24
              }}
              color="primary"
              variant="contained"
              onClick={handleConfirmation}
            >
              {confirmButtonLabel}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </DialogActions>
  );
};

export default Actions;
