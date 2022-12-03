import API from '@axios/API';
import {
  ActionType,
  IAllTestsSpecimensReqBody,
  IMarkInTransitActionReqBody,
  IResultsReqBody,
  IResultsReqBodyWithSortOrder,
  ISpecimensListReqBody,
  ITestResultsData,
  ITestResultsParams,
  ITransportListReqBody
} from '@axios/results/resultsManagerTypes';
import { sortOrderTransformer } from '@redux/data-transformers/sortOrderTransformer';
import slice from '@redux/slices/results/slice';
import { AppDispatch } from '@redux/store';
import * as Sentry from '@sentry/nextjs';
import {
  IAllTestsSpecimensList,
  IResultsList,
  ISpecimensList,
  ITransportList
} from 'types/reduxTypes/resultsStateTypes';
import { ICreateTransportFolderReqBody } from 'types/results';

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
  setTransportActions,
  setIsTestResultsDetailsLoading,
  setLabMachines,
  setIsLabMachinesLoading,
  setIsTestResultsSubmitLoading,
  setPendingSpecimenStatsLoadingState,
  setPendingSpecimenStats,
  setSpecimensList,
  setIsSpecimensListLoading,
  setSpecimensFilters,
  setSpecimensFiltersLoadingState,
  setIsAllTestsSpecimensListLoading,
  setAllTestsSpecimensList,
  setLabs,
  setLabsLoadingState,
  setIsCreatingTransportFolderLoading,
  setTransportList,
  setIsTransportListLoading
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

const getTransportActions = () => async (dispatch: AppDispatch) => {
  try {
    const response = await API.results.getTransportActions();

    dispatch(setTransportActions(response.data.data.variations));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }
};

const getLabMachines = (actionType: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLabMachinesLoading(true));

    const response =
      actionType === ActionType.InProgress
        ? await API.results.getLabMachines()
        : await API.results.getRetestRecollect(actionType);

    dispatch(setLabMachines(response.data.data));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setIsLabMachinesLoading(false));
  }
};

const submitTestResults = (data: ITestResultsData[]) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsTestResultsSubmitLoading(true));

    await API.results.submitTestResults(data);
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
      data: { specimens, notFound }
    } = response.data;

    const results: ISpecimensList = {
      totalItems,
      currentPage,
      pageSize,
      specimens,
      notFound
    };

    dispatch(setSpecimensList(results));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setIsSpecimensListLoading(false));
  }
};

const addMachineforSpecimen = (specimens: string[], machineId: string) => async (dispatch: AppDispatch) => {
  try {
    await API.results.addMachineforSpecimen(specimens, machineId);
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }
};
const markInTransitAction = (reqBody: IMarkInTransitActionReqBody) => async (dispatch: AppDispatch) => {
  try {
    await API.results.markInTransitAction(reqBody);
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }
};

const applyRetestAction = (specimens: string[], reasonId: string) => async (dispatch: AppDispatch) => {
  try {
    const specimenData = specimens.map((specimenId) => ({ id: specimenId }));

    await API.results.applyRetestAction(specimenData, reasonId);
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }
};
const applyRecollectAction = (specimens: string[], reasonId: string) => async (dispatch: AppDispatch) => {
  try {
    const specimenData = specimens.map((specimenId) => ({ id: specimenId }));

    await API.results.applyRecollectAction(specimenData, reasonId);
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

const getTransportList = (resultsListData: ITransportListReqBody) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsTransportListLoading(true));

    let testResultsReqBody = resultsListData;

    if (resultsListData.sortOrder !== null) {
      testResultsReqBody = sortOrderTransformer(
        resultsListData as IResultsReqBodyWithSortOrder
      ) as ITransportListReqBody;
    }

    const response = await API.results.getTransportList(testResultsReqBody);
    const { totalItems, currentPage, pageSize } = response.data;

    const results: ITransportList = {
      totalItems,
      currentPage,
      pageSize,
      folders: response.data.data.folders
    };

    dispatch(setTransportList(results));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setIsTransportListLoading(false));
  }
};

const getALLTestsSpecimensList = (payload: IAllTestsSpecimensReqBody) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsAllTestsSpecimensListLoading(true));

    const body = (payload.sortOrder !== null ? sortOrderTransformer(payload) : payload) as IAllTestsSpecimensReqBody;

    const response = await API.results.getAllTestsSpecimensList(body);
    const {
      totalItems,
      currentPage,
      pageSize,
      data: { specimens, notFound }
    } = response.data;

    const results: IAllTestsSpecimensList = {
      totalItems,
      currentPage,
      pageSize,
      specimens,
      notFound
    };

    dispatch(setAllTestsSpecimensList(results));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setIsAllTestsSpecimensListLoading(false));
  }
};

const getLabs = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLabsLoadingState(true));

    const response = await API.results.getLabs();

    dispatch(setLabs(response.data.data.labs));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setLabsLoadingState(false));
  }
};

const createTransportFolder = (data: ICreateTransportFolderReqBody) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsCreatingTransportFolderLoading(true));

    await API.results.createTransportFolder(data);
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setIsCreatingTransportFolderLoading(false));
  }
};

export default {
  getResultsList,
  getTransportList,
  getResultsFilters,
  getPendingTestStats,
  removeTestResultsAttachment,
  getTestResultsDetails,
  getLabMachines,
  getSpecimenActions,
  addMachineforSpecimen,
  markInTransitAction,
  applyRetestAction,
  applyRecollectAction,
  getSpecimensFilters,
  submitTestResults,
  getTransportActions,
  getPendingSpecimenStats,
  setIsTestResultsSubmitLoading,
  getSpecimensList,
  getALLTestsSpecimensList,
  getLabs,
  createTransportFolder
};
