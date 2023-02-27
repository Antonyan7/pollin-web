import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledButton } from '@components/common/MaterialComponents';
import { dispatch } from '@redux/hooks';
import { patientsMiddleware } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { margins } from 'themes/themeConstants';

const CancelButton = () => {
  const [t] = useTranslation();
  const onCancelClick = () => {
    dispatch(patientsMiddleware.changeEditButtonClickState());
  };

  return (
    <StyledButton
      color="primary"
      onClick={onCancelClick}
      variant="outlined"
      size="large"
      sx={{ marginRight: margins.all20, marginLeft: margins.auto }}
    >
      {t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_CONTACT_BUTTON_CANCEL)}
    </StyledButton>
  );
};

export default CancelButton;
