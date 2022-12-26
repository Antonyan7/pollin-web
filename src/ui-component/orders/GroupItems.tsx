import React, { useState } from 'react';
import { Checkbox, Collapse, FormControlLabel, Stack } from '@mui/material';
import { margins, paddings } from 'themes/themeConstants';
import { IOrderGroup, IOrderGroupItem } from 'types/reduxTypes/resultsStateTypes';

import PollinBloodTestGroupCheckbox from '@ui-component/orders/checkboxes/PollinBloodTestGroupCheckbox';
import SingleItemCheckbox from '@ui-component/orders/checkboxes/SingleItemCheckbox';
import TestGroupSingleItemCheckbox from '@ui-component/orders/checkboxes/TestGroupSingleItemCheckbox';
import TestPanelGroupCheckbox from '@ui-component/orders/checkboxes/TestPanelGroupCheckbox';

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

  const onCollapseClick = (event: React.MouseEvent<HTMLDivElement>, collapseId: string) => {
    event.preventDefault();
    event.stopPropagation();

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
        (groupItem: IOrderGroupItem, index: number) =>
          (isEvenItemsShouldBeDisplayed ? index % 2 === 0 : index % 2 !== 0) &&
          (groupItem?.groupItems?.length === 0 ? (
            <SingleItemCheckbox orderGroup={orderGroup} defaultGroupItem={groupItem} key={groupItem.id} />
          ) : (
            <>
              <Stack>
                <PollinBloodTestGroupCheckbox
                  orderGroup={orderGroup}
                  defaultGroupItem={groupItem}
                  key={groupItem.id}
                  onCollapseClick={onCollapseClick}
                  isCollapseOpen={isCollapseOpen}
                />
              </Stack>
              <Collapse in={isCollapseOpen(groupItem.id)} timeout="auto" unmountOnExit>
                {groupItem?.groupItems?.map((secondaryGroupItem: IOrderGroupItem) =>
                  secondaryGroupItem?.groupItems?.length === 0 ? (
                    <Stack ml={3}>
                      <TestGroupSingleItemCheckbox
                        orderGroup={orderGroup}
                        secondaryGroupItem={secondaryGroupItem}
                        parentGroupId={groupItem.id}
                      />
                    </Stack>
                  ) : (
                    <>
                      <Stack>
                        <TestPanelGroupCheckbox
                          orderGroup={orderGroup}
                          parentGroupId={groupItem.id}
                          secondaryGroupItem={secondaryGroupItem}
                          onCollapseClick={onCollapseClick}
                          isCollapseOpen={isCollapseOpen}
                        />
                      </Stack>
                      <Collapse in={isCollapseOpen(secondaryGroupItem.id)} timeout="auto" unmountOnExit>
                        {secondaryGroupItem.groupItems?.map((panelGroupItems: IOrderGroupItem) => (
                          <Stack ml={6}>
                            <FormControlLabel
                              label={panelGroupItems.title}
                              sx={{ margin: `${margins.all8} ${margins.all0}` }}
                              disabled
                              control={
                                <Checkbox
                                  checked={secondaryGroupItem.selected}
                                  checkedIcon={<CheckedCircleIcon />}
                                  icon={<CheckedCircleIcon />}
                                />
                              }
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
