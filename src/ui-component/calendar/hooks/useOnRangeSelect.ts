import { useCallback } from 'react';
import { DateSelectArg } from '@fullcalendar/common';
import { dispatch } from 'redux/hooks';
import { viewsMiddleware } from 'redux/slices/views';
import { ModalName } from 'types/modals';

const useOnRangeSelect = () => {
  const onRangeSelect = useCallback((arg: DateSelectArg) => {
    if (new Date(arg.start).getTime() < new Date().setHours(0, 0, 0, 0)) {
      return;
    }

    dispatch(
      viewsMiddleware.openModal({
        name: ModalName.AddAppointmentModal,
        props: {
          start: arg.startStr,
          end: arg.endStr
        }
      })
    );
  }, []);

  return onRangeSelect;
};

export default useOnRangeSelect;
