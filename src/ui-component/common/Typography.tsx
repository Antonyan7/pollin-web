import { styled, Typography } from '@mui/material';
import { lineHeights, margins } from 'themes/themeConstants';

const ParserTypographyWrapper = styled(Typography)(() => ({
  wordBreak: 'break-word',
  '& > *': { margin: margins.all0 },
  '& > h1': { lineHeight: lineHeights.lineHeight25 }
}));

export default ParserTypographyWrapper;
