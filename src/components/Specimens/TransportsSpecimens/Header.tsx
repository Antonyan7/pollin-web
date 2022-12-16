/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchBox from '@components/SearchBox';
import { Add } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { resultsMiddleware } from '@redux/slices/results';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { margins } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import DefaultDatePicker from '@ui-component/common/DefaultDatePicker';

import { HeaderProps } from './types';

const Header: React.FC<HeaderProps> = ({ handlePageChange }) => {
  const [t] = useTranslation();
  // To do
  const [_, setIdentifiers] = useState<string[]>([]);
  const searchByIdsHandler = (ids: string[]) => {
    handlePageChange(0);
    setIdentifiers(ids);
  };

  const scanBarcodeLabel = t(Translation.PAGE_IN_HOUSE_SPECIMENS_SEARCH_PLACEHOLDER);
  const addTransportNewFolderButtonLabel = t(
    Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_ADD_NEW_TRANSPORT_FOLDER_BUTTON_LABEL
  );

  useEffect(() => {
    dispatch(resultsMiddleware.getLabs());
  }, []);

  const onAddTransportNewFolderClick = () => {
    dispatch(resultsMiddleware.resetLastCreatedTransportFolderId());

    dispatch(
      viewsMiddleware.openModal({
        name: ModalName.AddNewTransportFolderModal,
        props: {}
      })
    );
  };

  return (
    <>
      <SearchBox onSearch={searchByIdsHandler} placeholder={scanBarcodeLabel} />
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
