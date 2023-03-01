import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Grid, MenuItem, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { ordersMiddleware, ordersSelector } from '@redux/slices/orders';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { margins, paddings } from 'themes/themeConstants';
import { ICancelOrderProps } from 'types/reduxTypes/ordersStateTypes';

import { BaseSelectWithLoading } from '@ui-component/BaseDropdownWithLoading';
import { ButtonWithLoading } from '@ui-component/common/buttons';

interface BodyProps {
  orderId: string;
}

const Body = ({ orderId }: BodyProps) => {
  const [t] = useTranslation();
  const cancellationReasons = useAppSelector(ordersSelector.cancellationReasons);
  const isCancelOrderLoading = useAppSelector(ordersSelector.isCancelOrderLoading);
  const cancellationReasonsLoading = useAppSelector(ordersSelector.isCancellationReasonsLoading);
  const [reasonId, setReasonId] = useState<string>('');
  const [otherReasonContent, setOtherReasonContent] = useState<string>('');
  const router = useRouter();
  const { id: patientId } = router.query;

  const resetOrderReasons = () => {
    setReasonId('');
    setOtherReasonContent('');
  };

  const onClickConfirm = () => {
    const body: ICancelOrderProps = {
      patientId: patientId as string,
      orderId,
      reasonId,
      ...(otherReasonContent.length > 0 ? { cancellationReason: otherReasonContent } : {})
    };

    dispatch(ordersMiddleware.cancelOrder(body));
    resetOrderReasons();
  };

  const isOtherReasonSelected = useMemo(
    () => reasonId === cancellationReasons.reasons[cancellationReasons.reasons.length - 1].id,
    [reasonId, cancellationReasons.reasons]
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <Typography>{t(Translation.MODAL_CONFIRM_ORDER_CANCELLATION_SELECTED_ORDER)}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>{t(Translation.MODAL_CONFIRM_ORDER_CANCELLATION_MESSAGE_UNDONE)}</Typography>
      </Grid>
      <Grid sx={{ marginTop: margins.top16 }} item xs={12}>
        <BaseSelectWithLoading
          IconComponent={KeyboardArrowDownIcon}
          isLoading={cancellationReasonsLoading}
          id="cancel-order-label"
          labelId="cancel-order-label"
          label={t(Translation.MODAL_CONFIRM_ORDER_CANCELLATION_REASON)}
          onChange={(e: SelectChangeEvent) => {
            setReasonId(e.target.value);
          }}
        >
          {cancellationReasons.reasons.map((reasonItem) => (
            <MenuItem value={reasonItem.id} key={reasonItem.title.toString()}>
              {reasonItem.title}
            </MenuItem>
          ))}
        </BaseSelectWithLoading>
      </Grid>

      {isOtherReasonSelected && (
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="reason_for_cancellation"
            multiline
            label={t(Translation.MODAL_CONFIRM_ORDER_CANCELLATION_REASON)}
            name="reason_for_cancellation"
            rows={4}
            inputProps={{
              maxLength: 250
            }}
            onBlur={(e) => {
              setOtherReasonContent(e.target.value);
            }}
          />
        </Grid>
      )}

      <Grid container justifyContent="flex-end" alignItems="center" sx={{ marginTop: margins.top4 }}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <ButtonWithLoading
              isLoading={isCancelOrderLoading}
              sx={{
                py: paddings.top12,
                px: paddings.leftRight24,
                marginTop: margins.top16
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
