import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogTitle, Divider } from '@mui/material';
import { Translation } from 'constants/translations';

const FormHeader = () => {
  const [t] = useTranslation();

  return (
    <>
      <DialogTitle sx={{ fontWeight: 700 }} id="mui-6">
        {t(Translation.MODAL_APPOINTMENTS_ADD_TITLE)}
      </DialogTitle>
      <Divider />
    </>
  );
};

export default FormHeader;
