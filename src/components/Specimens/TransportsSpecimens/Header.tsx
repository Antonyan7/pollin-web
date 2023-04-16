import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SeveritiesType } from '@components/Scheduling/types';
import SearchBox from '@components/SearchBox';
import { Add } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { viewsMiddleware } from '@redux/slices/views';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { margins } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import PollinDatePickerWithTodayButton from '@ui-component/shared/DatePicker/PollinDatePickerWithTodayButton';

import { HeaderProps } from './types';

const Header: React.FC<HeaderProps> = ({ searchByIdsHandler, searchedItems }) => {
  const [t] = useTranslation();

  const scanBarcodeLabel = t(Translation.PAGE_IN_HOUSE_SPECIMENS_SEARCH_PLACEHOLDER);
  const addTransportNewFolderButtonLabel = t(
    Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_ADD_NEW_TRANSPORT_FOLDER_BUTTON_LABEL
  );

  const labList = useAppSelector(resultsSelector.testResultLabs);
  const transportList = useAppSelector(resultsSelector.transportList);
  const isSpecimensListLoading = useAppSelector(resultsSelector.isSpecimensListLoading);
  const invalidSearchedItems = transportList?.notFound?.map((notFoundItem) => notFoundItem.identifier);

  const calendarDate = useAppSelector(resultsSelector.transportListDate);

  useEffect(() => {
    const shouldShowToast = searchedItems.length > 0 && !isSpecimensListLoading;

    if (shouldShowToast) {
      if (transportList?.notFound?.length > 0) {
        dispatch(
          viewsMiddleware.setToastNotificationPopUpState({
            open: true,
            props: {
              severityType: SeveritiesType.error,
              renderList: {
                header: t(Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_SEARCH_FAIL),
                items: invalidSearchedItems
              }
            }
          })
        );
      } else {
        dispatch(
          viewsMiddleware.setToastNotificationPopUpState({
            open: true,
            props: {
              severityType: SeveritiesType.success,
              renderList: {
                header: t(Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_SEARCH_SUCCESS),
                items: searchedItems.filter((searchedItem) => !invalidSearchedItems.includes(searchedItem))
              }
            }
          })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transportList.notFound, isSpecimensListLoading]);

  useEffect(() => {
    if (!labList.length) {
      dispatch(resultsMiddleware.getLabs());
    }
  }, [labList]);

  const onDateChange = useCallback((date?: Date | null) => {
    if (date) {
      dispatch(resultsMiddleware.updateTransportListDate(date));
    }
  }, []);

  const onAddTransportNewFolderClick = useCallback(() => {
    dispatch(resultsMiddleware.resetLastCreatedTransportFolderId());

    dispatch(
      viewsMiddleware.openModal({
        name: ModalName.AddNewTransportFolderModal,
        props: {}
      })
    );
  }, []);

  return (
    <>
      <SearchBox
        onSearch={searchByIdsHandler}
        placeholder={scanBarcodeLabel}
        invalidSearchedItems={invalidSearchedItems}
      />
      <Grid display="flex" justifyContent="space-between" my={margins.topBottom20}>
        <Grid item xs={3}>
          <PollinDatePickerWithTodayButton
            dateDataCy={CypressIds.PAGE_SPECIMEN_TRACKING_TRANSPORT_LIST_DATE_PICKER}
            todayDataCy={CypressIds.PAGE_SPECIMEN_TRACKING_TRANSPORT_LIST_TODAY_BUTTON}
            calendarDate={calendarDate}
            onChange={onDateChange}
          />
        </Grid>
        <Grid item xs={3} display="flex">
          <Button
            variant="contained"
            endIcon={<Add />}
            onClick={onAddTransportNewFolderClick}
            data-cy={CypressIds.PAGE_SPECIMEN_TRACKING_TRANSPORT_LIST_TODAY_BUTTON}
          >
            {addTransportNewFolderButtonLabel}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
