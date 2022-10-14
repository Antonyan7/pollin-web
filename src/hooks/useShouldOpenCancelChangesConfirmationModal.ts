import { useEffect } from 'react';
import { ModalName } from 'constants/modals';
import { useRouter } from 'next/router';
import { dispatch } from 'redux/hooks';
import { viewsMiddleware } from 'redux/slices/views';

export enum ConfirmationPaths {
  Edit_Note = '/edit-note',
  Add_Note = '/add-note',
  Edit_Addendum = '/edit-addendum',
  Add_Addendum = '/add-addendum'
}

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
      const isModalRouteMatch =
        router.asPath.includes(ConfirmationPaths.Edit_Note) ||
        router.asPath.includes(ConfirmationPaths.Add_Note) ||
        router.asPath.includes(ConfirmationPaths.Edit_Addendum) ||
        router.asPath.includes(ConfirmationPaths.Add_Addendum);

      if (areThereUnsavedChanges && isModalRouteMatch) {
        openCancelChangesConfirmationModal();

        let fullPath;

        if (pathName === 'add-note') {
          const sanitizedPath = currentPath.split('/').slice(0, -1).join('/');

          fullPath = currentPath.includes(pathName) ? currentPath : `${sanitizedPath}/${pathName}`;
        } else {
          fullPath = currentPath.includes(pathName) ? currentPath : `${currentPath}/${pathName}`;
        }

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
