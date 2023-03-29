import { RefObject, useEffect } from 'react';
import { ControllerFieldState } from 'react-hook-form';

const useScrollIntoView = (fieldRef: RefObject<HTMLInputElement>, fieldState: ControllerFieldState) => {
  useEffect(() => {
    if (fieldState.error) {
      fieldRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [fieldState.error, fieldRef]);
};

export default useScrollIntoView;
