import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

const ResultsCancelButton = () => {
  const { formState } = useFormContext();
  const router = useRouter();
  const [t] = useTranslation();

  const areFormDefaultValuesChanged = formState.isDirty;

  const handleResultsCancel = () => {
    if (areFormDefaultValuesChanged) {
      dispatch(
        viewsMiddleware.openModal({
          name: ModalName.InHouseTestResults,
          props: {}
        })
      );
    } else {
      router.back();
    }
  };

  return (
    <Button
      onClick={handleResultsCancel}
      sx={{ fontWeight: 500, px: paddings.leftRight16, py: paddings.topBottom12 }}
      variant="outlined"
    >
      {t(Translation.COMMON_BUTTON_CANCEL_LABEL)}
    </Button>
  );
};

export default ResultsCancelButton;
