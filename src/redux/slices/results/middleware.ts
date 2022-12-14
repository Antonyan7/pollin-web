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
  ITransportListReqBody,
  OrdersListDataProps
} from '@axios/results/resultsManagerTypes';
import { SeveritiesType } from '@components/Scheduling/types';
import { sortOrderTransformer } from '@redux/data-transformers/sortOrderTransformer';
import slice from '@redux/slices/results/slice';
import { viewsMiddleware } from '@redux/slices/views';
import { AppDispatch } from '@redux/store';
import * as Sentry from '@sentry/nextjs';
import { Translation } from 'constants/translations';
import { t } from 'i18next';
import { ModalName } from 'types/modals';
import {
  IAllTestsSpecimensList,
  IOrdersListResponse,
  IResultsList,
  IRetestRecollectData,
  ISpecimensInTransportList,
  ISpecimensList,
  ITransportList
} from 'types/reduxTypes/resultsStateTypes';
import {
  ICreateTransportFolderReqBody,
  IGetSpecimensInTransportListParams,
  IGetTransportFoldersReqBody
} from 'types/results';

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
  setTestResultReviewedDate,
  setIsTestResultReviewed,
  setIsTestResultReleased,
  setTestResultReleasedDate,
  setIsTestResultsDetailsLoading,
  setLabMachines,
  setIsLabMachinesLoading,
  setCancellationReasons,
  setIsCancellOrderLoading,
  setIsCancellationReasonsLoading,
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
  setIsTransportListLoading,
  setSpecimensInTransportList,
  setIsSpecimensInTransportListLoading,
  setTestResultsState,
  setTransportFolders,
  setLastCreatedTransportFolderId,
  setIsTransportFoldersLoading,
  setOrderResultsFilters,
  setOrderResultsFiltersLoadingState,
  setOrdersList,
  setIsOrdersListLoading,
  setOrdersStatuses,
  setIsTestResultsSubmitWentSuccessful
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

const getCancellationReasons = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsCancellationReasonsLoading(true));

    const response = await API.results.getCancellationReasons();

    dispatch(setCancellationReasons(response.data.data));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setIsCancellationReasonsLoading(false));
  }
};

const cancellOrder =
  (orderId: string, reasonId: string, cancellationReason?: string) => async (dispatch: AppDispatch) => {
    dispatch(setIsCancellOrderLoading(true));

    try {
      const response = await API.results.cancellOrder(orderId, reasonId, cancellationReason);

      if (response) {
        dispatch(viewsMiddleware.closeModal(ModalName.OrderCancellation));
      }
    } catch (error) {
      Sentry.captureException(error);
      dispatch(setError(error));
    }

    dispatch(setIsCancellOrderLoading(false));
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

const makeTestResultReviewed = (testResultId: string, reviewerComment?: string) => async (dispatch: AppDispatch) => {
  dispatch(setIsTestResultReviewed(true));

  try {
    const response = await API.results.makeTestResultReviewed(testResultId, reviewerComment);

    dispatch(setTestResultReviewedDate(response.data.data.reviewDate));
    dispatch(viewsMiddleware.closeModal(ModalName.TestResultReviewConfirmation));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }

  dispatch(setIsTestResultReviewed(true));
};

const makeTestResultReleased = (testResultId: string) => async (dispatch: AppDispatch) => {
  dispatch(setIsTestResultReleased(true));

  try {
    const response = await API.results.makeTestResultReleased(testResultId);

    dispatch(setTestResultReleasedDate(response.data.data.releaseDate));
    dispatch(viewsMiddleware.closeModal(ModalName.TestResultReviewConfirmation));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }

  dispatch(setIsTestResultReleased(false));
};

const submitTestResults = (data: ITestResultsData[]) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsTestResultsSubmitLoading(true));

    await API.results.submitTestResults(data);
    dispatch(setIsTestResultsSubmitWentSuccessful(true));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
    dispatch(setIsTestResultsSubmitWentSuccessful(false));
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

export const resetTestResultsState = () => async (dispatch: AppDispatch) => {
  dispatch(
    setTestResultsState({
      success: false,
      fail: false
    })
  );
};

