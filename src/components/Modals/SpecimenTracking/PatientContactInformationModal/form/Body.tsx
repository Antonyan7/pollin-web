import React, { ChangeEvent, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Actions from '@components/Modals/SpecimenTracking/PatientContactInformationModal/form/Actions';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { resultsMiddleware } from '@redux/slices/results';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { ModalName } from 'types/modals';
import { ITransportListFolderProps } from 'types/reduxTypes/resultsStateTypes';

interface BodyProps {
  row: ITransportListFolderProps;
}

const Body = ({ row }: BodyProps) => {
  const [t] = useTranslation();

  const driverNameLabel = t(Translation.MODAL_HANDOFF_CONFIRMATION_DRIVER_NAME);
  const commentsLabel = t(Translation.MODAL_HANDOFF_CONFIRMATION_COMMENTS);

  const [driverName, setDriverName] = useState('');
  const [comment, setComment] = useState<string>();

  const onDriverNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDriverName(e.target.value);
  };

  const onCommentsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const onActionClick = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(ModalName.HandoffConfirmation));
    dispatch(
      resultsMiddleware.markInTransitAction(
        {
          transportFolderId: row.id,
          driverName,
          comment
        },
        row.title
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment, driverName, row.id]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Typography variant="subtitle1" fontWeight={500}>
                {t(Translation.MODAL_HANDOFF_CONFIRMATION_TRANSPORT_FOLDER)}:
              </Typography>
              <Typography variant="subtitle1" fontWeight={500}>
                {t(Translation.MODAL_HANDOFF_CONFIRMATION_LAB_DESTINATION)}:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">{row.title}</Typography>
              <Typography variant="subtitle1">{row.labName}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={driverNameLabel}
                  name={driverName}
                  onChange={onDriverNameChange}
                  placeholder={driverNameLabel}
                  multiline
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={commentsLabel}
                  onChange={onCommentsChange}
                  rows={4}
                  placeholder={commentsLabel}
                  multiline
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Actions onClick={onActionClick} disabled={!driverName} />
    </>
  );
};

export default Body;
