import React, { Ref } from 'react';
import {
  Card,
  CardContent,
  CardContentProps,
  CardHeader,
  CardHeaderProps,
  CardProps,
  Divider,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { borders } from 'themes/themeConstants';

const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 }
};

export interface MainCardProps {
  border?: boolean;
  boxShadow?: boolean;
  children: React.ReactNode | string;
  style?: React.CSSProperties;
  content?: boolean;
  className?: string;
  contentClass?: string;
  contentSX?: CardContentProps['sx'];
  darkTitle?: boolean;
  sx?: CardProps['sx'];
  secondary?: CardHeaderProps['action'];
  shadow?: string;
  elevation?: number;
  title?: React.ReactNode | string;
}

const MainCard = React.forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      ...others
    }: MainCardProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const theme = useTheme();
    // TODO: move to styled component
    const styles = {
      top: '50%',
      left: '50%',
      transform: `translate(50%, 50%)`,
      position: 'absolute',
      width: { xs: 280, lg: 600 },
      border: border ? `${borders.solid1px}` : 'none',
      borderColor: theme.palette.primary[200] + 75,
      ':hover': {
        boxShadow: boxShadow ? shadow ?? '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
      }
    };

    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          ...styles,
          ...sx
        }}
      >
        {/* card header and action */}
        {!darkTitle && title && <CardHeader sx={headerSX} title={title} action={secondary} />}
        {darkTitle && title && (
          <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />
        )}

        {/* content & header divider */}
        {title && <Divider />}

        {/* card content */}
        {content && (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

export default MainCard;
