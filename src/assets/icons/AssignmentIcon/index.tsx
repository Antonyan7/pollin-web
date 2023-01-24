import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

import AssignmentSvg from './assignment-icon.svg';

const AssignmentIcon = (props: SvgIconProps) => <SvgIcon {...props} component={AssignmentSvg} inheritViewBox />;

export default AssignmentIcon;
