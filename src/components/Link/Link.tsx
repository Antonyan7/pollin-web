import * as React from 'react';
import MuiLink from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import NextLinkComposed from '../NextLinkComposed/NextLinkComposed';

const Anchor = styled('a')({});

interface LinkProps {
  activeClassName: string;
  as: string;
  className: string;
  href: any;
  noLinkStyle: string;
  role: string;
  other: any;
}

const Link = React.forwardRef(
  (
    {
      activeClassName = 'active',
      as: linkAs,
      className: classNameProps,
      href,
      noLinkStyle,
      role,
      ...other
    }: LinkProps | any,
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
      <MuiLink component={NextLinkComposed} linkAs={linkAs} className={className} ref={ref} to={href} {...other} />
    );
  }
);

export default Link;
