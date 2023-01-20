import * as React from 'react';
import { Link as MuiLink, styled } from '@mui/material';
import { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { SxProps } from '@mui/material/styles';
import { Theme } from '@mui/system';
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
    const isActiveLink = router.pathname === pathname && activeClassName && router.pathname !== '/';
    const additionalClasses = isActiveLink ? activeClassName : '';
    const allActualClasses = classNameProps.concat(additionalClasses);

    const isExternal = typeof href === 'string' && (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0);

    if (isExternal) {
      if (noLinkStyle) {
        return <Anchor className={allActualClasses} href={href} ref={ref} {...other} />;
      }
    }

    return (
      <ComposedMuiLink
        component={NextLinkComposed}
        linkAs={linkAs}
        className={allActualClasses}
        ref={ref}
        to={href as string}
        {...other}
      />
    );
  }
);

export default Link;
