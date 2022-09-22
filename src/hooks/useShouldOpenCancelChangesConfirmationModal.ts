import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

const useShouldOpenCancelChangesConfirmationModal = (textFieldValue: string) => {
  const [shouldOpenCancelChangesConfirmationModal, setShouldOpenCancelChangesConfirmationModal] = useState(false);
  const router = useRouter();
  const isConfirmed = useRef(false);

  useEffect(() => {
    if (!isConfirmed.current && textFieldValue) {
      router.beforePopState(({ as: currentPath }) => {
        const isPathChanging = currentPath !== router.asPath;

        if (isPathChanging) {
          setShouldOpenCancelChangesConfirmationModal(true);
        }

        return true;
      });
      isConfirmed.current = true;
    }

    isConfirmed.current = false;

    if (shouldOpenCancelChangesConfirmationModal) {
      setShouldOpenCancelChangesConfirmationModal(false);
    }

    return router.beforePopState(() => true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return [shouldOpenCancelChangesConfirmationModal, setShouldOpenCancelChangesConfirmationModal];
};

export default useShouldOpenCancelChangesConfirmationModal;
