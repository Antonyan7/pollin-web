import API from '@axios/API';
import {
  IAllTestsSpecimensReqBody,
  IMarkInTransitActionReqBody,
  IResultsReqBody,
  IResultsReqBodyWithSortOrder,
  ISpecimenCollectionData,
  ISpecimensListReqBody,
  ISpecimensReqBody,
  ITestResultsData,
  ITestResultsParams,
  ITransportListReqBody,
  SpecimenActionType,
  SpecimensListSortFields,
  TransportsSortFields
} from '@axios/results/resultsManagerTypes';
import { SeveritiesType } from '@components/Scheduling/types';
import { sortOrderTransformer } from '@redux/data-transformers/sortOrderTransformer';
import { resultsMiddleware } from '@redux/slices/results/index';
import slice from '@redux/slices/results/slice';
import { viewsMiddleware } from '@redux/slices/views';
import store, { AppDispatch, RootState } from '@redux/store';
import * as Sentry from '@sentry/nextjs';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { t } from 'i18next';
import { ModalName } from 'types/modals';
import { SortOrder } from 'types/patient';
import { ISpecimenCollectionAppointment } from 'types/reduxTypes/bookingStateTypes';
import {
  IAllTestsSpecimensList,
  IObjectWithId,
  IResultsList,
  ISpecimensInTransportList,
  ISpecimensList,
  ITransportList,
  LastCreatedTransportFolder
} from 'types/reduxTypes/resultsStateTypes';
import {
  ICreateTransportFolderReqBody,
  IGetSpecimensInTransportListParams,
  IGetTransportFoldersReqBody
} from 'types/results';

import { DateUtil } from '@utils/date/DateUtil';

import { bookingMiddleware } from '../booking';

const {
  setAllTestsSpecimensList,
  setAppointmentSpecimens,
  setIsAllTestsSpecimensListLoading,
  setIsAppointmentSpecimensLoading,
  setIsCreatingTransportFolderLoading,
  setIsLabMachinesLoading,
  setIsSendingSpecimenCollectionData,
  setIsSpecimensInTransportListLoading,
  setIsSpecimensListLoading,
  setIsSpecimenStorageLocationsLoading,
  setIsSpecimenAddedToFolder,
  setIsTestResultsDetailsLoading,
  setIsTestResultsSubmitLoading,
  setIsTestResultsSubmitWentSuccessful,
  setTransportListDate,
  setIsTransportFolderDownloaded,
  setIsTransportFoldersLoading,
  setIsTransportListLoading,
  setIsUpdatingSpecimenCollectionAppointmentStatus,
  setLabMachines,
  setLabs,
  setLabsLoadingState,
  setLastCreatedTransportFolder,
  setPendingSpecimenStats,
  setPendingSpecimenStatsLoadingState,
  setPendingTestStats,
  setPendingTestStatsLoadingState,
  setResultsFiltersLoadingState,
  setResultsList,
  setResultsLoadingState,
  setResultsSearchFilters,
  setSpecimenActions,
  setSpecimenConfirmButtonClicked,
  setSpecimensFilters,
  setSpecimensFiltersLoadingState,
  setSpecimensInTransportList,
  setSpecimensList,
  setSpecimenStorageLocations,
  setTestResultsDetails,
  setTransportActions,
  setTransportFolders,
  setTransportList,
  setShouldRefetchInTransportList,
  setShouldRefetchAllSpecimensList,
  setShouldRefetchTransportsList
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
  } finally {
    dispatch(setPendingTestStatsLoadingState(false));
  }
};

const removeTestResultsAttachment = (attachmentId: string) => async () => {
  try {
    await API.results.removeTestResultsAttachment(attachmentId);
  } catch (error) {
    Sentry.captureException(error);
  }
};

const getTestResultsDetails = (testResultsParams: ITestResultsParams) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsTestResultsDetailsLoading(true));

    const response = await API.results.getTestResultsDetails(testResultsParams);

    dispatch(setTestResultsDetails(response.data.data.testResults));
  } catch (error) {
    Sentry.captureException(error);
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
  }
};

const getTransportActions = () => async (dispatch: AppDispatch) => {
  try {
    const response = await API.results.getTransportActions();

    dispatch(setTransportActions(response.data.data.variations));
  } catch (error) {
    Sentry.captureException(error);
  }
};

