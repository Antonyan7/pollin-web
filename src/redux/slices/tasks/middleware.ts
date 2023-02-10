import API from '@axios/API';
import { ITasksListReqBody } from '@axios/tasks/tasksManagerTypes';
import { sortOrderTransformer } from '@redux/data-transformers/sortOrderTransformer';
import slice from '@redux/slices/tasks/slice';
import { AppDispatch } from '@redux/store';
import * as Sentry from '@sentry/nextjs';
import { ITasksProps } from 'types/reduxTypes/tasksStateTypes';

const { setError, setTaskPriorities, setTasksList, setTasksLoadingState, setTaskStatuses } = slice.actions;

const getTasksStatuses = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setTasksLoadingState(true));

    const response = await API.tasks.getTaskStatuses();

    dispatch(setTaskStatuses(response.data.data.options));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setTasksLoadingState(false));
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
  getTaskPriorities
};
