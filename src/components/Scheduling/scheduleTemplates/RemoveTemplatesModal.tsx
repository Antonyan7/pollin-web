import React from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  CardActions,
  CardContent,
  CardProps,
  Divider,
  Grid,
  IconButton,
  Modal,
  SelectProps,
  styled,
  Typography
} from '@mui/material';
import { Translation } from 'constants/translations';
import { dispatch, useAppSelector } from 'redux/hooks';
import { schedulingMiddleware, schedulingSelector } from 'redux/slices/scheduling';
import MainCard from 'ui-component/cards/MainCard';

import useScheduledTemplatesListContext from '@hooks/useScheduledTemplatesListContext';
import { ButtonWithLoading } from '@ui-component/common/buttons';

import { margins, paddings } from '../../../themes/themeConstants';

interface BodyProps extends CardProps {
  handleOpenClose?: () => void;
}
interface SimpleModalProps {
  handleOpenClose: () => void;
  open: boolean;
}

const StyledMainCard = styled(Box)<SelectProps>(() => ({
  textAlign: 'left',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}));

const Body = React.forwardRef(({ handleOpenClose }: BodyProps, ref: React.Ref<HTMLDivElement>) => {
  const [t] = useTranslation();
  const isScheduleLoading = useAppSelector(schedulingSelector.scheduleLoading);

  const { selected, setSelected } = useScheduledTemplatesListContext();

  const handleConfirm = () => {
    dispatch(schedulingMiddleware.deleteTemplate({ templateIds: selected }));
    handleOpenClose?.();
    setSelected([]);
  };

  return (
    <div ref={ref} tabIndex={-1}>
      <StyledMainCard>
        <MainCard
          title={t(Translation.MODAL_SCHEDULING_DELETION_TITLE)}
          content={false}
          secondary={
            <IconButton onClick={handleOpenClose} size="large">
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          <CardContent>
            <Typography variant="body1">{t(Translation.MODAL_SCHEDULING_DELETION_CONTENT_MAIN)}</Typography>
            <Typography variant="body2" sx={{ mt: margins.top2 }}>
              {t(Translation.MODAL_SCHEDULING_DELETION_CONTENT_FOOTNOTE)}
            </Typography>
          </CardContent>
          <Divider />
          <CardActions>
            <Grid container justifyContent="flex-end">
              <ButtonWithLoading
                isLoading={isScheduleLoading}
                variant="contained"
                color="primary"
                type="button"
                onClick={handleConfirm}
                sx={{ px: paddings.all32 }}
              >
                {t(Translation.MODAL_SCHEDULING_DELETION_BUTTON_CONFIRM)}
              </ButtonWithLoading>
            </Grid>
          </CardActions>
        </MainCard>
      </StyledMainCard>
    </div>
  );
});

const RemoveTemplatesModal = ({ handleOpenClose, open }: SimpleModalProps) => (
  <Grid container justifyContent="flex-end">
    <Modal
      open={open}
      onClose={handleOpenClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Body handleOpenClose={handleOpenClose} />
    </Modal>
  </Grid>
);

export default RemoveTemplatesModal;
