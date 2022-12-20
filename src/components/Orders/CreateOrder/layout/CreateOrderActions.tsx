import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Stack } from '@mui/material';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

const CreateOrderActions = () => {
  const [t] = useTranslation();
  const onCancelClick = () => {
    // TODO: implement order cancelation
  };

  const onCreateOrderClick = () => {
    // TODO: implement order creation
  };

  return (
    <Stack direction="row" gap={2} py={paddings.all12} px={paddings.all24} justifyContent="end">
      <Button
        data-cy={t(CypressIds.PAGE_CREATE_ORDER_BUTTON_CANCEL)}
        color="primary"
        onClick={onCancelClick}
        variant="outlined"
        size="large"
      >
        {t(Translation.PAGE_CREATE_ORDER_BUTTON_CANCEL)}
      </Button>
      <Button
        data-cy={t(CypressIds.PAGE_CREATE_ORDER_BUTTON_CREATE_ORDER)}
        color="primary"
        onClick={onCreateOrderClick}
        variant="contained"
        size="large"
      >
        {t(Translation.PAGE_CREATE_ORDER_BUTTON_CREATE_ORDER)}
      </Button>
    </Stack>
  );
};

export default CreateOrderActions;
