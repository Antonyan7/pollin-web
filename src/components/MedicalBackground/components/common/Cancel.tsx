import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledButton } from '@components/common/MaterialComponents';
import { Translation } from 'constants/translations';
import { margins } from 'themes/themeConstants';

export interface CancelButtonProps {
  onClick: () => void;
}

const CancelButton = ({ onClick }: CancelButtonProps) => {
  const [t] = useTranslation();

  return (
    <StyledButton
      color="primary"
      onClick={onClick}
      variant="outlined"
      size="large"
      sx={{ marginRight: margins.all20, marginLeft: margins.auto }}
    >
      {t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_CONTACT_BUTTON_CANCEL)}
    </StyledButton>
  );
};

export default CancelButton;
