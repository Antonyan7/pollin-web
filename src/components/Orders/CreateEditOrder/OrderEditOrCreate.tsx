import React from 'react';

import OrderTypeDropdown from '@ui-component/orders/OrderTypeDropdown';
import OrderTypes from '@ui-component/orders/OrderTypes';

const OrderEditOrCreate = () => (
  <>
    <OrderTypeDropdown />
    <OrderTypes />
  </>
);

export default OrderEditOrCreate;
