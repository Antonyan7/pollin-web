import { Theme } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';

import { margins, paddings } from './themeConstants';

const Typography = (theme: Theme, borderRadius: number, fontFamily: string): TypographyOptions => ({
  fontFamily,
  h6: {
    fontWeight: 500,
    color: theme.palette.grey[900],
    fontSize: '0.75rem'
  },
  h5: {
    fontSize: '0.875rem',
    color: theme.palette.grey[900],
    fontWeight: 500
  },
  h4: {
    fontSize: '1rem',
    color: theme.palette.grey[900],
    fontWeight: 500
  },
  h3: {
    fontSize: '1.25rem',
    color: theme.palette.grey[900],
    fontWeight: 500
  },
  h2: {
    fontSize: '1.5rem',
    color: theme.palette.grey[900],
    fontWeight: 500
  },
  h1: {
    fontSize: '2.125rem',
    color: theme.palette.grey[900],
    fontWeight: 500
  },
  subtitle1: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: theme.palette.text.dark
  },
  subtitle2: {
    fontSize: '0.75rem',
    fontWeight: 400,
    color: theme.palette.text.secondary
  },
  caption: {
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
    fontWeight: 400
  },
  body1: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: '1.334em'
  },
  body2: {
    letterSpacing: '0em',
    fontWeight: 400,
    lineHeight: '1.5em',
    color: theme.palette.text.primary
  },
  button: {
    textTransform: 'capitalize'
  },
  customInput: {
    marginTop: margins.top2,
    marginBottom: margins.bottom2,
    '& > label': {
      top: margins.top24,
      left: margins.left0,
      color: theme.palette.grey[500],
      '&[data-shrink="false"]': {
        top: margins.top4
      }
    },
    '& > div > input': {
      padding: `${paddings.top32} ${paddings.leftRight16} ${paddings.left12}`
    },
    '& legend': {
      display: 'none'
    },
    '& fieldset': {
      top: margins.top0
    }
  },
  mainContent: {
    backgroundColor: theme.palette.secondary[200],
    width: '100%',
    minHeight: 'calc(100vh - 88px)',
    flexGrow: 1,
    padding: `${paddings.top12} ${paddings.right24} ${paddings.bottom64} ${paddings.left24}`,
    marginTop: margins.top88,
    marginRight: margins.right20,
    borderRadius: `${borderRadius}px`
  },
  menuCaption: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: theme.palette.grey[900],
    padding: paddings.all8,
    textTransform: 'capitalize',
    marginTop: margins.top12
  },
  subMenuCaption: {
    fontSize: '0.6875rem',
    fontWeight: 500,
    color: theme.palette.text.secondary,
    textTransform: 'capitalize'
  },
  commonAvatar: {
    cursor: 'pointer',
    borderRadius: '8px'
  },
  smallAvatar: {
    width: '22px',
    height: '22px',
    fontSize: '1rem'
  },
  mediumAvatar: {
    width: '34px',
    height: '34px',
    fontSize: '1.2rem'
  },
  largeAvatar: {
    width: '44px',
    height: '44px',
    fontSize: '1.5rem'
  }
});

export default Typography;
