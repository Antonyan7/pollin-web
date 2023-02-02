import React, { useCallback, useEffect, useMemo, useRef } from 'react';

export const usePaginatedAutoCompleteScroll = (
  initialPage: number,
  currentPage: number,
  isLoading: boolean,
  pageSize: number,
  totalItems: number,
  onBottomReach: (currentPage: number) => void // make sure this function will be memoized with useCallback
) => {
  const initialPageValue = useRef(initialPage);
  const page = useRef(currentPage);
  const ref = useRef<HTMLDivElement | null>(null);
  const scrollPosition = useRef(0);

  useEffect(() => {
    if (!isLoading && page.current > initialPageValue.current && ref.current) {
      ref.current.scrollTop = scrollPosition.current;
    }
  }, [isLoading]);

  const onScroll = useCallback(
    (event: React.UIEvent) => {
      const eventTarget = event.target as HTMLDivElement;

      const isScrollBottom = eventTarget.scrollHeight - Math.round(eventTarget.scrollTop) === eventTarget.clientHeight;
      const isLastPage = pageSize * page.current >= totalItems;

      if (isScrollBottom && !isLastPage && !isLoading) {
        scrollPosition.current = eventTarget.scrollTop;
        page.current = 1 + page.current;
        onBottomReach(page.current);

        ref.current = eventTarget;
      }
    },
    [isLoading, onBottomReach, pageSize, totalItems]
  );

  const resetScroll = useCallback(() => {
    page.current = initialPageValue.current;
    scrollPosition.current = 0;

    if (ref.current) {
      ref.current.scrollTop = 0;
    }
  }, []);

  return useMemo(() => ({ onScroll, resetScroll }), [onScroll, resetScroll]);
};
