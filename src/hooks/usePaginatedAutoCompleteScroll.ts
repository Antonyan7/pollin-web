import React, { useEffect, useRef } from 'react';

export const usePaginatedAutoCompleteScroll = (
  initialPage: number,
  isLoading: boolean,
  pageSize: number,
  totalItems: number,
  onBottomReach: (currentPage: number) => void
) => {
  const initialPageValue = useRef(initialPage);
  const page = useRef(initialPage);
  const ref = useRef<HTMLDivElement | null>(null);
  const scrollPosition = useRef(0);

  useEffect(() => {
    if (!isLoading && page.current > initialPageValue.current && ref.current) {
      ref.current.scrollTop = scrollPosition.current;
    }
  }, [isLoading]);

  return (event: React.UIEvent) => {
    const eventTarget = event.target as HTMLDivElement;

    const isScrollBottom = eventTarget.scrollHeight - Math.round(eventTarget.scrollTop) === eventTarget.clientHeight;
    const isLastPage = pageSize * page.current >= totalItems;

    if (isScrollBottom && !isLastPage && !isLoading) {
      scrollPosition.current = eventTarget.scrollTop;
      page.current = 1 + page.current;

      onBottomReach(page.current);

      ref.current = eventTarget;
    }
  };
};
