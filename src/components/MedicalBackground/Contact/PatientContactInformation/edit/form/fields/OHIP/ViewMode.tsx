import React from 'react';
import { RenderMappedNote } from '@components/MedicalBackground/components/common';
import {
  ItemsViewWrapper,
  MedicalFormTitleNo,
  MedicalFormTitleYes
} from '@components/MedicalBackground/components/common/MedWithItemsView';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { paddings } from 'themes/themeConstants';

const OHIPViewMode = () => {
  const contactInformation = useAppSelector(patientsSelector.contactInformation);
  const ohip = contactInformation?.OHIP;

  return (
    <ItemsViewWrapper>
      {ohip?.number || ohip?.versionCode ? (
        <>
          <MedicalFormTitleYes />
          <Grid py={paddings.leftRight8}>{`${ohip.number}; ${ohip.versionCode}`}</Grid>
          <RenderMappedNote note={ohip.note} />
        </>
      ) : (
        <MedicalFormTitleNo />
      )}
    </ItemsViewWrapper>
  );
};

export default OHIPViewMode;
