import API from '@axios/API';
import { ContextMenuAction, ITasksListReqBody } from '@axios/tasks/tasksManagerTypes';
import { sortOrderTransformer } from '@redux/data-transformers/sortOrderTransformer';
import slice from '@redux/slices/tasks/slice';
import { AppDispatch } from '@redux/store';
import * as Sentry from '@sentry/nextjs';
import { ITasksProps } from 'types/reduxTypes/tasksStateTypes';

const { setError, setTaskPriorities, setTasksList, setTasksLoadingState, setTaskStatuses, setIsTaskUpdated } =
  slice.actions;

const getTasksStatuses = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setTasksLoadingState(true));

    const response = await API.tasks.getTaskStatuses();

    const dataWithReassignOption = response.data.data.options.map(({ actions, ...otherOptions }) => ({
      ...otherOptions,
      actions: [...actions, { id: ContextMenuAction.Reassign, title: ContextMenuAction.Reassign }]
    }));

    dispatch(setTaskStatuses(dataWithReassignOption));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setTasksLoadingState(false));
  }
};

const updateTaskStatus = (rowId: string, statusId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsTaskUpdated(true));
    await API.tasks.updateTaskStatus(rowId, statusId);
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setIsTaskUpdated(false));
  }
};

const getTaskPriorities = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setTasksLoadingState(true));

    const response = await API.tasks.getTaskPriorities();

    dispatch(setTaskPriorities(response.data.data.priorities));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setTasksLoadingState(false));
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
    dispatch(setError(error));
  } finally {
    dispatch(setTasksLoadingState(false));
  }
};

export default {
  getTasksList,
  getTasksStatuses,
  updateTaskStatus,
  getTaskPriorities
};
