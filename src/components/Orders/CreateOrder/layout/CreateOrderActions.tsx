import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Button, Stack } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { ordersSelector } from '@redux/slices/orders';
import { viewsMiddleware } from '@redux/slices/views';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import { isAnyGroupItemSelected } from '@ui-component/orders/helpers';

import { useOrderCreationContext } from '../../../../context/OrderCreationContext';
import { OrderCreationContextActionTypes } from '../../../../context/types/OrderCreationContextTypes';

const CreateOrderActions = () => {
  const [t] = useTranslation();
  const { orderCreationInfo, setOrderCreationInfo } = useOrderCreationContext();
  const orderGroups = useSelector(ordersSelector.orderGroups);

  const onCancelClick = () => {
    dispatch(viewsMiddleware.openModal({ name: ModalName.CancelOrderCreationModal, props: null }));
  };

  const onNextButtonClick = () => {
    setOrderCreationInfo({ type: OrderCreationContextActionTypes.UPDATE_ORDER_CREATION_STEP, step: 1 });
  };

  const onCreateOrderClick = () => {
    // TODO: implement order creation
  };

  const atLeastOneSelectedItemExists = useMemo(
    () => orderGroups.some((orderGroup) => orderGroup.groups.some((group) => isAnyGroupItemSelected(group.groupItems))),
    [orderGroups]
  );

  return (
    <Stack direction="row" gap={2} py={paddings.all12} px={paddings.all24} justifyContent="end">
      <Button
        data-cy={CypressIds.PAGE_CREATE_ORDER_BUTTON_CANCEL}
        color="primary"
        onClick={onCancelClick}
        variant="outlined"
        size="large"
      >
        {t(Translation.PAGE_CREATE_ORDER_BUTTON_CANCEL)}
      </Button>
      {orderCreationInfo.step === 0 ? (
        <Button
          data-cy={CypressIds.PAGE_CREATE_ORDER_BUTTON_NEXT}
          color="primary"
          onClick={onNextButtonClick}
          disabled={!atLeastOneSelectedItemExists}
          variant="contained"
          size="large"
        >
          {t(Translation.PAGE_CREATE_ORDER_BUTTON_NEXT)}
        </Button>
      ) : (
        <Button
          data-cy={CypressIds.PAGE_CREATE_ORDER_BUTTON_CREATE_ORDER}
          color="primary"
          onClick={onCreateOrderClick}
          variant="contained"
          size="large"
        >
          {t(Translation.PAGE_CREATE_ORDER_BUTTON_CREATE_ORDER)}
        </Button>
      )}
    </Stack>
  );
};

export default CreateOrderActions;
