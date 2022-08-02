import React, { useState } from 'react';
import { Avatar, Box, Card, Grid, InputAdornment, OutlinedInput, Popper } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';
import { IconAdjustmentsHorizontal, IconSearch, IconX } from '@tabler/icons';
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';

import Transitions from '../../../../components/Transition/Transitions';

const PopperStyle = styled(Popper, { shouldForwardProp })(({ theme }) => ({
  zIndex: 1100,
  width: '99%',
  top: '-55px !important',
  padding: '0 12px',
  [theme.breakpoints.down('sm')]: {
    padding: '0 10px'
  }
}));

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
  width: 434,
  marginLeft: 16,
  paddingLeft: 16,
  paddingRight: 16,
  '& input': {
    background: 'transparent !important',
    paddingLeft: '4px !important'
  },
  [theme.breakpoints.down('lg')]: {
    width: 250
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: 4,
    background: '#fff'
  }
}));

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
  ...theme.typography.commonAvatar,
  ...theme.typography.mediumAvatar,
  overflow: 'hidden',
  transition: 'all .2s ease-in-out',
  background: '#C4C4C4',
  '&:hover': {
    background: '#7F8487'
  }
}));

interface Props {
  value: string;
  setValue: (value: string) => void;
  popupState: any;
}

const MobileSearch = ({ value, setValue, popupState }: Props) => {
  const theme = useTheme();

  return (
    <OutlineInputStyle
      id="input-search-header"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search"
      startAdornment={
        <InputAdornment position="start">
          <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end">
          <HeaderAvatarStyle variant="rounded">
            <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
          </HeaderAvatarStyle>
          <Box sx={{ ml: 2 }}>
            <Avatar
              variant="rounded"
              sx={{
                ...theme.typography.commonAvatar,
                ...theme.typography.mediumAvatar,
                background: theme.palette.orange.light,
                color: theme.palette.orange.dark,
                '&:hover': {
                  background: theme.palette.orange.dark,
                  color: theme.palette.orange.light
                }
              }}
              {...bindToggle(popupState)}
            >
              <IconX stroke={1.5} size="1.3rem" />
            </Avatar>
          </Box>
        </InputAdornment>
      }
      aria-describedby="search-helper-text"
      inputProps={{ 'aria-label': 'weight' }}
    />
  );
};

const SearchSection = () => {
  const theme = useTheme();
  const [value, setValue] = useState('');

  return (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <PopupState variant="popper" popupId="demo-popup-popper">
          {(popupState) => (
            <>
              <Box sx={{ ml: 2 }}>
                <HeaderAvatarStyle variant="rounded" {...bindToggle(popupState)}>
                  <IconSearch stroke={1.5} size="1.2rem" />
                </HeaderAvatarStyle>
              </Box>
              <PopperStyle {...bindPopper(popupState)} transition>
                {({ TransitionProps }) => (
                  <Transitions type="zoom" {...TransitionProps} sx={{ transformOrigin: 'center left' }}>
                    <Card
                      sx={{
                        background: '#fff',
                        [theme.breakpoints.down('sm')]: {
                          border: 0,
                          boxShadow: 'none'
                        }
                      }}
                    >
                      <Box sx={{ p: 2 }}>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item xs>
                            <MobileSearch value={value} setValue={setValue} popupState={popupState} />
                          </Grid>
                        </Grid>
                      </Box>
                    </Card>
                  </Transitions>
                )}
              </PopperStyle>
            </>
          )}
        </PopupState>
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <OutlineInputStyle
          id="input-search-header"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <HeaderAvatarStyle variant="rounded">
                <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" color="black" />
              </HeaderAvatarStyle>
            </InputAdornment>
          }
          aria-describedby="search-helper-text"
          inputProps={{ 'aria-label': 'weight' }}
        />
      </Box>
    </>
  );
};

export default SearchSection;
