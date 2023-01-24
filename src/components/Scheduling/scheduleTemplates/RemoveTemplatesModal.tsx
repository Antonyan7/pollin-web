import React from 'react';
import { useTranslation } from 'react-i18next';
import { CardProps, Grid, Modal } from '@mui/material';
import { Translation } from 'constants/translations';
import { useScheduleTemplatesContext } from 'context/ScheduleTemplatesContext';
import { dispatch } from 'redux/hooks';
import { schedulingMiddleware } from 'redux/slices/scheduling';

import StaticModal from '@ui-component/StaticModal';

interface BodyProps extends CardProps {
  handleOpenClose: () => void;
}
interface SimpleModalProps {
  handleOpenClose: () => void;
  open: boolean;
}

const Body = React.forwardRef(({ handleOpenClose }: BodyProps) => {
  const [t] = useTranslation();
  const { selected, setSelected } = useScheduleTemplatesContext();

  const handleConfirm = () => {
    dispatch(schedulingMiddleware.deleteTemplate({ templateIds: selected }));
    handleOpenClose();
    setSelected([]);
  };

  return (
    <StaticModal
      data={{
        headerTitle: t(Translation.MODAL_SCHEDULING_DELETION_TITLE),
        explanationMessage: t(Translation.MODAL_SCHEDULING_DELETION_CONTENT_MAIN),
        actualQuestion: t(Translation.MODAL_SCHEDULING_DELETION_CONTENT_FOOTNOTE) ?? '',
        confirmLabel: t(Translation.COMMON_BUTTON_CONFIRM_LABEL)
      }}
      onClose={handleOpenClose}
      toConfirm={handleConfirm}
    />
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
