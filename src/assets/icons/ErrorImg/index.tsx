import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

import errorImg from './ErrorImg.svg';

const ErrorImg = (props: SvgIconProps) => <SvgIcon {...props} component={errorImg} inheritViewBox />;

export default ErrorImg;
