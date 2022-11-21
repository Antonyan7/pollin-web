import React, { createContext, PropsWithChildren, useContext } from 'react';
import { Box, BoxProps } from '@mui/material';

import BottomBarLoading from './BottomBarLoading';

export const BaseDropdownWithLoadingContext = createContext(false);

export interface ListboxProps extends PropsWithChildren, BoxProps {}

const Listbox = React.forwardRef(({ children, ...otherProps }: ListboxProps, ref) => {
  const isLoading = useContext(BaseDropdownWithLoadingContext);

  return (
    <Box component="ul" ref={ref} {...otherProps}>
      {children}
      {isLoading && <BottomBarLoading />}
    </Box>
  );
});

export default Listbox;
