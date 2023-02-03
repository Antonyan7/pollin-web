import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

import taskDashboard from './taskDashboard.svg';

const TaskDashboardIcon = (props: SvgIconProps) => <SvgIcon {...props} component={taskDashboard} inheritViewBox />;

export default TaskDashboardIcon;
