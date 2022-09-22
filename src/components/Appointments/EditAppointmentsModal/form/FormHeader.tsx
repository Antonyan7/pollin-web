import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogTitle, Divider } from '@mui/material';
import { Translation } from 'constants/translations';

const FormHeader = () => {
  const [t] = useTranslation();
  const editTitleLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_TITLE);

  return (
    <>
      <DialogTitle sx={{ fontWeight: 700 }} id="mui-6">
        {editTitleLabel}
      </DialogTitle>
      <Divider />
    </>
  );
};

export default FormHeader;
