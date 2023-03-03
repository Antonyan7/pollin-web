import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import resultsHelpers from '@axios/results/resultsHelpers';
import { Button, Stack } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { ordersMiddleware, ordersSelector } from '@redux/slices/orders';
import { viewsMiddleware, viewsSelector } from '@redux/slices/views';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { updateIsValidationLoading, updateOrderCreationStep } from 'context/actions/OrderCreationContextActions';
import { useOrderCreationContext } from 'context/OrderCreationContext';
import { useRouter } from 'next/router';
import { paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import useStopRouteChange from '@hooks/useStopRouteChange';
import { isAnyGroupItemSelected } from '@ui-component/orders/helpers';

const OrderActions = ({ isEdit }: { isEdit?: boolean }) => {
  const [t] = useTranslation();
  const { orderCreationState, dispatchOrderCreationState } = useOrderCreationContext();
  const editableOrderDetails = useSelector(ordersSelector.editableOrderDetails);
  const orderDetails = useSelector(ordersSelector.orderDetails);
  const router = useRouter();
  const { id: patientId, orderId } = router.query;

  const needValidation = useMemo(
    () => window.btoa(JSON.stringify(editableOrderDetails)) !== window.btoa(JSON.stringify(orderDetails?.orderTypes)),
    [editableOrderDetails, orderDetails.orderTypes]
  );

  const onCancelClick = () => {
    router.back();
  };

  const onNextButtonClick = async () => {
    dispatchOrderCreationState(updateIsValidationLoading(true));

    if (needValidation) {
      const orderTypesToValidate = resultsHelpers.getValidatedOrderCreationData(editableOrderDetails);

      dispatch(ordersMiddleware.validateOrderCreation({ orderTypes: orderTypesToValidate }));
    }

    dispatchOrderCreationState(updateIsValidationLoading(false));
    dispatchOrderCreationState(updateOrderCreationStep(1));
  };

  const onCreateOrderClick = () => {
    if (patientId) {
      const orderTypesToValidate = resultsHelpers.getValidatedOrderCreationData(editableOrderDetails);

      dispatch(ordersMiddleware.createOrder(patientId as string, orderTypesToValidate, orderDetails.comment));
      router.push(`/patient-emr/details/${patientId}/orders`);
    }
  };

  const onConfirmOrderUpdateClick = () => {
    if (orderId && orderDetails.isEditable) {
      const orderTypesToValidate = resultsHelpers.getValidatedOrderCreationData(editableOrderDetails);

      dispatch(ordersMiddleware.updateOrder(orderId as string, orderTypesToValidate, orderDetails.comment));
    }

    router.push(`/patient-emr/details/${patientId}/orders`);
  };

  const atLeastOneSelectedItemExists = useMemo(
    () =>
      editableOrderDetails.some((orderGroup) =>
        orderGroup?.groups?.some((group) => isAnyGroupItemSelected(group.groupItems))
      ),
    [editableOrderDetails]
  );

  const openedModals = useAppSelector(viewsSelector.modals);
  const isCancelModalOpened = openedModals.find((modal) => modal.name === ModalName.CancelOrderCreationModal);

  const openCancellationModal = () => {
    dispatch(viewsMiddleware.openModal({ name: ModalName.CancelOrderCreationModal, props: null }));
  };

  useStopRouteChange(needValidation && atLeastOneSelectedItemExists && !isCancelModalOpened, openCancellationModal);

  const renderConfirmOrCreateButton = () => {
    if (isEdit) {
      return (
        <Button
          data-cy={CypressIds.PAGE_ORDER_DETAILS_BUTTON_CONFIRM}
          color="primary"
          onClick={onConfirmOrderUpdateClick}
          variant="contained"
          size="large"
        >
          {t(Translation.PAGE_ORDER_DETAILS_BUTTON_CONFIRM)}
        </Button>
      );
    }

    return (
      <Button
        data-cy={CypressIds.PAGE_CREATE_ORDER_BUTTON_CREATE_ORDER}
        color="primary"
        onClick={onCreateOrderClick}
        variant="contained"
        size="large"
      >
        {t(Translation.PAGE_CREATE_ORDER_BUTTON_CREATE_ORDER)}
      </Button>
    );
  };

  return (
    <Stack direction="row" gap={2} py={paddings.topBottom12} px={paddings.leftRight24} justifyContent="end">
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
        renderConfirmOrCreateButton()
      )}
    </Stack>
  );
};

export default OrderActions;
