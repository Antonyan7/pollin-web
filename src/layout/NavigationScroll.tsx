import { useEffect } from 'react';
import { ReactElement } from 'react-markdown/lib/react-markdown';

// ==============================|| NAVIGATION SCROLL TO TOP ||============================== //

const NavigationScroll = ({ children }: { children: ReactElement | null }) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  return children ?? null;
};

export default NavigationScroll;
