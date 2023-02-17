import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SeveritiesType } from '@components/Scheduling/types';
import SearchBox from '@components/SearchBox';
import { Add } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { margins } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import DefaultDatePicker from '@ui-component/common/DefaultDatePicker';

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
          <DefaultDatePicker />
        </Grid>
        <Grid item xs={3} display="flex">
          <Button variant="contained" endIcon={<Add />} onClick={onAddTransportNewFolderClick}>
            {addTransportNewFolderButtonLabel}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
