import { OrderCreationContextActionTypes } from '../types/OrderCreationContextTypes';

export interface IUpdateOrderCreationStepAction {
  type: typeof OrderCreationContextActionTypes.UPDATE_ORDER_CREATION_STEP;
  step: number;
}

export const updateOrderCreationStep = (step: number): IUpdateOrderCreationStepAction => ({
  type: OrderCreationContextActionTypes.UPDATE_ORDER_CREATION_STEP,
  step
});

export interface IUpdateIsValidationLoadingAction {
  type: typeof OrderCreationContextActionTypes.UPDATE_IS_VALIDATION_LOADING;
  isValidationLoading: boolean;
}

export const updateIsValidationLoading = (isValidationLoading: boolean): IUpdateIsValidationLoadingAction => ({
  type: OrderCreationContextActionTypes.UPDATE_IS_VALIDATION_LOADING,
  isValidationLoading
});

export type OrderCreationContextActions = IUpdateOrderCreationStepAction | IUpdateIsValidationLoadingAction;
