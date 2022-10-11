import { useEffect } from 'react';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { ModalName } from 'constants/modals';
import { useRouter } from 'next/router';

const useShouldOpenCancelChangesConfirmationModal = (textFieldValue: string, previousTextFieldValue: string) => {
  const router = useRouter();
  const pathName = router.asPath.split('/')[4];
  const openCancelChangesConfirmationModal = () => {
    dispatch(viewsMiddleware.openModal({ name: ModalName.EncountersCancelChangesModal, props: null }));
  };

  useEffect(() => {
    router.beforePopState(({ as: currentPath }) => {
      const areThereUnsavedChanges =
        textFieldValue && previousTextFieldValue && textFieldValue !== previousTextFieldValue;
      const isModalRouteMatch = router.asPath.includes('/edit-note') || router.asPath.includes('/add-note');

      if (areThereUnsavedChanges && isModalRouteMatch) {
        openCancelChangesConfirmationModal();

        const fullPath = currentPath.includes(pathName) ? currentPath : `${currentPath}/${pathName}`;

        window.history.pushState('/', '');
        router.push(fullPath);

        return false;
      }

      return true;
    });

    return () => {
      router.beforePopState(({ as: currentPath }) => {
        if (currentPath.includes('encounter')) {
          router.back();

          return false;
        }

        return true;
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textFieldValue]);
};

export default useShouldOpenCancelChangesConfirmationModal;
