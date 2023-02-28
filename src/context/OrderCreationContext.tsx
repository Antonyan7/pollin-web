import React, { createContext, useContext, useReducer } from 'react';

import { emptyFunction } from '@utils/contextUtils';

import { OrderCreationContextActions } from './actions/OrderCreationContextActions';
import { orderCreationReducer } from './reducers/OrderCreationReducer';
import { IOrderCreationState } from './types/OrderCreationContextTypes';

const initialState: IOrderCreationState = {
  step: 0,
  isValidationLoading: false
};

export interface IOrderCreationContext {
  orderCreationState: IOrderCreationState;
  dispatchOrderCreationState: React.Dispatch<OrderCreationContextActions>;
}

const initialOrderCreationContext: IOrderCreationContext = {
  orderCreationState: initialState,
  dispatchOrderCreationState: emptyFunction
};

const Context = createContext<IOrderCreationContext>(initialOrderCreationContext);

export const OrderCreationContext: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [orderCreationState, dispatchOrderCreationState] = useReducer(orderCreationReducer, initialState);

  const value: IOrderCreationContext = React.useMemo(
    () => ({
      orderCreationState,
      dispatchOrderCreationState
    }),
    [orderCreationState]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useOrderCreationContext = () => useContext(Context);
