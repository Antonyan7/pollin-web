import { IValidatedOrderType } from '@axios/results/resultsManagerTypes';

export class OrderCreationContextActionTypes {
  public static readonly UPDATE_ORDER_CREATION_STEP = 'UPDATE_ORDER_CREATION_STEP';

  public static readonly UPDATE_VALIDATED_ORDER_GROUPS = 'UPDATE_VALIDATED_ORDER_GROUPS';
}

export interface IOrderCreationState {
  step: number;
  validatedOrderTypes: IValidatedOrderType[];
}
