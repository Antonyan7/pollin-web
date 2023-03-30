import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useReplaceCurrentURLMedications = (currentPageIndex = 0) => {
  const router = useRouter();

  useEffect(
    () => {
      switch (currentPageIndex) {
        case 0:
          router.replace({
            query: {
              ...router.query,
              tab: 'prescriptions'
            }
          });
          break;
        case 1:
          router.replace({
            query: {
              ...router.query,
              tab: 'medications'
            }
          });
          break;
        default:
          router.replace({
            query: {
              ...router.query
            }
          });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPageIndex]
  );
};

export default useReplaceCurrentURLMedications;
