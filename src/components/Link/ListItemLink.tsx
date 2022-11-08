import React, { ForwardedRef, forwardRef, PropsWithChildren } from 'react';
import { useTheme } from '@mui/material';
import { LinkTarget, NavItemType } from 'types';

import Link from './Link';

interface ListItemLinkProps {
  item: NavItemType;
  itemTarget: LinkTarget['target'];
}

const ListItemLink = forwardRef(
  ({ item, itemTarget, ...props }: PropsWithChildren<ListItemLinkProps>, ref: ForwardedRef<HTMLAnchorElement>) => {
    const theme = useTheme();

    return (
      <Link
        {...props}
        sx={{ ...theme.typography.subMenuCaption, textDecoration: 'none' }}
        ref={ref}
        href={`${item.url}`}
        target={itemTarget}
      />
    );
  }
);

export default ListItemLink;
