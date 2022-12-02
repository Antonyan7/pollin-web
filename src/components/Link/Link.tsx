import * as React from 'react';
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { styled, SxProps } from '@mui/material/styles';
import { Theme } from '@mui/system';
import clsx from 'clsx';
import { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';

import NextLinkComposed from '../NextLinkComposed/NextLinkComposed';

const Anchor = styled('a')({});

interface LinkProps {
  activeClassName?: string;
  className?: string;
  noLinkStyle?: string;
  sx: SxProps<Theme>;
  target?: string;
  as?: string;
  href: NextLinkProps['href'];
}

// Refer to this example https://mui.com/material-ui/guides/composition/#with-typescript
const ComposedMuiLink = React.forwardRef(
  (
    props: MuiLinkProps<typeof NextLinkComposed, { component: typeof NextLinkComposed }>,
    ref?: React.Ref<HTMLAnchorElement>
  ) => <MuiLink {...props} ref={ref} />
);

const Link = React.forwardRef(
  (
    { activeClassName = 'active', as: linkAs, className: classNameProps = '', href, noLinkStyle, ...other }: LinkProps,
    ref: React.ForwardedRef<HTMLAnchorElement>
  ) => {
    const router = useRouter();
    const pathname = typeof href === 'string' ? href : href.pathname;
    const className = clsx(classNameProps, {
      [activeClassName]: router.pathname === pathname && activeClassName
    });

    const isExternal = typeof href === 'string' && (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0);

    if (isExternal) {
      if (noLinkStyle) {
        return <Anchor className={className} href={href} ref={ref} {...other} />;
      }
    }

    return (
      <ComposedMuiLink
        component={NextLinkComposed}
        linkAs={linkAs}
        className={className}
        ref={ref}
        to={href as string}
        {...other}
      />
    );
  }
);

export default Link;
