export class OrderCreationContextActionTypes {
  public static readonly UPDATE_ORDER_CREATION_STEP = 'UPDATE_ORDER_CREATION_STEP';

  public static readonly UPDATE_IS_VALIDATION_LOADING = 'UPDATE_IS_VALIDATION_LOADING';
}

export interface IOrderCreationState {
  step: number;
  isValidationLoading: boolean;
}