const getLabMachines = (actionType: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLabMachinesLoading(true));

    const response =
      actionType === SpecimenActionType.InProgress
        ? await API.results.getLabMachines()
        : await API.results.getRetestRecollect(actionType);

    dispatch(setLabMachines(response.data.data));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsLabMachinesLoading(false));
  }
};

const submitTestResults = (data: ITestResultsData[]) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsTestResultsSubmitLoading(true));

    await API.results.submitTestResults(data);
    dispatch(setIsTestResultsSubmitWentSuccessful(true));
  } catch (error) {
    Sentry.captureException(error);
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
  } finally {
    dispatch(setPendingSpecimenStatsLoadingState(false));
  }
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
  } finally {
    dispatch(setIsSpecimensListLoading(false));
  }
};

const onSpecimenConfirmButtonClicked = () => (dispatch: AppDispatch) => {
  const specimenConfirmButtonStatus = store.getState().results.inHouse.isSpecimensConfirmationButtonClicked;

  dispatch(setSpecimenConfirmButtonClicked(!specimenConfirmButtonStatus));
};

const addMachineForSpecimen = (specimens: ISpecimensReqBody[], machineId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await API.results.addMachineForSpecimen(specimens, machineId);

    if (response) {
      dispatch(onSpecimenConfirmButtonClicked());
    }
  } catch (error) {
    Sentry.captureException(error);
  }
};

const applyRetestAction = (specimens: string[], reasonId: string) => async (dispatch: AppDispatch) => {
  try {
    const specimenData = specimens.map((specimenId) => ({ id: specimenId }));

    const response = await API.results.applyRetestAction(specimenData, reasonId);

    if (response) {
      dispatch(setShouldRefetchInTransportList(true));
      dispatch(onSpecimenConfirmButtonClicked());
    }
  } catch (error) {
    Sentry.captureException(error);
  }
};
const applyRecollectAction = (specimens: string[], reasonId: string) => async (dispatch: AppDispatch) => {
  try {
    const specimenData = specimens.map((specimenId) => ({ id: specimenId }));

    const response = await API.results.applyRecollectAction(specimenData, reasonId);

    if (response) {
      dispatch(setShouldRefetchInTransportList(true));
      dispatch(onSpecimenConfirmButtonClicked());
    }
  } catch (error) {
    Sentry.captureException(error);
  }
};
const applyMoveToAllTests = (specimens: string[]) => async (dispatch: AppDispatch) => {
  try {
    const specimenData = specimens.map((specimenId) => ({ id: specimenId }));

    const response = await API.results.applyMoveToAllTests(specimenData);

    if (response) {
      dispatch(setShouldRefetchInTransportList(true));
      dispatch(onSpecimenConfirmButtonClicked());
    }
  } catch (error) {
    Sentry.captureException(error);
  }
};

const getAllTestsSpecimensList =
  (
    payload: IAllTestsSpecimensReqBody = {
      page: 0,
      sortByField: SpecimensListSortFields.COLLECTION_AGE,
      sortOrder: SortOrder.Desc
    }
  ) =>
  async (dispatch: AppDispatch) => {
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
    } finally {
      dispatch(setIsAllTestsSpecimensListLoading(false));
    }
  };

const applyMoveToInHouse = (specimens: string[], identifiers: string[]) => async (dispatch: AppDispatch) => {
  try {
    const specimenData = specimens.map((specimenId) => ({ id: specimenId }));

    const response = await API.results.applyMoveToInHouse(specimenData);

    if (response) {
      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.success,
            renderList: {
              header: t(Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_IN_HOUSE_SUCCESS),
              items: identifiers,
              dataCy: CypressIds.PAGE_SPECIMEN_TRACKING_MOVE_TO_SUCCESS_MESSAGE
            }
          }
        })
      );
      dispatch(setShouldRefetchInTransportList(true));
      dispatch(setShouldRefetchAllSpecimensList(true));
    }
  } catch (error) {
    Sentry.captureException(error);
  }
};

const getSpecimensFilters = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setSpecimensFiltersLoadingState(true));

    const response = await API.results.getSpecimensFilters();

    dispatch(setSpecimensFilters(response.data.data.filters));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setSpecimensFiltersLoadingState(false));
  }
};

const updateTransportListDate = (date: Date) => (dispatch: AppDispatch) => {
  dispatch(setTransportListDate(date));
};

