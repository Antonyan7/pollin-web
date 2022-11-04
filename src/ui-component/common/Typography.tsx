import { styled, Typography } from '@mui/material';
import { margins } from 'themes/themeConstants';

const ParserTypographyWrapper = styled(Typography)(() => ({
  '& > *': { margin: margins.all0 }
}));

export default ParserTypographyWrapper;
