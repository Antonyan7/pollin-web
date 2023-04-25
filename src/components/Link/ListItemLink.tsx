import React, { ForwardedRef, forwardRef, PropsWithChildren } from 'react';
import { Link as MuiLink,useTheme } from '@mui/material';
import Link from 'next/link';
import { LinkTarget, NavItemType } from 'types';

interface ListItemLinkProps {
  item: NavItemType;
  itemTarget: LinkTarget['target'];
}

const ListItemLink = forwardRef(
  ({ item, itemTarget, ...props }: PropsWithChildren<ListItemLinkProps>, ref: ForwardedRef<HTMLAnchorElement>) => {
    const theme = useTheme();

    return (
      <MuiLink
        underline="none"
        component={Link}
        href={`${item.url}`}
        {...props}
        sx={{ ...theme.typography.subMenuCaption, textDecoration: 'none' }}
        ref={ref}
        target={itemTarget}
      />
    );
  }
);

export default ListItemLink;