const getTransportList =
  (
    resultsListData: ITransportListReqBody = {
      date: new Date(store.getState().results.tracking.transportListDate),
      page: 0,
      sortByField: TransportsSortFields.STATUS,
      sortOrder: SortOrder.Desc
    }
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      resultsListData.date = DateUtil.convertToDateOnly(resultsListData.date);
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
        folders: response.data.data.folders,
        notFound: response.data.data.notFound
      };

      dispatch(setTransportList(results));
    } catch (error) {
      Sentry.captureException(error);
    } finally {
      dispatch(setIsTransportListLoading(false));
    }
  };

const getSpecimensForAppointment = (appointmentId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsAppointmentSpecimensLoading(true));

    const response = await API.results.getSpecimensForAppointment(appointmentId);

    dispatch(setAppointmentSpecimens(response.data.data));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsAppointmentSpecimensLoading(false));
  }
};
const getLabs = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLabsLoadingState(true));

    const response = await API.results.getLabs();

    dispatch(setLabs(response.data.data.labs));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setLabsLoadingState(false));
  }
};

const getSpecimenStorageLocations = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsSpecimenStorageLocationsLoading(true));

    const response = await API.results.getSpecimenStorageLocations();

    dispatch(setSpecimenStorageLocations(response.data.data.locations));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setSpecimenStorageLocations([]));
  } finally {
    dispatch(setIsSpecimenStorageLocationsLoading(false));
  }
};

const updateSpecimenCollectionAppointmentStatus =
  (data: ISpecimenCollectionAppointment) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setIsUpdatingSpecimenCollectionAppointmentStatus(true));

      const { currentSpecimenServiceProviderId, specimenAppointments } = store.getState().booking;

      await API.booking.updateSpecimenCollectionAppointmentStatus(data);
      dispatch(
        bookingMiddleware.getSpecimenAppointments(
          currentSpecimenServiceProviderId,
          specimenAppointments.date,
          specimenAppointments.selectedFilters.map(({ id }) => ({ id }))
        )
      );
    } catch (error) {
      Sentry.captureException(error);
    } finally {
      dispatch(setIsUpdatingSpecimenCollectionAppointmentStatus(false));
    }
  };

const submitSpecimenCollections =
  (data: ISpecimenCollectionData, patientName: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setIsSendingSpecimenCollectionData(true));
      await API.results.submitSpecimenCollections(data);

      const { currentSpecimenServiceProviderId, specimenAppointments, date } = store.getState().booking;

      dispatch(
        bookingMiddleware.getSpecimenAppointments(
          currentSpecimenServiceProviderId,
          date,
          specimenAppointments.selectedFilters.map(({ id }) => ({ id }))
        )
      );
      // Reset current appointment details
      dispatch(bookingMiddleware.getAppointmentDetails());
      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.success,
            description: t(Translation.PAGE_SPECIMEN_TRACKING_MODAL_COLLECTION_COLLECT_SUCCESS_MESSAGE, {
              title: patientName
            }),
            dataCy: CypressIds.PAGE_SPECIMEN_COLLECTION_SUCCESS_MESSAGE
          }
        })
      );
    } catch (error) {
      Sentry.captureException(error);
    } finally {
      dispatch(setIsSendingSpecimenCollectionData(false));
    }
  };

const createTransportFolder = (data: ICreateTransportFolderReqBody) => async (dispatch: AppDispatch) => {
  try {
    data.date = DateUtil.convertToDateOnly(data.date);
    dispatch(setIsCreatingTransportFolderLoading(true));

    const response = await API.results.createTransportFolder(data);
    const { uuid, title } = response.data.data;
    const transportFolderData: LastCreatedTransportFolder = {
      id: uuid,
      title
    };

    dispatch(setLastCreatedTransportFolder(transportFolderData));

    const transportListRequestBody = {
      date: data.date,
      page: 0,
      sortByField: TransportsSortFields.STATUS,
      sortOrder: SortOrder.Desc
    };

    dispatch(resultsMiddleware.getTransportList(transportListRequestBody));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsCreatingTransportFolderLoading(false));
  }
};

const resetLastCreatedTransportFolderId = () => async (dispatch: AppDispatch) => {
  dispatch(setLastCreatedTransportFolder(null));
};

