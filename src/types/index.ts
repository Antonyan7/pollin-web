// material-ui
import '@mui/styles';

import { Theme } from '@mui/material/styles';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

export interface ColorProps {
  readonly [key: string]: string;
}
