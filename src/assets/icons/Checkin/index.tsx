import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

import Checkin from './checkin.svg';

const CheckinIcon = (props: SvgIconProps) => <SvgIcon {...props} component={Checkin} inheritViewBox />;

export default CheckinIcon;
