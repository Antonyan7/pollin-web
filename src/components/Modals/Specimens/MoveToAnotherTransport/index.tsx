import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import TargetsList from '@components/TargetsList';
import { Grid, Typography } from '@mui/material';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { dispatch } from 'redux/hooks';
import { paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import BaseModal from '@ui-component/Modal/BaseModal';

import ExistingTransportFolder from '../AddNewExistingTransport/ExistingTransportFolder';

export interface MoveToAnotherTransportProps {
  specimenIds: string[];
  selectedIdentifiers: string[];
}

const MoveToAnotherTransport: FC<MoveToAnotherTransportProps> = ({ specimenIds, selectedIdentifiers }) => {
  const [t] = useTranslation();
  const moveToAnotherTransportLabel = t(
    Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_MOVE_TO_ANOTHER_TRANSPORT_MODAL_TITLE
  );
  const moveToAnotherTransportDescription = t(
    Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_MOVE_TO_ANOTHER_TRANSPORT_MODAL_DESCRIPTION
  );
  const moveToAnotherTransportSpecimenIdLabel = t(
    Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_MOVE_TO_ANOTHER_TRANSPORT_MODAL_SPECIMEN_ID_LABEL
  );

  return (
    <BaseModal
      title={moveToAnotherTransportLabel}
      onClose={() => dispatch(viewsMiddleware.closeModal(ModalName.MoveToAnotherTransport))}
      disableDivider
      titleSx={{
        px: paddings.leftRight24
      }}
    >
      <Grid
        sx={{
          width: 500
        }}
      >
        <TargetsList label={moveToAnotherTransportSpecimenIdLabel} values={selectedIdentifiers} />
        <Typography variant="h5" py={paddings.topBottom24}>
          {moveToAnotherTransportDescription}
        </Typography>
        <ExistingTransportFolder
          specimenIds={specimenIds}
          selectedIdentifiers={selectedIdentifiers}
          modalName={ModalName.MoveToAnotherTransport}
        />
      </Grid>
    </BaseModal>
  );
};

export default MoveToAnotherTransport;
