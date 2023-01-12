import React, { ReactNode, Ref } from 'react';
import { Card, CardContent, CardHeader, Divider, Theme, Typography, TypographyTypeMap } from '@mui/material';
import { OverrideProps } from '@mui/material/OverridableComponent';
import { useTheme } from '@mui/material/styles';
import { SxProps, TypographyProps } from '@mui/system';
import { borders } from 'themes/themeConstants';

interface SubCardProps {
  titleProps?: OverrideProps<TypographyTypeMap<TypographyProps, 'span'>, 'span'>;
  children: ReactNode | string | null;
  content?: boolean;
  className?: string;
  contentClass?: string;
  darkTitle?: boolean;
  secondary?: ReactNode | string;
  sx?: SxProps<Theme>;
  contentSX?: SxProps<Theme>;
  title?: ReactNode | string;
}

// ==============================|| CUSTOM SUB CARD ||============================== //

const SubCardStyled = React.forwardRef(
  (
    {
      children,
      className,
      content,
      contentClass,
      darkTitle,
      secondary,
      sx = {},
      contentSX = {},
      titleProps = {},
      title,
      ...others
    }: SubCardProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const theme = useTheme();

    return (
      <Card
        ref={ref}
        sx={{
          border: `${borders.solid1px}`,
          borderColor: theme.palette.grey[300],
          ':hover': {
            boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)'
          },
          ...sx
        }}
        {...others}
      >
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader
            sx={{ p: 2.5 }}
            title={
              <Typography
                fontSize="21px"
                fontWeight="400"
                {...titleProps}
                {...(typeof title !== 'string' && { component: 'div' })}
              >
                {title}
              </Typography>
            }
            action={secondary}
          />
        )}
        {darkTitle && title && (
          <CardHeader
            sx={{ p: 2.5 }}
            title={
              <Typography
                fontSize="21px"
                fontWeight="400"
                {...titleProps}
                {...(typeof title !== 'string' && { component: 'div' })}
              >
                {title}
              </Typography>
            }
            action={secondary}
          />
        )}

        {/* content & header divider */}
        {title && (
          <Divider
            sx={{
              opacity: 1,
              borderColor: theme.palette.grey[300]
            }}
          />
        )}

        {/* card content */}
        {content && (
          <CardContent sx={{ p: 2.5, ...contentSX }} className={contentClass ?? ''}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

export default SubCardStyled;
