import { useCallback } from 'react';
import { DateSelectArg } from '@fullcalendar/common';
import { ModalName } from 'constants/modals';
import { dispatch } from 'redux/hooks';
import { viewsMiddleware } from 'redux/slices/views';

const useOnRangeSelect = () => {
  const onRangeSelect = useCallback((arg: DateSelectArg) => {
    if (new Date(arg.start).getTime() < new Date().setHours(0, 0, 0, 0)) {
      return;
    }

    dispatch(
      viewsMiddleware.setModalState({
        name: ModalName.AddAppointmentsModal,
        props: {
          start: arg.start,
          end: arg.end
        }
      })
    );
  }, []);

  return onRangeSelect;
};

export default useOnRangeSelect;
