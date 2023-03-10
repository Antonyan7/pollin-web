import React from 'react';
import { useTranslation } from 'react-i18next';
import { Translation } from 'constants/translations';

import { ButtonWithLoading } from '@ui-component/common/buttons';

const SaveButton = () => {
  const [t] = useTranslation();

  return (
    <ButtonWithLoading
      isLoading={false}
      color="primary"
      variant="contained"
      type="submit"
      sx={{
        height: 45
      }}
    >
      {t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_CONTACT_BUTTON_SAVE)}
    </ButtonWithLoading>
  );
};

export default SaveButton;