const markInTransitAction =
  (reqBody: IMarkInTransitActionReqBody, rowTitle: string) => async (dispatch: AppDispatch) => {
    try {
      await API.results.markInTransitAction(reqBody);
      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.success,
            renderList: {
              header: t(Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_IN_TRANSIT_SUCCESS),
              items: [rowTitle],
              dataCy: CypressIds.PAGE_SPECIMEN_TRACKING_MARK_IN_TRANSIT_SUCCESS_MESSAGE
            }
          }
        })
      );
      dispatch(setShouldRefetchTransportsList(true));
    } catch (error) {
      Sentry.captureException(error);
    }
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
        data: { specimens, transportFolder }
      } = response.data;

      const results: ISpecimensInTransportList = {
        totalItems,
        currentPage,
        pageSize,
        specimens,
        transportFolder
      };

      dispatch(setSpecimensInTransportList(results));
    } catch (error) {
      Sentry.captureException(error);
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
  } finally {
    dispatch(setIsTransportFoldersLoading(false));
  }
};

const addSpecimenToTransportFolder =
  (specimens: IObjectWithId[], transportFolderId: string, modalToClose: ModalName, selectedIdentifiers?: string[]) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const newTransportFolder = getState().results.tracking.lastCreatedTransportFolder;
    const existingTransportFolder = getState().results.tracking.transportList.folders.find(
      (folder) => folder.id === transportFolderId
    );
    const transportFolderTitle = existingTransportFolder?.title ?? newTransportFolder?.title;

    dispatch(setIsSpecimenAddedToFolder(true));

    try {
      await API.results.addSpecimenToTransportFolder(specimens, transportFolderId);
      dispatch(viewsMiddleware.closeModal(modalToClose));
      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.success,
            renderList: {
              header: `${t(
                Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_ADD_NEW_EXISTING_TRANSPORT_FOLDER_MODAL_NEW_EXISTING_TRANSPORT_SUCCESS_MESSAGE
              )} ${transportFolderTitle}`,
              items: selectedIdentifiers
            }
          }
        })
      );
      dispatch(setShouldRefetchInTransportList(true));
    } catch (error) {
      Sentry.captureException(error);
    }

    dispatch(setIsSpecimenAddedToFolder(false));
    dispatch(setShouldRefetchAllSpecimensList(true));
  };

const downloadTransportFolderManifest = (transportFolderId: string) => async (dispatch: AppDispatch) => {
  dispatch(setIsTransportFolderDownloaded(true));

  try {
    const response = await API.results.downloadTransportFolderManifest(transportFolderId);

    if (response) {
      dispatch(setIsTransportFolderDownloaded(false));

      return response.data;
    }
  } catch (error) {
    Sentry.captureException(error);
  }

  dispatch(setIsTransportFolderDownloaded(false));

  return null;
};

const downloadTestResultAttachment = (attachmentId: string) => async () => {
  try {
    const response = await API.results.downloadTestResultAttachment(attachmentId);

    return response.data;
  } catch (error) {
    Sentry.captureException(error);
  }

  return null;
};

export default {
  addMachineForSpecimen,
  addSpecimenToTransportFolder,
  applyRecollectAction,
  applyRetestAction,
  applyMoveToInHouse,
  createTransportFolder,
  downloadTestResultAttachment,
  downloadTransportFolderManifest,
  getAllTestsSpecimensList,
  getLabMachines,
  getLabs,
  getPendingSpecimenStats,
  getPendingTestStats,
  getResultsFilters,
  getResultsList,
  getSpecimenActions,
  getSpecimensFilters,
  getSpecimensForAppointment,
  getSpecimensInTransportList,
  getSpecimensList,
  getSpecimenStorageLocations,
  getTestResultsDetails,
  getTransportActions,
  getTransportFolders,
  updateTransportListDate,
  getTransportList,
  markInTransitAction,
  applyMoveToAllTests,
  onSpecimenConfirmButtonClicked,
  removeTestResultsAttachment,
  resetLastCreatedTransportFolderId,
  updateSpecimenCollectionAppointmentStatus,
  setIsTestResultsSubmitLoading,
  setIsTestResultsSubmitWentSuccessful,
  setShouldRefetchInTransportList,
  setShouldRefetchAllSpecimensList,
  setShouldRefetchTransportsList,
  submitSpecimenCollections,
  submitTestResults
};
