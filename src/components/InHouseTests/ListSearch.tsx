import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SeveritiesType } from '@components/Scheduling/types';
import SearchBox from '@components/SearchBox';
import { Grid } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsSelector } from '@redux/slices/results';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';

import useSpecimensListContext from './hooks/useSpecimensListContext';

const SpecimenListSearch = () => {
  const [t] = useTranslation();
  const searchPlaceholder = t(Translation.PAGE_IN_HOUSE_SPECIMENS_SEARCH_PLACEHOLDER);
  const specimensList = useAppSelector(resultsSelector.specimensList);
  const isSpecimensListLoading = useAppSelector(resultsSelector.isSpecimensListLoading);
  const invalidSearchedItems = specimensList.notFound.map((notFoundItem) => notFoundItem.identifier);
  const { callbacks, inHouseSpecimensList } = useSpecimensListContext();
  const { searchByIdsHandler } = callbacks;
  const { searchedItems } = inHouseSpecimensList;

  useEffect(() => {
    const shouldShowToast = searchedItems.length > 0 && !isSpecimensListLoading;

    if (shouldShowToast) {
      if (specimensList.notFound?.length > 0) {
        dispatch(
          viewsMiddleware.setToastNotificationPopUpState({
            open: true,
            props: {
              severityType: SeveritiesType.error,
              renderList: {
                header: t(Translation.PAGE_IN_HOUSE_SPECIMENS_SEARCH_FAIL),
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
              description: t(Translation.PAGE_IN_HOUSE_SPECIMENS_SEARCH_SUCCESS)
            }
          })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specimensList.notFound, isSpecimensListLoading]);

  return (
    <Grid item xs={12} md={6} lg={6}>
      <SearchBox
        onSearch={searchByIdsHandler}
        invalidSearchedItems={invalidSearchedItems}
        placeholder={searchPlaceholder}
      />
    </Grid>
  );
};

export default SpecimenListSearch;
