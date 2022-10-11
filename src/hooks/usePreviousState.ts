import { MutableRefObject, useEffect, useRef } from 'react';

const usePreviousState = (nextValue: string, stale: boolean) => {
  const previousState: MutableRefObject<string> = useRef('');

  useEffect(() => {
    if (stale) {
      const isInitalized = previousState.current === '';

      if (isInitalized) {
        previousState.current = nextValue;
      }
    } else {
      previousState.current = nextValue;
    }
  }, [nextValue, stale]);

  return previousState.current;
};

export default usePreviousState;
