import React, { createContext, useContext, useReducer } from 'react';

import { OrderCreationContextActions } from './actions/OrderCreationContextActions';
import { orderCreationReducer } from './reducers/OrderCreationReducer';
import { IOrderCreationState } from './types/OrderCreationContextTypes';

const initialState: IOrderCreationState = {
  step: 0
};

export interface IOrderCreationContext {
  orderCreationInfo: IOrderCreationState;
  setOrderCreationInfo: React.Dispatch<OrderCreationContextActions>;
}

const initialOrderCreationContext: IOrderCreationContext = {
  orderCreationInfo: initialState,
  setOrderCreationInfo: () => {}
};

const Context = createContext<IOrderCreationContext>(initialOrderCreationContext);

export const OrderCreationContext: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [orderCreationInfo, setOrderCreationInfo] = useReducer(orderCreationReducer, initialState);

  const value: IOrderCreationContext = React.useMemo(
    () => ({
      orderCreationInfo,
      setOrderCreationInfo
    }),
    [orderCreationInfo]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useOrderCreationContext = () => useContext(Context);
