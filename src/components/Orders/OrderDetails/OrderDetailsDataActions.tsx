import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

const OrderDetailsDataActions = () => {
  const [t] = useTranslation();
  const theme = useTheme();
  const onDownloadClick = () => {
    // TODO: implement download
  };

  return (
    <Stack
      direction="row"
      gap={2}
      py={paddings.all12}
      px={paddings.all24}
      borderBottom={`1px solid ${theme.palette.primary.light}`}
    >
      <Button
        data-cy={t(CypressIds.PAGE_ORDER_DETAILS_BUTTON_DOWNLOAD_REQUISITIONS)}
        color="primary"
        onClick={onDownloadClick}
        variant="contained"
        size="large"
        sx={{ textTransform: 'none' }}
      >
        {t(Translation.PAGE_ORDER_DETAILS_BUTTON_DOWNLOAD_REQUISITIONS)}
      </Button>
    </Stack>
  );
};

export default OrderDetailsDataActions;
