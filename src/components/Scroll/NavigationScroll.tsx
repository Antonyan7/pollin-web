import React, { PropsWithChildren, useEffect } from 'react';

const NavigationScroll = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  return <span>{children}</span>;
};

export default NavigationScroll;
