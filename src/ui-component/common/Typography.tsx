import { styled, Typography } from '@mui/material';
import { margins } from 'themes/themeConstants';

const ParserTypographyWrapper = styled(Typography)(() => ({
  '& > p': { margin: margins.all0 }
}));

export default ParserTypographyWrapper;
