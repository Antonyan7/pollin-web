import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

import DoctorSvg from './doctor-icon.svg';

const DoctorIcon = (props: SvgIconProps) => <SvgIcon {...props} component={DoctorSvg} inheritViewBox />;

export default DoctorIcon;
