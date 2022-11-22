import API from '@axios/API';
import {
  IResultsReqBody,
  IResultsReqBodyWithSortOrder,
  ISpecimensListReqBody,
  ITestResultsData,
  ITestResultsParams
} from '@axios/results/resultsManagerTypes';
import { sortOrderTransformer } from '@redux/data-transformers/sortOrderTransformer';
import slice from '@redux/slices/results/slice';
import { AppDispatch } from '@redux/store';
import * as Sentry from '@sentry/nextjs';
import { IResultsList, ISpecimensList } from 'types/reduxTypes/resultsStateTypes';

const {
  setResultsList,
  setError,
  setResultsLoadingState,
  setResultsFiltersLoadingState,
  setResultsSearchFilters,
  setPendingTestStats,
  setPendingTestStatsLoadingState,
  setTestResultsDetails,
  setSpecimenActions,
  setIsTestResultsDetailsLoading,
  setLabMachines,
  setIsLabMachinesLoading,
  setIsTestResultsSubmitLoading,
  setPendingSpecimenStatsLoadingState,
  setPendingSpecimenStats,
  setSpecimensList,
  setIsSpecimensListLoading,
  setSpecimensFilters,
  setSpecimensFiltersLoadingState
} = slice.actions;

const getResultsList = (resultsListData: IResultsReqBody) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setResultsLoadingState(true));

    let testResultsReqBody = resultsListData;

    if (resultsListData.sortOrder !== null) {
      testResultsReqBody = sortOrderTransformer(resultsListData as IResultsReqBodyWithSortOrder) as IResultsReqBody;
    }

    const response = await API.results.getResults(testResultsReqBody);
    const { totalItems, currentPage, pageSize } = response.data;

    const results: IResultsList = {
      totalItems,
      currentPage,
      pageSize,
      testResults: response.data.data.testResults
    };

    dispatch(setResultsList(results));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setResultsLoadingState(false));
  }
};

const getResultsFilters = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setResultsFiltersLoadingState(true));

    const response = await API.results.getResultsFilters();

    dispatch(setResultsSearchFilters(response.data.data.filters));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setResultsFiltersLoadingState(false));
  }
};

const getPendingTestStats = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setPendingTestStatsLoadingState(true));

    const response = await API.results.getPendingTestStats();

    dispatch(setPendingTestStats(response.data.data.testResultStats));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }

  dispatch(setPendingTestStatsLoadingState(false));
};

const removeTestResultsAttachment = (attachmentId: string) => async (dispatch: AppDispatch) => {
  try {
    await API.results.removeTestResultsAttachment(attachmentId);
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }
};

const getTestResultsDetails = (testResultsParams: ITestResultsParams) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsTestResultsDetailsLoading(true));

    const response = await API.results.getTestResultsDetails(testResultsParams);

    dispatch(setTestResultsDetails(response.data.data.testResults));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setIsTestResultsDetailsLoading(false));
  }
};

const getSpecimenActions = () => async (dispatch: AppDispatch) => {
  try {
    const response = await API.results.getSpecimenActions();

    dispatch(setSpecimenActions(response.data.data.variations));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }
};

const getLabMachines = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLabMachinesLoading(true));

    const response = await API.results.getLabMachines();

    dispatch(setLabMachines(response.data.data));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setIsLabMachinesLoading(false));
  }
};

const submitTestResults = (data: ITestResultsData[], testResultId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsTestResultsSubmitLoading(true));

    await API.results.submitTestResults(data, testResultId);
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setIsTestResultsSubmitLoading(false));
  }
};

const getPendingSpecimenStats = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setPendingSpecimenStatsLoadingState(true));

    const response = await API.results.getPendingSpecimenStats();

    dispatch(setPendingSpecimenStats(response.data.data.stats));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }

  dispatch(setPendingSpecimenStatsLoadingState(false));
};

const getSpecimensList = (specimensListData: ISpecimensListReqBody) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsSpecimensListLoading(true));

    const body = (
      specimensListData.sortOrder !== null ? sortOrderTransformer(specimensListData) : specimensListData
    ) as ISpecimensListReqBody;

    const response = await API.results.getSpecimens(body);
    const {
      totalItems,
      currentPage,
      pageSize,
      data: { specimens, notFoundIds }
    } = response.data;

    const results: ISpecimensList = {
      totalItems,
      currentPage,
      pageSize,
      specimens,
      notFoundIds
    };

    dispatch(setSpecimensList(results));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setIsSpecimensListLoading(false));
  }
};

const addMachineforSpecimen = (specimenIds: string[], machineId: string) => async (dispatch: AppDispatch) => {
  try {
    await API.results.addMachineforSpecimen(specimenIds, machineId);
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }
};
const getSpecimensFilters = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setSpecimensFiltersLoadingState(true));

    const response = await API.results.getSpecimensFilters();

    dispatch(setSpecimensFilters(response.data.data.filters));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setSpecimensFiltersLoadingState(false));
  }
};

export default {
  getResultsList,
  getResultsFilters,
  getPendingTestStats,
  removeTestResultsAttachment,
  getTestResultsDetails,
  getLabMachines,
  getSpecimenActions,
  addMachineforSpecimen,
  getSpecimensFilters,
  submitTestResults,
  getPendingSpecimenStats,
  setIsTestResultsSubmitLoading,
  getSpecimensList
};
