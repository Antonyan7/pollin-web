import React, { PropsWithChildren, useContext } from 'react';
import { Box, BoxProps } from '@mui/material';

import { BaseDropdownWithLoadingContext } from './context/BaseDropdownWithLoadingContext';
import BottomBarLoading from './BottomBarLoading';

export interface ListboxProps extends PropsWithChildren, BoxProps {}

const ListBoxLoading = () => {
  const isLoading = useContext(BaseDropdownWithLoadingContext);

  return isLoading ? <BottomBarLoading /> : null;
};

const Listbox = React.forwardRef(({ children, ...otherProps }: ListboxProps, ref) => (
  <Box component="ul" ref={ref} {...otherProps}>
    {children}
    <ListBoxLoading />
  </Box>
));

export default Listbox;
