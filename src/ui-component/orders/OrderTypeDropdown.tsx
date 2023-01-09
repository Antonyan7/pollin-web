import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { dispatch } from '@redux/hooks';
import { ordersMiddleware, ordersSelector } from '@redux/slices/orders';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const OrderTypeDropdown = () => {
  const [t] = useTranslation();
  const theme = useTheme();
  const label = t(Translation.PAGE_PATIENT_PROFILE_CELLS_CREATE_ORDER_TYPE);
  const orderTypes = useSelector(ordersSelector.orderTypes);
  const isOrderTypesLoading = useSelector(ordersSelector.isOrderTypesLoading);

  useEffect(() => {
    dispatch(ordersMiddleware.getOrderTypes());
  }, []);

  return (
    <Box
      py={paddings.all24}
      px={paddings.all24}
      justifyContent="end"
      borderTop={`1px solid ${theme.palette.primary.light}`}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        px={paddings.all12}
        pb={paddings.all24}
        borderBottom={`1px solid ${theme.palette.primary.light}`}
      >
        <Typography sx={{ flexGrow: 1, width: '240px', fontSize: '16px', color: theme.palette.secondary[800] }}>
          {label}
        </Typography>

        <BaseDropdownWithLoading
          fullWidth
          popupIcon={<KeyboardArrowDownIcon color="primary" />}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(_, value) => {
            if (value && typeof value === 'object' && 'id' in value) {
              dispatch(ordersMiddleware.updateSelectedOrderType(value.id));
            }
          }}
          options={orderTypes}
          getOptionLabel={(itemResource) => (typeof itemResource === 'object' ? itemResource.title : itemResource)}
          renderInputProps={{ label }}
          isLoading={isOrderTypesLoading}
        />
      </Stack>
    </Box>
  );
};

export default OrderTypeDropdown;
