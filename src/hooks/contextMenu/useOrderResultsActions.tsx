import { useCallback } from 'react';
import { OrderResultActionType } from '@axios/results/resultsManagerTypes';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { CypressIds } from 'constants/cypressIds';
import { filterActionBindings, getActionTitleById } from 'helpers/contextMenu';
import { ModalName } from 'types/modals';
import { ContextMenuAction } from 'types/reduxTypes/resultsStateTypes';

const useOrderResultsActions = (row: { id: string }, actions: ContextMenuAction[] = []) => {
  const handleTestResultReleaseConfirmationAction = useCallback(() => {
    dispatch(
      viewsMiddleware.openModal({
        name: ModalName.TestResultReleaseConfirmation,
        props: { testResultId: row.id }
      })
    );
  }, [row.id]);

  const handleTestResultReviewConfirmationAction = useCallback(() => {
    dispatch(
      viewsMiddleware.openModal({
        name: ModalName.TestResultReviewConfirmation,
        props: { testResultId: row.id }
      })
    );
  }, [row.id]);

  const actionBindings = [
    {
      id: OrderResultActionType.Release,
      title: getActionTitleById(OrderResultActionType.Release, actions),
      actionCallback: () => {
        handleTestResultReleaseConfirmationAction();
      },
      dataCy: CypressIds.PAGE_ORDER_RESULTS_MENU_ACTION_RELEASE_TO_PATIENT
    },
    {
      id: OrderResultActionType.Review,
      title: getActionTitleById(OrderResultActionType.Review, actions),
      actionCallback: () => {
        handleTestResultReviewConfirmationAction();
      },
      dataCy: CypressIds.PAGE_ORDER_RESULTS_MENU_ACTION_MARK_AS_REVIEWED
    }
  ];

  return filterActionBindings(actions, actionBindings);
};

export default useOrderResultsActions;
