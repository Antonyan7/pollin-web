import API from '@axios/API';
import {
  ContextMenuAction,
  ITaskCreateReqBody,
  ITaskEditReqBody,
  ITaskReassignReqBody,
  ITasksListReqBody
} from '@axios/tasks/tasksManagerTypes';
import { ICreateOrEditTaskForm } from '@components/Modals/Tasks/types';
import { SeveritiesType } from '@components/Scheduling/types';
import { sortOrderTransformer } from '@redux/data-transformers/sortOrderTransformer';
import slice from '@redux/slices/tasks/slice';
import { viewsMiddleware } from '@redux/slices/views';
import { AppDispatch } from '@redux/store';
import * as Sentry from '@sentry/nextjs';
import { ModalName } from 'types/modals';
import { ITasksProps } from 'types/reduxTypes/tasksStateTypes';

const {
  setTaskDetails,
  setIsTaskDetailsLoading,
  setCreatedTaskId,
  setTaskCreateLoadingState,
  setTaskPriorities,
  setTasksList,
  setIsTaskStatusUpdated,
  setIsTaskReassigned,
  setIsTaskReassignLoading,
  setTasksLoadingState,
  setTaskStatuses,
  setIsTaskUpdated,
  setIsTaskUpdating
} = slice.actions;

const getTasksStatuses = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setTasksLoadingState(true));

    const response = await API.tasks.getTaskStatuses();

    const dataWithReassignOption = response.data.data.variations.map(({ actions, ...otherOptions }) => ({
      ...otherOptions,
      actions: [...actions, { id: ContextMenuAction.Reassign, title: ContextMenuAction.Reassign }]
    }));

    dispatch(setTaskStatuses(dataWithReassignOption));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setTasksLoadingState(false));
  }
};

const updateTaskStatus = (rowId: string, statusId: string, message: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsTaskUpdated(true));
    await API.tasks.updateTaskStatus(rowId, statusId);
    dispatch(
      viewsMiddleware.setToastNotificationPopUpState({
        open: true,
        props: {
          severityType: SeveritiesType.success,
          description: message
        }
      })
    );
    dispatch(viewsMiddleware.closeModal(ModalName.TaskStatusUpdateModal));
    dispatch(setIsTaskStatusUpdated(true));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsTaskUpdated(false));
  }
};

const setTaskStatusUpdate = (value: boolean) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsTaskStatusUpdated(value));
  } catch (error) {
    Sentry.captureException(error);
  }
};

const getTaskPriorities = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setTasksLoadingState(true));

    const response = await API.tasks.getTaskPriorities();

    dispatch(setTaskPriorities(response.data.data.priorities));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setTasksLoadingState(false));
  }
};

const clearCreatedTaskState = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setCreatedTaskId(''));
  } catch (error) {
    Sentry.captureException(error);
  }
};

const createTask = (taskData: ICreateOrEditTaskForm, message: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setTaskCreateLoadingState(true));

    const data: ITaskCreateReqBody = {
      task: {
        name: taskData.taskName,
        assigneeId: taskData.assign as string,
        ...(taskData.patient ? { patientId: taskData.patient } : {}),
        dueDate: taskData.dueDate,
        priorityId: taskData.priority,
        ...(taskData.description ? { description: taskData.description } : {})
      }
    };

    const response = await API.tasks.createTask(data);

    dispatch(
      viewsMiddleware.setToastNotificationPopUpState({
        open: true,
        props: {
          severityType: SeveritiesType.success,
          description: message
        }
      })
    );
    dispatch(setCreatedTaskId(response.data.data.uuid));
    dispatch(viewsMiddleware.closeModal(ModalName.CreateTaskModal));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setTaskCreateLoadingState(false));
  }
};

export const editTask =
  (taskId: string, taskData: ICreateOrEditTaskForm, message: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setIsTaskUpdating(true));

      const data: ITaskEditReqBody = {
        task: {
          name: taskData.taskName,
          ...(taskData.patient ? { patientId: taskData.patient } : {}),
          dueDate: taskData.dueDate,
          priorityId: taskData.priority,
          ...(taskData.description ? { description: taskData.description } : {})
        }
      };

      const response = await API.tasks.editTask(taskId, data);

      if (response) {
        dispatch(
          viewsMiddleware.setToastNotificationPopUpState({
            open: true,
            props: {
              severityType: SeveritiesType.success,
              description: message
            }
          })
        );
        dispatch(viewsMiddleware.closeModal(ModalName.EditTaskModal));
      }
    } catch (error) {
      Sentry.captureException(error);
    } finally {
      dispatch(setIsTaskUpdating(false));
    }
  };

const getTasksDetails = (taskId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsTaskDetailsLoading(true));

    const response = await API.tasks.getTaskDetails(taskId);

    const data = response.data.data.task;

    dispatch(setTaskDetails(data));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsTaskDetailsLoading(false));
  }
};

const clearTaskReassignState = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsTaskReassigned(false));
  } catch (error) {
    Sentry.captureException(error);
  }
};

const reassignTask = (reassignData: ITaskReassignReqBody, message: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsTaskReassignLoading(true));

    await API.tasks.reassignTask(reassignData);
    dispatch(setIsTaskReassigned(true));
    dispatch(
      viewsMiddleware.setToastNotificationPopUpState({
        open: true,
        props: {
          severityType: SeveritiesType.success,
          description: message
        }
      })
    );
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsTaskReassignLoading(false));
  }
};

const getTasksList = (tasksListData: ITasksListReqBody) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setTasksLoadingState(true));

    let tasksListReqBody = tasksListData;

    if (tasksListData.sortOrder !== null) {
      tasksListReqBody = sortOrderTransformer(tasksListData) as ITasksListReqBody;
    }

    const response = await API.tasks.getTasksList(tasksListReqBody);
    const { totalItems, currentPage, pageSize } = response.data;

    const results: ITasksProps = {
      totalItems,
      currentPage,
      pageSize,
      tasks: response.data.data.tasks
    };

    dispatch(setTasksList(results));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setTasksLoadingState(false));
  }
};

export default {
  getTasksDetails,
  getTasksList,
  getTasksStatuses,
  setTaskStatusUpdate,
  updateTaskStatus,
  clearTaskReassignState,
  reassignTask,
  clearCreatedTaskState,
  createTask,
  editTask,
  getTaskPriorities
};
