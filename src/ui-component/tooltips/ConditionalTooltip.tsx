import React from 'react';
import { Tooltip, TooltipProps } from '@mui/material';

interface ConditionalTooltipProps extends TooltipProps {
  active?: boolean;
}

export const ConditionalTooltip = ({ active = true, children, ...props }: ConditionalTooltipProps) =>
  active ? <Tooltip {...props}>{children}</Tooltip> : children;