const markInTransitAction = (reqBody: IMarkInTransitActionReqBody) => async (dispatch: AppDispatch) => {
  try {
    await API.results.markInTransitAction(reqBody);
    dispatch(
      setTestResultsState({
        success: true,
        fail: false
      })
    );
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
    dispatch(
      setTestResultsState({
        success: false,
        fail: true
      })
    );
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

    const response = await API.results.createTransportFolder(data);

    dispatch(setLastCreatedTransportFolderId(response.data.data.uuid));

    dispatch(
      viewsMiddleware.setToastNotificationPopUpState({
        open: true,
        props: {
          severityType: SeveritiesType.success,
          description: t(
            Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_ADD_NEW_EXISTING_TRANSPORT_FOLDER_MODAL_FOLDER_CREATE_SUCCESS_MESSAGE
          )
        }
      })
    );
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setIsCreatingTransportFolderLoading(false));
  }
};

const resetLastCreatedTransportFolderId = () => async (dispatch: AppDispatch) => {
  dispatch(setLastCreatedTransportFolderId(null));
};

const getSpecimensInTransportList =
  (options: IGetSpecimensInTransportListParams, transportId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setIsSpecimensInTransportListLoading(true));

      const params = (
        options.sortOrder !== null ? sortOrderTransformer(options) : options
      ) as IGetSpecimensInTransportListParams;

      const response = await API.results.getSpecimensInTransport(params, transportId);

      const {
        totalItems,
        currentPage,
        pageSize,
        data: { specimens }
      } = response.data;

      const results: ISpecimensInTransportList = {
        totalItems,
        currentPage,
        pageSize,
        specimens
      };

      dispatch(setSpecimensInTransportList(results));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(setError(error));
    } finally {
      dispatch(setIsSpecimensInTransportListLoading(false));
    }
  };

const getTransportFolders = (data: IGetTransportFoldersReqBody) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsTransportFoldersLoading(true));

    const response = await API.results.getTransportFolders(data);

    dispatch(setTransportFolders(response.data.data.folders));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setIsTransportFoldersLoading(false));
  }
};

const addSpecimenToTransportFolder =
  (specimens: IRetestRecollectData[], transportFolderId: string) => async (dispatch: AppDispatch) => {
    try {
      await API.results.addSpecimenToTransportFolder(specimens, transportFolderId);
    } catch (error) {
      Sentry.captureException(error);
      dispatch(setError(error));
    } finally {
      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.success,
            description: t(
              Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_ADD_NEW_EXISTING_TRANSPORT_FOLDER_MODAL_NEW_EXISTING_TRANSPORT_SUCCESS_MESSAGE
            )
          }
        })
      );
    }
  };

const getOrderStatuses = () => async (dispatch: AppDispatch) => {
  try {
    const response = await API.results.getOrdersStatuses();

    dispatch(setOrdersStatuses(response.data.data.items));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }
};

const getOrderResultsFilters = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setOrderResultsFiltersLoadingState(true));

    const response = await API.results.getOrderResultsFilters();

    dispatch(setOrderResultsFilters(response.data.data.filters));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setOrderResultsFiltersLoadingState(false));
  }
};

const getOrdersList = (ordersListData: OrdersListDataProps) => async (dispatch: AppDispatch) => {
  dispatch(setIsOrdersListLoading(true));

  try {
    const response = await API.results.getOrdersList(ordersListData);
    const {
      totalItems,
      currentPage,
      pageSize,
      data: { orders }
    } = response.data;
    const listData: IOrdersListResponse = {
      totalItems,
      currentPage,
      pageSize,
      orders
    };

    dispatch(setOrdersList(listData));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }

  dispatch(setIsOrdersListLoading(false));
};

export default {
  getResultsList,
  resetTestResultsState,
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
  getCancellationReasons,
  cancellOrder,
  makeTestResultReviewed,
  makeTestResultReleased,
  getPendingSpecimenStats,
  setIsTestResultsSubmitLoading,
  getSpecimensList,
  getALLTestsSpecimensList,
  getLabs,
  createTransportFolder,
  getSpecimensInTransportList,
  getTransportFolders,
  addSpecimenToTransportFolder,
  resetLastCreatedTransportFolderId,
  getOrderStatuses,
  getOrderResultsFilters,
  setIsTestResultsSubmitWentSuccessful,
  getOrdersList
};
