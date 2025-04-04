import { OrderCreationContextActions } from '../actions/OrderCreationContextActions';
import { IOrderCreationState, OrderCreationContextActionTypes } from '../types/OrderCreationContextTypes';

export const orderCreationReducer = (
  state: IOrderCreationState,
  action: OrderCreationContextActions
): IOrderCreationState => {
  switch (action.type) {
    case OrderCreationContextActionTypes.UPDATE_ORDER_CREATION_STEP:
      return {
        ...state,
        step: action.step
      };
    case OrderCreationContextActionTypes.UPDATE_IS_VALIDATION_LOADING:
      return {
        ...state,
        isValidationLoading: action.isValidationLoading
      };
    default:
      return state;
  }
};
