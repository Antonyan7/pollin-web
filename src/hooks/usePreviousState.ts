import { MutableRefObject, useEffect, useRef } from 'react';

const usePreviousState = (nextValue: string, stale?: boolean) => {
  const previousState: MutableRefObject<string> = useRef('');

  useEffect(() => {
    if (stale) {
      const isInitialized = previousState.current === '';

      if (isInitialized) {
        previousState.current = nextValue;
      }
    } else {
      previousState.current = nextValue;
    }
  }, [nextValue, stale]);

  return previousState.current;
};

export default usePreviousState;
