import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { SeveritiesType } from '@components/Scheduling/types';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';

const useSaveMedicalBackgroundDataWithToast = (onClose: () => void) => {
  const [t] = useTranslation();

  return useCallback(
    (isSuccessfullySaved: boolean) => {
      if (isSuccessfullySaved) {
        dispatch(
          viewsMiddleware.setToastNotificationPopUpState({
            open: true,
            props: {
              severityType: SeveritiesType.success,
              description: t(Translation.TOAST_PATIENT_PROFILE_MEDICAL_BACKGROUND_SUCCESS_MESSAGE)
            }
          })
        );
        onClose();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onClose]
  );
};

export default useSaveMedicalBackgroundDataWithToast;
