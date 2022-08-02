import * as React from 'react';
import { styled } from '@mui/material/styles';
import NextLink from 'next/link';

const Anchor = styled('a')({});

const NextLinkComposed = React.forwardRef<HTMLAnchorElement, any>(
  ({ to, linkAs, href, replace, scroll, shallow, prefetch, locale, ...other }, ref) => (
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
