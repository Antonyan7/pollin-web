import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, DialogActions, Grid, Stack } from '@mui/material';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

const FormActions = () => {
  const [t] = useTranslation();
  const addButtonLabel = t(Translation.COMMON_BUTTON_CONFIRM_LABEL);

  return (
    <DialogActions sx={{ padding: `${paddings.topBottom16} ${paddings.leftRight8}` }}>
      <Grid container justifyContent="flex-end" alignItems="center">
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
            <Button
              variant="contained"
              type="submit"
              sx={{
                height: 45
              }}
            >
              {addButtonLabel}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </DialogActions>
  );
};

export default FormActions;
