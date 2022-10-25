import React, { createContext, PropsWithChildren, useContext } from 'react';
import { Box } from '@mui/material';

import BottombarLoading from './BottombarLoading';

export const BaseDropdownWithLoadingContext = createContext(false);

// eslint-disable-next-line react/prop-types
const Listbox: React.FC<PropsWithChildren> = React.forwardRef(({ children, ...otherProps }, ref) => {
  const isLoading = useContext(BaseDropdownWithLoadingContext);

  return (
    <Box component="ul" ref={ref} {...otherProps}>
      {children}
      {isLoading && <BottombarLoading />}
    </Box>
  );
});

export default Listbox;
