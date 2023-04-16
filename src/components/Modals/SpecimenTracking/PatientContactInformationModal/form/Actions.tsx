import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, DialogActions, Grid, Stack } from '@mui/material';
import { Translation } from 'constants/translations';
import { margins } from 'themes/themeConstants';

interface ActionsProps {
  disabled: boolean;
  onClick: () => void;
  dataCy?: string;
}

const Actions = ({ onClick, disabled, dataCy }: ActionsProps) => {
  const [t] = useTranslation();
  const confirmButtonLabel = t(Translation.MODAL_HANDOFF_CONFIRMATION_MARK_AS_INTRANSIT);

  return (
    <DialogActions sx={{ marginTop: margins.top4 }}>
      <Grid container justifyContent="flex-end" alignItems="center">
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
            <Button variant="contained" disabled={disabled} onClick={onClick} data-cy={dataCy}>
              {confirmButtonLabel}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </DialogActions>
  );
};

export default Actions;
