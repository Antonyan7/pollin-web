import { useCallback } from 'react';
import { dispatch } from '@redux/hooks';
import { plansMiddleware } from '@redux/slices/plans';
import { filterActionBindings } from 'helpers/contextMenu';
import { PlanActions } from 'types/reduxTypes/plansTypes';
import { ContextMenuAction } from 'types/reduxTypes/resultsStateTypes';

const usePlansActions = (planId: string, actions: ContextMenuAction[] = []) => {
  const markThePlanAsCancelled = useCallback(() => {
    dispatch(plansMiddleware.markThePlanAsCancelled({ planId }));
  }, [planId]);

  const markThePlanAsActive = useCallback(() => {
    dispatch(plansMiddleware.markThePlanAsActive({ planId }));
  }, [planId]);

  const markThePlanAsCompleted = useCallback(() => {
    dispatch(plansMiddleware.markThePlanAsCompleted({ planId }));
  }, [planId]);

  const possibleActions = Object.values(PlanActions);

  const actionBindings = possibleActions.map((action) => {
    if (action === PlanActions.MarkAsCancelled) {
      return {
        id: action,
        title: action,
        actionCallback: () => {
          markThePlanAsCancelled();
        }
      };
    }

    if (action === PlanActions.MarkAsActive) {
      return {
        id: action,
        title: action,
        actionCallback: () => {
          markThePlanAsActive();
        }
      };
    }

    return {
      id: action,
      title: action,
      actionCallback: () => {
        markThePlanAsCompleted();
      }
    };
  });

  return filterActionBindings(actions, actionBindings);
};

export default usePlansActions;
