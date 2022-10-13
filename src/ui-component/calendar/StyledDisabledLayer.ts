import { Box, SelectProps, styled } from '@mui/material';
import { paddings } from 'themes/themeConstants';

const StyledDisabledLayer = styled(Box)<SelectProps>(() => ({
  position: 'absolute',
  width: '100%',
  backgroundColor: 'rgba(239, 239, 240, .5)',
  paddingTop: paddings.top140,
  lineHeight: '50px',
  fontSize: '24px',
  textAlign: 'center',
  height: '100%',
  zIndex: '20',
  display: 'flex',
  justifyContent: 'center'
}));

export { StyledDisabledLayer };
