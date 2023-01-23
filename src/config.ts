// types
import { ConfigProps } from 'types/config';

export const DASHBOARD_PATH = '/';

const config: ConfigProps = {
  fontFamily: `'Geomanist', 'Lora', 'Roboto', sans-serif`,
  borderRadius: 8,
  outlinedFilled: true,
  navType: 'light', // light, dark
  presetColor: 'default', // default, theme1, theme2, theme3, theme4, theme5, theme6
  locale: 'en', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
  rtlLayout: false,
  container: false
};

export default config;
