import { useCallback, useMemo } from 'react';
import { ContextMenuAction, IStatusOptionAction } from '@axios/tasks/tasksManagerTypes';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { filterActionBindings, getActionTitleById } from 'helpers/contextMenu';
import { ModalName } from 'types/modals';
import { ITask } from 'types/reduxTypes/tasksStateTypes';

const useTaskDashboardActions = (row: ITask, actions: IStatusOptionAction[] = []) => {
  const handleTaskDashboardActions = useCallback(
    (actionType: string, name: ModalName = ModalName.TaskStatusUpdateModal) => {
      dispatch(
        viewsMiddleware.openModal({
          name,
          props: {
            row: row.uuid,
            actionType,
            ...(name &&
              ModalName.EditTaskModal && {
                task: row
              })
          }
        })
      );
    },
    [row]
  );

  const allActions = useMemo(
    () => [...actions, { id: ContextMenuAction.Edit, title: ContextMenuAction.Edit }],
    [actions]
  );

  const actionBindings = [
    {
      id: ContextMenuAction.InProgress,
      title: getActionTitleById(ContextMenuAction.InProgress, allActions),
      actionCallback: () => {
        handleTaskDashboardActions(ContextMenuAction.InProgress);
      }
    },
    {
      id: ContextMenuAction.OnHold,
      title: getActionTitleById(ContextMenuAction.OnHold, allActions),
      actionCallback: () => {
        handleTaskDashboardActions(ContextMenuAction.OnHold);
      }
    },
    {
      id: ContextMenuAction.Completed,
      title: getActionTitleById(ContextMenuAction.Completed, allActions),
      actionCallback: () => {
        handleTaskDashboardActions(ContextMenuAction.Completed);
      }
    },
    {
      id: ContextMenuAction.Cancelled,
      title: getActionTitleById(ContextMenuAction.Cancelled, allActions),
      actionCallback: () => {
        handleTaskDashboardActions(ContextMenuAction.Cancelled);
      }
    },
    {
      id: ContextMenuAction.Reassign,
      title: getActionTitleById(ContextMenuAction.Reassign, allActions),
      actionCallback: () => {
        handleTaskDashboardActions(ContextMenuAction.Reassign, ModalName.ReassignTaskModal);
      }
    },
    {
      id: ContextMenuAction.Edit,
      title: getActionTitleById(ContextMenuAction.Edit, allActions),
      actionCallback: () => {
        handleTaskDashboardActions(ContextMenuAction.Edit, ModalName.EditTaskModal);
      }
    }
  ];

  return filterActionBindings(allActions, actionBindings);
};

export default useTaskDashboardActions;
