import { IValidatedOrderType } from '@axios/results/resultsManagerTypes';

import { OrderCreationContextActionTypes } from '../types/OrderCreationContextTypes';

export interface IUpdateOrderCreationStepAction {
  type: typeof OrderCreationContextActionTypes.UPDATE_ORDER_CREATION_STEP;
  step: number;
}

export const updateOrderCreationStep = (step: number): IUpdateOrderCreationStepAction => ({
  type: OrderCreationContextActionTypes.UPDATE_ORDER_CREATION_STEP,
  step
});

export interface IUpdateValidatedTypeGroupsAction {
  type: typeof OrderCreationContextActionTypes.UPDATE_VALIDATED_ORDER_GROUPS;
  validatedOrderTypes: IValidatedOrderType[];
}

export const updateValidatedOrderTypes = (
  validatedOrderTypes: IValidatedOrderType[]
): IUpdateValidatedTypeGroupsAction => ({
  type: OrderCreationContextActionTypes.UPDATE_VALIDATED_ORDER_GROUPS,
  validatedOrderTypes
});

export interface IUpdateIsValidationLoadingAction {
  type: typeof OrderCreationContextActionTypes.UPDATE_IS_VALIDATION_LOADING;
  isValidationLoading: boolean;
}

export const updateIsValidationLoading = (isValidationLoading: boolean): IUpdateIsValidationLoadingAction => ({
  type: OrderCreationContextActionTypes.UPDATE_IS_VALIDATION_LOADING,
  isValidationLoading
});

export type OrderCreationContextActions =
  | IUpdateOrderCreationStepAction
  | IUpdateValidatedTypeGroupsAction
  | IUpdateIsValidationLoadingAction;
