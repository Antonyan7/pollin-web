import { useCallback } from 'react';
import { dispatch } from '@redux/hooks';
import { plansMiddleware } from '@redux/slices/plans';
import { filterActionBindings } from 'helpers/contextMenu';
import { useRouter } from 'next/router';
import { PlanActions } from 'types/reduxTypes/plansTypes';
import { ContextMenuAction } from 'types/reduxTypes/resultsStateTypes';

const usePlansActions = (planId: string, actions: ContextMenuAction[] = []) => {
  const router = useRouter();
  const patientId = router.query.id as string;
  const markThePlanAsCancelled = useCallback(() => {
    dispatch(plansMiddleware.markThePlanAsCancelled(patientId, { planId }));
  }, [patientId, planId]);

  const markThePlanAsActive = useCallback(() => {
    dispatch(plansMiddleware.markThePlanAsActive(patientId, { planId }));
  }, [patientId, planId]);

  const markThePlanAsCompleted = useCallback(() => {
    dispatch(plansMiddleware.markThePlanAsCompleted(patientId, { planId }));
  }, [patientId, planId]);

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
