import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SeveritiesType } from '@components/Scheduling/types';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';

const useTestResultPopupMessage = () => {
  const testResultStateStatus = useAppSelector(resultsSelector.testResultStateStatus);
  const [t] = useTranslation();

  useEffect(() => {
    if (testResultStateStatus.success) {
      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.success,
            description: t(Translation.PAGE_SCHEDULING_APPLY_ALERT_SUCCESS)
          }
        })
      );
    } else if (testResultStateStatus.fail) {
      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.error,
            description: t(Translation.PAGE_SCHEDULING_APPLY_ALERT_ERROR)
          }
        })
      );
    }

    dispatch(resultsMiddleware.resetTestResultsState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testResultStateStatus.success, testResultStateStatus.fail]);
};

export default useTestResultPopupMessage;
