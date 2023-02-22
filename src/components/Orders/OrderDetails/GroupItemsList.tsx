import React, { useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItem, ListItemButton, ListItemText, useTheme } from '@mui/material';
import { IOrderGroupItem } from 'types/reduxTypes/ordersStateTypes';

interface Props {
  groupItems?: IOrderGroupItem[];
  paddingFactor?: number;
}

const GroupItemsList = ({ groupItems, paddingFactor = 0 }: Props) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({});

  if (!Array.isArray(groupItems) || groupItems.length === 0) {
    return null;
  }

  return (
    <List disablePadding dense sx={{ pl: paddingFactor * 4 }}>
      {groupItems.map((item) =>
        Array.isArray(item.groupItems) && item.groupItems.length > 0 ? (
          <React.Fragment key={item.id}>
            <ListItemButton
              onClick={() => setIsOpen((prevIsOpen) => ({ ...prevIsOpen, [item.id]: !prevIsOpen[item.id] }))}
              disableRipple
              sx={{
                p: 0,
                userSelect: 'auto',
                '&:hover': {
                  background: theme.palette.secondary.light
                }
              }}
            >
              <ListItemText primary={`${item.title}${item.label ? ` - ${item.label}` : ''}`} />
              {isOpen[item.id] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isOpen[item.id]} timeout="auto" unmountOnExit>
              <GroupItemsList groupItems={item.groupItems} paddingFactor={1} />
            </Collapse>
          </React.Fragment>
        ) : (
          <ListItem
            key={item.id}
            disablePadding
            sx={{
              '&:hover': {
                background: theme.palette.secondary.light
              }
            }}
          >
            <ListItemText primary={item.title} />
          </ListItem>
        )
      )}
    </List>
  );
};

export default GroupItemsList;
