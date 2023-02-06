import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

import AlertSvg from './alert.svg';

const AlertIcon = (props: SvgIconProps) => <SvgIcon {...props} component={AlertSvg} inheritViewBox />;

export default AlertIcon;
