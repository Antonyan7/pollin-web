import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SpecimenActionType } from '@axios/results/resultsManagerTypes';
import CloseIcon from '@mui/icons-material/Close';
import { Box, DialogTitle, Divider, IconButton } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { margins } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

interface FormHeaderProps {
  actionType: string;
}

const FormHeader = ({ actionType }: FormHeaderProps) => {
  const [t] = useTranslation();

  const modalName = useMemo(() => {
    switch (actionType) {
      case SpecimenActionType.InProgress:
        return t(Translation.MODAL_MARK_AS_IN_PROGRESS_CONFIRM_MACHINE);
      case SpecimenActionType.Retest:
        return t(Translation.MODAL_CONFIRM_REASON_FOR_RETEST);
      case SpecimenActionType.Recollect:
        return t(Translation.MODAL_CONFIRM_REASON_FOR_RECOLLECT);
      default:
        return '';
    }
  }, [actionType, t]);

  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(ModalName.SelectMachineModal));
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'spaceBetween', marginTop: margins.top8, marginLeft: margins.left8 }}>
        <DialogTitle sx={{ fontWeight: 500 }} id="mui-6">
          {modalName}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 20,
            top: 20,
            color: (theme) => theme.palette.primary.main
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
    </>
  );
};

export default FormHeader;
