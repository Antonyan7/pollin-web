import { useCallback } from 'react';
import { ContextMenuAction, IStatusOptionAction } from '@axios/tasks/tasksManagerTypes';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { filterActionBindings, getActionTitleById } from 'helpers/contextMenu';
import { ModalName } from 'types/modals';

const useTaskDashboardActions = (row: { uuid: string }, actions: IStatusOptionAction[] = []) => {
  const handleTaskDashboardActions = useCallback(
    (actionType: string, name: ModalName = ModalName.TaskStatusUpdateModal) => {
      dispatch(
        viewsMiddleware.openModal({
          name,
          props: { row, actionType }
        })
      );
    },
    [row]
  );

  const actionBindings = [
    {
      id: ContextMenuAction.InProgress,
      title: getActionTitleById(ContextMenuAction.InProgress, actions),
      actionCallback: () => {
        handleTaskDashboardActions(ContextMenuAction.InProgress);
      }
    },
    {
      id: ContextMenuAction.OnHold,
      title: getActionTitleById(ContextMenuAction.OnHold, actions),
      actionCallback: () => {
        handleTaskDashboardActions(ContextMenuAction.OnHold);
      }
    },
    {
      id: ContextMenuAction.Completed,
      title: getActionTitleById(ContextMenuAction.Completed, actions),
      actionCallback: () => {
        handleTaskDashboardActions(ContextMenuAction.Completed);
      }
    },
    {
      id: ContextMenuAction.Cancelled,
      title: getActionTitleById(ContextMenuAction.Cancelled, actions),
      actionCallback: () => {
        handleTaskDashboardActions(ContextMenuAction.Cancelled);
      }
    },
    {
      id: ContextMenuAction.Reassign,
      title: getActionTitleById(ContextMenuAction.Reassign, actions),
      actionCallback: () => {
        handleTaskDashboardActions(ContextMenuAction.Reassign, ModalName.ReassignTaskModal);
      }
    }
  ];

  return filterActionBindings(actions, actionBindings);
};

export default useTaskDashboardActions;
