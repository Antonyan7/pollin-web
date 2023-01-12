import { OrderCreationContextActionTypes } from '../types/OrderCreationContextTypes';

export interface IUpdateOrderCreationStepAction {
  type: typeof OrderCreationContextActionTypes.UPDATE_ORDER_CREATION_STEP;
  step: number;
}

export type OrderCreationContextActions = IUpdateOrderCreationStepAction;
