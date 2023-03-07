import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { ordersMiddleware, ordersSelector } from '@redux/slices/orders';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const OrderTypeDropdown = () => {
  const [t] = useTranslation();
  const theme = useTheme();
  const label = t(Translation.PAGE_PATIENT_PROFILE_CELLS_CREATE_ORDER_TYPE);
  const orderTypeOptions = useSelector(ordersSelector.orderTypeOptions);
  const selectedOrderType = useSelector(ordersSelector.selectedOrderType);
  const isOrderTypesLoading = useSelector(ordersSelector.isOrderTypesLoading);

  const selectedValue = useMemo(
    () => orderTypeOptions.find(({ id }) => id === selectedOrderType) ?? null,
    [orderTypeOptions, selectedOrderType]
  );

  return (
    <Box justifyContent="end" alignItems="center">
      <Stack direction="row" alignItems="center" justifyContent="flex-start" p={paddings.all24}>
        <Typography sx={{ flexGrow: 1, width: '240px', fontSize: '16px', color: theme.palette.secondary[800] }}>
          {label}
        </Typography>

        <BaseDropdownWithLoading
          fullWidth
          popupIcon={<KeyboardArrowDownIcon color="primary" />}
          value={selectedValue}
          onChange={(_, value) => {
            if (value && typeof value === 'object' && 'id' in value) {
              dispatch(ordersMiddleware.updateSelectedOrderType(value.id));
            }
          }}
          options={[...orderTypeOptions]}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(itemResource) => (typeof itemResource === 'object' ? itemResource.title : itemResource)}
          renderInputProps={{ label }}
          isLoading={isOrderTypesLoading}
        />
      </Stack>
    </Box>
  );
};

export default OrderTypeDropdown;
