import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

import AvatarSvg from './avatar.svg';

const AvatarIcon = (props: SvgIconProps) => <SvgIcon {...props} component={AvatarSvg} inheritViewBox />;

export default AvatarIcon;
