import React, { useState } from 'react';
import { Avatar, AvatarProps, Box, Card, Grid, InputAdornment, OutlinedInput, Popper, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';
import { IconAdjustmentsHorizontal, IconSearch, IconX } from '@tabler/icons';
import Transitions from 'components/Transition/Transitions';
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';
import { margins, paddings } from 'themes/themeConstants';

const PopperStyle = styled(Popper, { shouldForwardProp })(({ theme }) => ({
  zIndex: 1305,
  width: '99%',
  top: '-55px',
  padding: `${paddings.topBottom0} ${paddings.leftRight12}`,
  [theme.breakpoints.down('sm')]: {
    padding: `${paddings.topBottom0} ${paddings.leftRight12}`
  }
}));

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
  width: 434,
  marginLeft: margins.left16,
  paddingLeft: paddings.left16,
  paddingRight: paddings.right16,
  '& input': {
    background: 'transparent',
    paddingLeft: paddings.left4
  },
  [theme.breakpoints.down('lg')]: {
    width: 250
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: margins.left4,
    background: theme.palette.common.white
  }
}));

const HeaderAvatarStyle = styled(Avatar)<AvatarProps>(({ theme }) => ({
  ...theme.typography.commonAvatar,
  ...theme.typography.mediumAvatar,
  overflow: 'hidden',
  transition: 'all .2s ease-in-out',
  backgroundColor: theme.palette.secondary.light,
  color: theme.palette.secondary.dark,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.secondary.light
  }
}));

const StyledAvatar = styled(Avatar)<AvatarProps>(({ theme }) => ({
  ...theme.typography.commonAvatar,
  ...theme.typography.mediumAvatar,
  background: theme.palette.orange.light,
  color: theme.palette.orange.dark,
  '&:hover': {
    background: theme.palette.orange.dark,
    color: theme.palette.orange.light
  }
}));

interface Props {
  value: string;
  setValue: (value: string) => void;
}

const MobileSearch = ({ value, setValue }: Props) => {
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
            <StyledAvatar variant="rounded" theme={theme}>
              <IconX stroke={1.5} size="1.3rem" />
            </StyledAvatar>
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
                        background: theme.palette.common.white,
                        [theme.breakpoints.down('sm')]: {
                          border: 0,
                          boxShadow: 'none'
                        }
                      }}
                    >
                      <Box sx={{ p: 2 }}>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item xs>
                            <MobileSearch value={value} setValue={setValue} />
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
                <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
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
