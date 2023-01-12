import * as React from 'react';
import { styled } from '@mui/material';
import NextLink from 'next/link';

const Anchor = styled('a')({});

interface NextLinkComposedProps {
  to: string;
  linkAs?: string;
  href: string;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  prefetch?: boolean;
  locale?: string;
}

const NextLinkComposed = React.forwardRef(
  (
    { to, linkAs, href, replace, scroll, shallow, prefetch, locale, ...other }: NextLinkComposedProps,
    ref: React.ForwardedRef<HTMLAnchorElement>
  ) => (
    <NextLink
      href={to}
      prefetch={prefetch}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref
      locale={locale}
    >
      <Anchor ref={ref} {...other} />
    </NextLink>
  )
);

export default NextLinkComposed;
