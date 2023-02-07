import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import resultsManager from '@axios/results/resultsManager';
import { IValidateOrderTypeGroupItem } from '@axios/results/resultsManagerTypes';
import { Button, Stack } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { ordersSelector } from '@redux/slices/orders';
import { viewsMiddleware } from '@redux/slices/views';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { updateOrderCreationStep, updateValidatedOrderTypes } from 'context/actions/OrderCreationContextActions';
import { useOrderCreationContext } from 'context/OrderCreationContext';
import { paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';
import { IOrderGroup, IOrderGroupItem } from 'types/reduxTypes/ordersStateTypes';

import { isAnyGroupItemSelected } from '@ui-component/orders/helpers';

const transformGroups = (groups: (IOrderGroup | IOrderGroupItem)[]): IValidateOrderTypeGroupItem[] =>
  groups.map(({ id, groupItems }) => ({
    id,
    ...(groupItems !== undefined ? { groupItems: transformGroups(groupItems) } : {})
  }));

const CreateOrderActions = () => {
  const [t] = useTranslation();
  const { orderCreationState, dispatchOrderCreationState } = useOrderCreationContext();
  const orderTypes = useSelector(ordersSelector.orderTypes);

  const onCancelClick = () => {
    dispatch(viewsMiddleware.openModal({ name: ModalName.CancelOrderCreationModal, props: null }));
  };

  const onNextButtonClick = () => {
    resultsManager
      .validateOrderCreation({
        orderTypes: orderTypes.map(({ orderTypeId: id, groups }) => ({ id, groups: transformGroups(groups) }))
      })
      .then(({ data }) => {
        if (data.message) {
          const { title, html } = data.message;

          dispatch(
            viewsMiddleware.openModal({
              name: ModalName.OrderValidationErrorModal,
              props: {
                title,
                html
              }
            })
          );
        } else {
          dispatchOrderCreationState(updateValidatedOrderTypes(data.orderTypes));
          dispatchOrderCreationState(updateOrderCreationStep(1));
        }
      });
  };

  const onCreateOrderClick = () => {
    // TODO: implement order creation
  };

  const atLeastOneSelectedItemExists = useMemo(
    () => orderTypes.some((orderGroup) => orderGroup.groups.some((group) => isAnyGroupItemSelected(group.groupItems))),
    [orderTypes]
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
      {orderCreationState.step === 0 ? (
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
