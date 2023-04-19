import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
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
  Theme
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import defineSpecimenId from 'helpers/defineSpecimenId';
import { margins } from 'themes/themeConstants';
import { ModalName } from 'types/modals';
import { IAddNewExistingTransportModalProps } from 'types/reduxTypes/resultsStateTypes';

import { ButtonWithLoading } from '@ui-component/common/buttons';
import PollinDatePickerWithTodayButton from '@ui-component/shared/DatePicker/PollinDatePickerWithTodayButton';
import { DateUtil } from '@utils/date/DateUtil';

const useStyles = makeStyles((theme: Theme) => ({
  menuPaper: {
    maxHeight: 200
  },
  root: {
    padding: 0
  },
  select: {
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.main
    }
  }
}));

const NewTransportFolder = (props: IAddNewExistingTransportModalProps) => {
  const { specimenIds, selectedIdentifiers } = props;
  const classes = useStyles();
  const labList = useSelector(resultsSelector.testResultLabs);
  const lastCreatedTransportFolder = useAppSelector(resultsSelector.lastCreatedTransportFolder);
  const [calendarDate, setCalendarDate] = useState<Date | null>(DateUtil.representInClinicDate());
  const [t] = useTranslation();
  const [labId, setLabId] = useState<string>('');
  const [transportFolderName, setTransportFolderName] = useState<string>('');
  const confirmButtonLabel = t(Translation.MODAL_EXTERNAL_RESULTS_PATIENT_CONTACT_INFORMATION_CONFIRMATION_BUTTON);
  const transportFolderLabel = t(
    Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_ADD_NEW_TRANSPORT_FOLDER_MODAL_DESTINATION_LAB
  );
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
      date: calendarDate as Date
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
        resultsMiddleware.addSpecimenToTransportFolder(
          specimens,
          lastCreatedTransportFolder.id,
          ModalName.AddNewExistingTransportModal,
          selectedIdentifiers
        )
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
            <PollinDatePickerWithTodayButton
              calendarDate={calendarDate as Date}
              onChange={setCalendarDate}
              disablePast
            />
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
                inputProps={{
                  'data-cy': CypressIds.MODAL_SPECIMEN_TRACKING_ADD_NEW_TRANSPORT_NAME_FIELD
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="add-transport-folder-label">{transportFolderLabel}</InputLabel>
                <Select
                  IconComponent={KeyboardArrowDownIcon}
                  className={classes.select}
                  labelId="add-transport-folder-label"
                  id="add-transport-folder"
                  label={transportFolderLabel}
                  value={labId}
                  MenuProps={{ classes: { paper: classes?.menuPaper } }}
                  onChange={handleDestinationLabChange}
                  data-cy={CypressIds.MODAL_SPECIMEN_TRACKING_ADD_NEW_TRANSPORT_DESTINATION_FIELD}
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
                  data-cy={CypressIds.MODAL_SPECIMEN_TRACKING_ADD_NEW_TRANSPORT_CONFIRM_BUTTON}
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
