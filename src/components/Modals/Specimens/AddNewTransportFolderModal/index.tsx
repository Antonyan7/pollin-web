import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  DialogActions,
  DialogContent,
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
import { dispatch } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { viewsMiddleware } from '@redux/slices/views';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';
import PollinDatePickerWithTodayButton from 'ui-component/shared/DatePicker/PollinDatePickerWithTodayButton';

import { ButtonWithLoading } from '@ui-component/common/buttons';
import BaseModal from '@ui-component/Modal/BaseModal';
import { DateUtil } from '@utils/date/DateUtil';

const useStyles = makeStyles(() => ({
  menuPaper: {
    maxHeight: 200
  }
}));

const AddNewTransportFolderModal = () => {
  const classes = useStyles();
  const isPatientContactInformationLoading = useSelector(patientsSelector.isPatientContactInformationLoading);
  const labList = useSelector(resultsSelector.testResultLabs);
  const [calendarDate, setCalendarDate] = useState<Date | null>(DateUtil.representInClinicDate());
  const [t] = useTranslation();
  const addNewTransportFolderModalTitleLabel = t(
    Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_ADD_NEW_TRANSPORT_FOLDER_MODAL_TITLE
  );
  const [labId, setLabId] = useState<string>('');
  const [transportFolderName, setTransportFolderName] = useState<string>('');
  const confirmButtonLabel = t(Translation.MODAL_EXTERNAL_RESULTS_PATIENT_CONTACT_INFORMATION_CONFIRMATION_BUTTON);

  const onClose = () => dispatch(viewsMiddleware.closeModal(ModalName.AddNewTransportFolderModal));
  const handleDestinationLabChange = (event: SelectChangeEvent) => {
    setLabId(event.target.value as string);
  };

  const onTransportFolderNameChange = (name: string) => {
    setTransportFolderName(name);
  };

  const onConfirmCreateNewTransportFolder = () => {
    const body = {
      name: transportFolderName,
      labId,
      date: calendarDate as Date
    };

    dispatch(resultsMiddleware.createTransportFolder(body));
    dispatch(viewsMiddleware.closeModal(ModalName.AddNewTransportFolderModal));
  };

  return (
    <BaseModal
      isLoading={isPatientContactInformationLoading}
      title={addNewTransportFolderModalTitleLabel}
      onClose={onClose}
    >
      <Grid>
        <DialogContent sx={{ p: paddings.all12 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                  <PollinDatePickerWithTodayButton
                    calendarDate={calendarDate as Date}
                    onChange={setCalendarDate}
                    todayDataCy={CypressIds.MODAL_SPECIMEN_TRACKING_ADD_NEW_TRANSPORT_TODAY_BUTTON}
                    dateDataCy={CypressIds.MODAL_SPECIMEN_TRACKING_ADD_NEW_TRANSPORT_DATE_PICKER}
                  />
                  <Grid container item xs={12} justifyContent="space-between">
                    <Grid item xs={6}>
                      <Typography variant="subtitle1" fontWeight={500}>
                        {t(
                          Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_ADD_NEW_TRANSPORT_FOLDER_MODAL_TRANSPORT_FOLDER_ID
                        )}
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
                      inputProps={{
                        'data-cy': CypressIds.MODAL_SPECIMEN_TRACKING_ADD_NEW_TRANSPORT_NAME_FIELD
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="add-transport-folder-label">
                        {t(
                          Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_ADD_NEW_TRANSPORT_FOLDER_MODAL_DESTINATION_LAB
                        )}
                      </InputLabel>
                      <Select
                        IconComponent={KeyboardArrowDownIcon}
                        labelId="add-transport-folder-label"
                        id="add-transport-folder"
                        value={labId}
                        label="Destination Lab"
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
                        disabled={!(labId && transportFolderName)}
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
                        dataCy={CypressIds.MODAL_SPECIMEN_TRACKING_ADD_NEW_TRANSPORT_CONFIRM_BUTTON}
                      >
                        {confirmButtonLabel}
                      </ButtonWithLoading>
                    </Stack>
                  </Grid>
                </Grid>
              </DialogActions>
            </Grid>
          </Grid>
        </DialogContent>
      </Grid>
    </BaseModal>
  );
};

export default AddNewTransportFolderModal;
