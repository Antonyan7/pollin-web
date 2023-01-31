import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Grid, Stack, Typography, useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { ordersMiddleware, ordersSelector } from '@redux/slices/orders';
import { Translation } from 'constants/translations';
import { createOptionsGroup } from 'helpers/berryFunctions';
import { borderRadius, borders, margins, paddings } from 'themes/themeConstants';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';
import { ButtonWithLoading } from '@ui-component/common/buttons';

interface BodyProps {
  orderId: string;
}

const Body = ({ orderId }: BodyProps) => {
  const [t] = useTranslation();
  const theme = useTheme();
  const cancellationReasons = useAppSelector(ordersSelector.cancellationReasons);
  const isCancelOrderLoading = useAppSelector(ordersSelector.isCancelOrderLoading);
  const cancellationReasonsLoading = useAppSelector(ordersSelector.isCancellationReasonsLoading);
  const cancellationReasonsOptions = createOptionsGroup(cancellationReasons.reasons);
  const [reasonId, setReasonId] = useState('');

  const onClickConfirm = () => {
    dispatch(ordersMiddleware.cancelOrder(orderId, reasonId));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <Typography>{t(Translation.MODAL_CONFIRM_ORDER_CANCELLATION_SELECTED_ORDER)}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>{t(Translation.MODAL_CONFIRM_ORDER_CANCELLATION_MESSAGE_UNDONE)}</Typography>
      </Grid>
      <Grid item xs={12}>
        <BaseDropdownWithLoading
          isLoading={cancellationReasonsLoading}
          ListboxProps={{
            style: {
              maxHeight: 260,
              borderRadius: `${borderRadius.radius8}`,
              border: `${borders.solid2px} ${theme.palette.primary.main}`
            }
          }}
          isOptionEqualToValue={(option, value) => option.item.id === value.item.id}
          onChange={(_, value) => {
            if (value && typeof value === 'object' && 'item' in value) {
              setReasonId(value.item.id);
            }
          }}
          options={cancellationReasonsOptions}
          groupBy={(option) => option.firstLetter}
          getOptionLabel={(option) => (typeof option === 'object' ? option.item.title : option)}
          clearIcon={<CloseIcon onClick={() => setReasonId('')} fontSize="small" />}
          popupIcon={<KeyboardArrowDownIcon sx={{ color: theme.palette.primary.main }} />}
          renderInputProps={{
            label: t(Translation.MODAL_CONFIRM_ORDER_CANCELLATION_REASON)
          }}
        />
      </Grid>

      <Grid container justifyContent="flex-end" alignItems="center" sx={{ marginTop: margins.top4 }}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <ButtonWithLoading
              isLoading={isCancelOrderLoading}
              sx={{
                py: paddings.top12,
                px: paddings.leftRight24
              }}
              color="primary"
              variant="contained"
              onClick={onClickConfirm}
              disabled={!reasonId}
            >
              {t(Translation.COMMON_BUTTON_CONFIRM_LABEL)}
            </ButtonWithLoading>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Body;
