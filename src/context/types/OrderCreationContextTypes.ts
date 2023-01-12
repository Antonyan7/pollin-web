export class OrderCreationContextActionTypes {
  public static readonly UPDATE_ORDER_CREATION_STEP = 'UPDATE_ORDER_CREATION_STEP';
}

export interface IOrderCreationState {
  step: number;
}
