import React from 'react';
import { useTranslation } from 'react-i18next';
import { Translation } from 'constants/translations';

import { ButtonWithLoading } from '@ui-component/common/buttons';

const SaveButton = ({ isLoading = false, isDisabled = false }: { isLoading?: boolean; isDisabled?: boolean }) => {
  const [t] = useTranslation();

  return (
    <ButtonWithLoading
      isLoading={isLoading}
      color="primary"
      variant="contained"
      type="submit"
      sx={{
        height: 45
      }}
      disabled={isDisabled}
    >
      {t(Translation.COMMON_BUTTON_SAVE_LABEL)}
    </ButtonWithLoading>
  );
};

export default SaveButton;
