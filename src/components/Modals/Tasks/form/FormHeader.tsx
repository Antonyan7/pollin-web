import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { Box, DialogTitle, Divider, IconButton } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { margins } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import { useCreateOrEditModalContext } from '../hooks/useCreateOrEditModalContext';

const FormHeader = () => {
  const [t] = useTranslation();
  const task = useCreateOrEditModalContext();
  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(task ? ModalName.EditTaskModal : ModalName.CreateTaskModal));
  }, [task]);
  const taskCreateOrEditFormHeader = t(
    task ? Translation.PAGE_TASKS_MANAGER_MODAL_EDIT_TASK_TITLE : Translation.PAGE_TASKS_MANAGER_MODAL_CREATE_TITLE
  );

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'spaceBetween', marginTop: margins.top8, marginLeft: margins.left8 }}>
        <DialogTitle sx={{ fontWeight: 500 }} id="mui-6">
          {taskCreateOrEditFormHeader}
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
