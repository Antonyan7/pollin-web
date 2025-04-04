import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Stack, Typography } from '@mui/material';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { margins, paddings } from 'themes/themeConstants';

import { ButtonWithLoading } from '@ui-component/common/buttons';

const Body = () => {
  const [t] = useTranslation();
  const router = useRouter();
  const { id: currentPatientId } = router.query;
  const onClickConfirm = () => {
    router.push(`/patient-emr/details/${currentPatientId}/orders`);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <Typography>{t(Translation.MODAL_CONFIRM_ORDER_CREATE_CANCEL_SUBTITLE1)}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>{t(Translation.MODAL_CONFIRM_ORDER_CREATE_CANCEL_SUBTITLE2)}</Typography>
      </Grid>

      <Grid container justifyContent="flex-end" alignItems="center" mt={margins.top4}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <ButtonWithLoading
              isLoading={false}
              sx={{
                py: paddings.top12,
                px: paddings.leftRight24
              }}
              color="primary"
              variant="contained"
              onClick={onClickConfirm}
              dataCy={CypressIds.MODAL_ORDER_CREATE_ORDER_CANCEL_CHANGES_BUTTON_CONFIRM}
            >
              {t(Translation.COMMON_BUTTON_CONFIRM_LABEL)}
            </ButtonWithLoading>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Body;
