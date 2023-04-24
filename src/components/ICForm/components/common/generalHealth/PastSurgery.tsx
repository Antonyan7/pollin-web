import React from 'react';
import {
  MedicalFormTitleNo,
  MedicalFormTitleYes
} from '@components/MedicalBackground/components/common/MedWithItemsView';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';

import { DateUtil } from '@utils/date/DateUtil';

const PastSurgeries = () => {
  const pastSurgeries = useAppSelector(patientsSelector.icForm)?.generalHealth.pastSurgeries.items;

  return (
    <Grid item container direction="column" gap={1}>
      {pastSurgeries && pastSurgeries.length ? (
        <>
          <Grid>
            <MedicalFormTitleYes />
          </Grid>
          {pastSurgeries.map((pastSurgery) => {
            const dateOfSurgery = DateUtil.formatDateOnly(pastSurgery.dateOfSurgery);

            return <Grid key={pastSurgery.typeOfSurgery}>{`${pastSurgery.typeOfSurgery}; ${dateOfSurgery}`}</Grid>;
          })}
        </>
      ) : (
        <MedicalFormTitleNo />
      )}
    </Grid>
  );
};

export default PastSurgeries;
