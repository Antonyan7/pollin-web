import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TransportsSortFields } from '@axios/results/resultsManagerTypes';
import DatePickerWithTodayButton from '@components/Modals/Specimens/AddNewExistingTransport/DatePickerWithTodayButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  DialogActions,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { dispatch, useAppSelector } from '@redux/hooks';
import { bookingSelector } from '@redux/slices/booking';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { format } from 'date-fns';
import { margins } from 'themes/themeConstants';
import { ModalName } from 'types/modals';
import { SortOrder } from 'types/patient';
import { IAddNewExistingTransportModalProps } from 'types/reduxTypes/resultsStateTypes';
import { ITransportFolder } from 'types/results';

import { ButtonWithLoading } from '@ui-component/common/buttons';

const useStyles = makeStyles(() => ({
  menuPaper: {
    maxHeight: 200
  }
}));

const ExistingTransportFolder = (props: IAddNewExistingTransportModalProps) => {
  const { specimenIds } = props;
  const classes = useStyles();
  const transportFolders = useAppSelector(resultsSelector.transportFolders);
  const calendarDate = useAppSelector(bookingSelector.calendarDate);
  const [t] = useTranslation();
  const [transportFolder, setTransportFolder] = useState<string>('');
  const confirmButtonLabel = t(Translation.MODAL_EXTERNAL_RESULTS_PATIENT_CONTACT_INFORMATION_CONFIRMATION_BUTTON);
  const [specimenIdArray, setSpecimenIdArray] = useState<string[]>([]);

  const handleTransportFolderChange = (event: SelectChangeEvent) => {
    setTransportFolder(event.target.value as string);
  };

  const onConfirmAddToNewExistingTransport = () => {
    if (!Array.isArray(specimenIds)) {
      setSpecimenIdArray([specimenIds]);
    } else {
      setSpecimenIdArray(specimenIds);
    }

    const specimens = specimenIdArray.map((specimenId: string) => ({
      id: specimenId
    }));

    dispatch(resultsMiddleware.addSpecimenToTransportFolder(specimens, transportFolder));
    dispatch(viewsMiddleware.closeModal(ModalName.AddNewExistingTransportModal));
  };

  useEffect(() => {
    const body = {
      date: format(new Date(calendarDate), "yyyy-MM-dd'T'HH:mm:ss+00:00"),
      page: 1,
      sortByField: TransportsSortFields.STATUS,
      sortOrder: SortOrder.Asc
    };

    dispatch(resultsMiddleware.getTransportList(body));
  }, [calendarDate]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <DatePickerWithTodayButton />
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="add-transport-folder-label">
                  {t(
                    Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_ADD_NEW_EXISTING_TRANSPORT_FOLDER_MODAL_TRANSPORT_FOLDER
                  )}
                </InputLabel>
                <Select
                  IconComponent={KeyboardArrowDownIcon}
                  labelId="add-transport-folder-label"
                  id="add-transport-folder"
                  value={transportFolder}
                  label="Transport Folder"
                  MenuProps={{ classes: { paper: classes?.menuPaper } }}
                  onChange={handleTransportFolderChange}
                >
                  {transportFolders.map((transport: ITransportFolder) => (
                    <MenuItem value={transport.id} key={transport.id}>
                      {transport.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{ marginBottom: margins.bottom16 }} />
        <DialogActions sx={{ marginTop: margins.top4 }}>
          <Grid container justifyContent="flex-end" alignItems="center">
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
                <ButtonWithLoading
                  disabled={!(calendarDate && transportFolder)}
                  sx={{
                    '&.MuiButton-root.MuiLoadingButton-root': {
                      backgroundColor: (theme) => theme.palette.primary.main
                    },
                    '&.MuiButton-root.MuiLoadingButton-root.Mui-disabled': {
                      backgroundColor: (theme) => theme.palette.primary.light
                    }
                  }}
                  isLoading={false}
                  variant="contained"
                  onClick={onConfirmAddToNewExistingTransport}
                >
                  {confirmButtonLabel}
                </ButtonWithLoading>
              </Stack>
            </Grid>
          </Grid>
        </DialogActions>
      </Grid>
    </Grid>
  );
};

export default ExistingTransportFolder;
