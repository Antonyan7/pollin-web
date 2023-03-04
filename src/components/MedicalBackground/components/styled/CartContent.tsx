import { Grid, styled } from '@mui/material';
import { GridProps } from '@mui/system';
import { paddings } from 'themes/themeConstants';

const CardContentWrapper = styled(Grid)<GridProps>(() => ({
  padding: `${paddings.topBottom24} 0`
}));

export default CardContentWrapper;
