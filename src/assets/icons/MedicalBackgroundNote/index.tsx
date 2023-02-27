import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

import medIcon from './MedNoteIcon.svg';

const MedicalBackgroundNoteIcon = (props: SvgIconProps) => <SvgIcon {...props} component={medIcon} inheritViewBox />;

export default MedicalBackgroundNoteIcon;
