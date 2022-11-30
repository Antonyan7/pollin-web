import React from 'react';
import { useSelector } from 'react-redux';
import API from '@axios/API';
import patientEmrHelpers from '@axios/patientEmr/patinerEmrHelpers';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import EarbudsIcon from '@mui/icons-material/Earbuds';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { Avatar, Box, Button, ButtonProps, Grid, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { dispatch } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';

const avatarImage = '/assets/images/users';

interface ContactListProps {
  avatar?: string;
  name?: string;
  date?: string;
  cycleStatus?: string | boolean;
  setOpen: (open: boolean) => void;
  open: boolean;
}

const ContactList = ({ avatar, name, date, cycleStatus, setOpen, open }: ContactListProps) => {
  const theme = useTheme();
  const avatarProfile = avatar && `${avatarImage}/${avatar}`;

  const patientId = useSelector(patientsSelector.currentPatientId);
  const patientHighlightHeader = useSelector(patientsSelector.patientHighlightHeader);

  const onButtonClick =
    (uuid: string): ButtonProps['onClick'] =>
    async () => {
      const patientHighlightDetails = await API.patients.getPatientHighlightDetails(patientId, uuid);

      if (patientHighlightDetails) {
        const modalParams = patientEmrHelpers.getModalParamsFromPatientHighlightDetails(patientHighlightDetails);

        dispatch(viewsMiddleware.openModal(modalParams));
      }
    };

  return (
    <Box py="15px" borderBottom={`1px solid ${theme.palette.grey[100]}!important`}>
      <Grid container alignItems="center">
        <Grid item xs={12} sm={6} style={{ cursor: 'pointer' }}>
          <Grid container alignItems="center" sx={{ flexWrap: 'nowrap' }}>
            <Grid item>
              <Avatar alt={name} src={avatarProfile} sx={{ width: 60, height: 60, m: 3 }} />
            </Grid>
            <Grid item sm zeroMinWidth>
              <Grid container spacing={0}>
                <Grid item xs={8}>
                  <Typography variant="h4" component="div">
                    {name}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="outlined" disabled sx={{ borderRadius: '60px', height: 23 }}>
                    {cycleStatus ? 'Active' : 'Not Active'}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption">{date}</Typography>
                </Grid>
                <Grid container spacing={0} justifyContent="center" alignItems="center">
                  <Grid item xs={4}>
                    <Button
                      startIcon={<CallOutlinedIcon />}
                      disabled={!patientHighlightHeader.contact.uuid}
                      onClick={onButtonClick(patientHighlightHeader.contact.uuid)}
                    >
                      <Typography variant="caption">{patientHighlightHeader.contact.title}</Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      startIcon={<ContentPasteIcon />}
                      disabled={!patientHighlightHeader.ohip.uuid}
                      onClick={onButtonClick(patientHighlightHeader.ohip.uuid)}
                    >
                      <Typography variant="caption">{patientHighlightHeader.ohip.title}</Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      startIcon={<EarbudsIcon />}
                      disabled={!patientHighlightHeader.doctor.uuid}
                      onClick={onButtonClick(patientHighlightHeader.doctor.uuid)}
                    >
                      {/* change icon */}
                      <Typography variant="caption">{patientHighlightHeader.doctor.title}</Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid
            container
            spacing={1}
            sx={{ justifyContent: 'flex-end', [theme.breakpoints.down('md')]: { justifyContent: 'flex-start' } }}
          >
            <Grid item>
              <Tooltip placement="top" title="Message">
                <Button
                  sx={{ minWidth: 32, height: 32, margin: '10px 10px' }}
                  startIcon={<ModeEditOutlinedIcon fontSize="small" />}
                >
                  Edit Profile
                </Button>
              </Tooltip>
              <Tooltip placement="top" title="Message">
                <Button sx={{ minWidth: 32, height: 32 }} onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactList;
