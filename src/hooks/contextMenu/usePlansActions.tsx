import { useCallback } from 'react';
import { PlanActions } from '@axios/patientEmr/managerPatientEmrTypes';
import { dispatch } from '@redux/hooks';
import { patientsMiddleware } from '@redux/slices/patients';
import { filterActionBindings } from 'helpers/contextMenu';
import { ContextMenuAction } from 'types/reduxTypes/resultsStateTypes';

const usePlansActions = (planId: string, actions: ContextMenuAction[] = []) => {
  const markThePlanAsCancelled = useCallback(() => {
    dispatch(patientsMiddleware.markThePlanAsCancelled({ planId }));
  }, [planId]);

  const markThePlanAsActive = useCallback(() => {
    dispatch(patientsMiddleware.markThePlanAsActive({ planId }));
  }, [planId]);

  const markThePlanAsCompleted = useCallback(() => {
    dispatch(patientsMiddleware.markThePlanAsCompleted({ planId }));
  }, [planId]);

  const possibleActions = Object.entries(PlanActions);

  const actionBindings = possibleActions.map(([id, title]) => {
    if (title === PlanActions.MarkAsCancelled) {
      return {
        id,
        title,
        actionCallback: () => {
          markThePlanAsCancelled();
        }
      };
    }

    if (title === PlanActions.MarkAsActive) {
      return {
        id,
        title,
        actionCallback: () => {
          markThePlanAsActive();
        }
      };
    }

    return {
      id,
      title,
      actionCallback: () => {
        markThePlanAsCompleted();
      }
    };
  });

  return filterActionBindings(actions, actionBindings);
};

export default usePlansActions;
