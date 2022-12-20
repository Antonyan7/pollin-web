import React, { useState } from 'react';
import { Checkbox, Collapse, FormControlLabel, FormGroup, Stack } from '@mui/material';
import { margins, paddings } from 'themes/themeConstants';
import { IGroupItem, IOrderGroup } from 'types/reduxTypes/resultsStateTypes';

import CollapseMenuArrowDownIcon from '@ui-component/orders/CollapseMenuArrowDownIcon';
import TestTypeChip from '@ui-component/orders/TestTypeChip';

import CheckedCircleIcon from './CheckCircleIcon';

interface ICollapseProps {
  id: string;
  isOpen: boolean;
}

interface IGroupItemsProps {
  isEvenItemsShouldBeDisplayed: boolean;
  orderGroup: IOrderGroup;
}

const GroupItems = (props: IGroupItemsProps) => {
  const { orderGroup, isEvenItemsShouldBeDisplayed } = props;
  const [collapsesList, setCollapsesList] = useState<ICollapseProps[]>([]);

  const onCollapseClick = (event: React.MouseEvent<HTMLLabelElement>, collapseId: string) => {
    event.preventDefault();

    const collapse = collapsesList.find((collapseItem: ICollapseProps) => collapseItem.id === collapseId);

    if (collapse) {
      const updatedCollapsedList = collapsesList.map((collapseItem: ICollapseProps) => ({
        ...collapseItem,
        isOpen: collapseItem.id === collapseId ? !collapseItem.isOpen : collapseItem.isOpen
      }));

      setCollapsesList(updatedCollapsedList);
    } else {
      setCollapsesList([...collapsesList, { id: collapseId, isOpen: true }]);
    }
  };

  const isCollapseOpen = (collapseId: string) => collapsesList?.find((item) => item.id === collapseId)?.isOpen ?? true;

  return (
    <Stack direction="column" justifyContent="flex-start" px={paddings.all12}>
      {orderGroup.groupItems.map(
        (groupItem: IGroupItem, index: number) =>
          (isEvenItemsShouldBeDisplayed ? (index as number) % 2 === 0 : (index as number) % 2 !== 0) &&
          (groupItem?.groupItems?.length === 0 ? (
            <FormGroup>
              <FormControlLabel control={<Checkbox checked={false} />} label={groupItem.title} />
            </FormGroup>
          ) : (
            <>
              <Stack>
                <FormGroup sx={{ position: 'relative' }}>
                  <FormControlLabel
                    label={groupItem.title}
                    onClick={(event) => onCollapseClick(event, groupItem.id)}
                    control={
                      <>
                        <Checkbox checked indeterminate={false} />
                        <TestTypeChip type={groupItem.type} />
                        <CollapseMenuArrowDownIcon isOpen={isCollapseOpen(groupItem.id)} />
                      </>
                    }
                  />
                </FormGroup>
              </Stack>
              <Collapse in={isCollapseOpen(groupItem.id)} timeout="auto" unmountOnExit>
                {groupItem?.groupItems?.map((secondaryGroupItems: IGroupItem) =>
                  secondaryGroupItems?.groupItems?.length === 0 ? (
                    <Stack ml={3}>
                      <FormControlLabel label={secondaryGroupItems.title} control={<Checkbox checked />} />
                    </Stack>
                  ) : (
                    <>
                      <Stack>
                        <FormGroup sx={{ position: 'relative', ml: 3 }}>
                          <FormControlLabel
                            label={secondaryGroupItems.title}
                            onClick={(event) => onCollapseClick(event, secondaryGroupItems.id)}
                            control={
                              <>
                                <Checkbox checked indeterminate={false} />
                                <TestTypeChip type={secondaryGroupItems.type} />
                                <CollapseMenuArrowDownIcon isOpen={isCollapseOpen(secondaryGroupItems.id)} />
                              </>
                            }
                          />
                        </FormGroup>
                      </Stack>
                      <Collapse in={isCollapseOpen(secondaryGroupItems.id)} timeout="auto" unmountOnExit>
                        {secondaryGroupItems.groupItems?.map((panelGroupItems: IGroupItem) => (
                          <Stack ml={6}>
                            <FormControlLabel
                              label={panelGroupItems.title}
                              sx={{ margin: `${margins.all8} ${margins.all0}` }}
                              disabled
                              control={<Checkbox checked checkedIcon={<CheckedCircleIcon />} />}
                            />
                          </Stack>
                        ))}
                      </Collapse>
                    </>
                  )
                )}
              </Collapse>
            </>
          ))
      )}
    </Stack>
  );
};

export default GroupItems;
