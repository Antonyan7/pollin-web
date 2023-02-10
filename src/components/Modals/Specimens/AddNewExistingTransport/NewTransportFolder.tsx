import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
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
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { dispatch, useAppSelector } from '@redux/hooks';
import { bookingSelector } from '@redux/slices/booking';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { Translation } from 'constants/translations';
import { format } from 'date-fns';
import defineSpecimenId from 'helpers/defineSpecimenId';
import { margins } from 'themes/themeConstants';
import { IAddNewExistingTransportModalProps } from 'types/reduxTypes/resultsStateTypes';

import { ButtonWithLoading } from '@ui-component/common/buttons';

const useStyles = makeStyles(() => ({
  menuPaper: {
    maxHeight: 200
  },
  root: {
    padding: 0
  }
}));

const NewTransportFolder = (props: IAddNewExistingTransportModalProps) => {
  const { specimenIds, selectedIdentifiers } = props;

  const classes = useStyles();
  const labList = useSelector(resultsSelector.testResultLabs);
  const lastCreatedTransportFolder = useAppSelector(resultsSelector.lastCreatedTransportFolder);
  const calendarDate = useAppSelector(bookingSelector.calendarDate);
  const [t] = useTranslation();
  const [labId, setLabId] = useState<string>('');
  const [transportFolderName, setTransportFolderName] = useState<string>('');
  const confirmButtonLabel = t(Translation.MODAL_EXTERNAL_RESULTS_PATIENT_CONTACT_INFORMATION_CONFIRMATION_BUTTON);

  const handleDestinationLabChange = (event: SelectChangeEvent) => {
    setLabId(event.target.value as string);
  };
  const onTransportFolderNameChange = (name: string) => {
    setTransportFolderName(name);
  };

  const createNewTransportFolder = useCallback(() => {
    const body = {
      name: transportFolderName,
      labId,
      date: format(new Date(calendarDate), "yyyy-MM-dd'T'HH:mm:ss+00:00")
    };

    dispatch(resultsMiddleware.createTransportFolder(body));
  }, [calendarDate, labId, transportFolderName]);

  const addSpecimenToAlreadyCreatedTransportFolder = useCallback(() => {
    const specimenIdArray = defineSpecimenId(specimenIds);
    const specimens = specimenIdArray.map((specimenId: string) => ({
      id: specimenId
    }));

    if (lastCreatedTransportFolder?.id) {
      dispatch(
        resultsMiddleware.addSpecimenToTransportFolder(specimens, lastCreatedTransportFolder.id, selectedIdentifiers)
      );
    }
  }, [lastCreatedTransportFolder?.id, specimenIds, selectedIdentifiers]);

  const onConfirmCreateNewTransportFolder = useCallback(() => {
    createNewTransportFolder();
  }, [createNewTransportFolder]);

  useEffect(() => {
    if (!labList.length) {
      dispatch(resultsMiddleware.getLabs());
    }
  }, [labList]);

  useEffect(() => {
    if (lastCreatedTransportFolder?.id) {
      addSpecimenToAlreadyCreatedTransportFolder();
      dispatch(resultsMiddleware.resetLastCreatedTransportFolderId());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastCreatedTransportFolder?.id]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <DatePickerWithTodayButton />
            <Grid container item xs={12} justifyContent="space-between">
              <Grid item xs={6}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {t(Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_ADD_NEW_TRANSPORT_FOLDER_MODAL_TRANSPORT_FOLDER_ID)}
                  :
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(event) => onTransportFolderNameChange(event.target.value)}
                className="schedule-inputs"
                color="primary"
                fullWidth
                placeholder={
                  t(
                    Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_ADD_NEW_TRANSPORT_FOLDER_MODAL_TRANSPORT_FOLDER_NAME
                  ) as string
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="add-transport-folder-label">
                  {t(Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_ADD_NEW_TRANSPORT_FOLDER_MODAL_DESTINATION_LAB)}
                </InputLabel>
                <Select
                  IconComponent={KeyboardArrowDownIcon}
                  labelId="add-transport-folder-label"
                  id="add-transport-folder"
                  value={labId}
                  MenuProps={{ classes: { paper: classes?.menuPaper } }}
                  onChange={handleDestinationLabChange}
                >
                  {labList.map((lab) => (
                    <MenuItem value={lab.id} key={lab.id}>
                      {lab.title}
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
                  disabled={!(labId && transportFolderName && calendarDate)}
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
                  onClick={onConfirmCreateNewTransportFolder}
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

export default NewTransportFolder;
