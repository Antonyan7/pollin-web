import { Theme } from '@mui/material';

import {
  MuiAlert,
  MuiAutocomplete,
  MuiAvatar,
  MuiButton,
  MuiCardActions,
  MuiCardContent,
  MuiCardHeader,
  MuiChip,
  MuiClockPicker,
  MuiDialogTitle,
  MuiDivider,
  MuiInputBase,
  MuiInternalDateTimePickerTabs,
  MuiListItemButton,
  MuiListItemIcon,
  MuiListItemText,
  MuiModal,
  MuiOutlinedInput,
  MuiPaper,
  MuiPickersToolbar,
  MuiSelect,
  MuiSlider,
  MuiTableCell,
  MuiTablePagination,
  MuiTabs,
  MuiTimelineContent,
  MuiTimelineDot,
  MuiTooltip,
  MuiTreeItem
} from '@ui-component/styleOverrides';

export default function componentStyleOverrides(theme: Theme, borderRadius: number, outlinedFilled: boolean) {
  const bgColor = theme.palette.grey[50];
  const menuSelectedBack = theme.palette.secondary.light;
  const menuSelected = theme.palette.secondary.dark;
  const textColor = theme.palette.text.primary;
  const textColorDark = theme.palette.text.dark;
  const textColorSecondary = theme.palette.text.secondary;
  const lightColor = theme.palette.primary.light;
  const secondary200 = theme.palette.secondary[200];
  const paperColor = theme.palette.background.paper;
  const textColorPrimaryDark = theme.palette.primary.dark;
  const buttonBorderColor = theme.palette.primary.main;
  const secondaryMain = theme.palette.secondary.main;
  const primary100 = theme.palette.primary[100];

  return {
    MuiButton: MuiButton(buttonBorderColor),
    MuiPaper: MuiPaper(borderRadius),
    MuiCardHeader: MuiCardHeader(textColorDark),
    MuiCardContent,
    MuiCardActions,
    MuiAlert,
    MuiListItemButton: MuiListItemButton(textColor, menuSelected, menuSelectedBack),
    MuiListItemIcon: MuiListItemIcon(textColor),
    MuiListItemText: MuiListItemText(textColorDark),
    MuiInputBase: MuiInputBase(textColorDark, textColorSecondary),
    MuiOutlinedInput: MuiOutlinedInput(outlinedFilled, bgColor, 12, lightColor, lightColor),
    MuiSlider: MuiSlider(lightColor, theme.palette.grey[300], paperColor),
    MuiAutocomplete: MuiAutocomplete(primary100, textColorPrimaryDark, theme.palette.secondary[200], borderRadius),
    MuiDivider: MuiDivider(theme.palette.divider),
    MuiSelect,
    MuiAvatar: MuiAvatar(textColorPrimaryDark, theme.palette.primary[200]),
    MuiChip,
    MuiTimelineContent: MuiTimelineContent(textColorDark),
    MuiTreeItem,
    MuiModal,
    MuiTimelineDot,
    MuiInternalDateTimePickerTabs: MuiInternalDateTimePickerTabs(
      lightColor,
      theme.palette.primary[200],
      theme.palette.grey[900],
      textColorPrimaryDark
    ),
    MuiDialogTitle,
    MuiTabs: MuiTabs(theme.palette.grey[200]),
    MuiTableCell: MuiTableCell(theme.palette.grey[200], theme.palette.grey[900]),
    MuiTooltip: MuiTooltip(paperColor, textColor),
    MuiClockPicker: MuiClockPicker(theme.palette.primary[200], theme.palette.primary[800], secondary200, secondaryMain),
    MuiPickersToolbar: MuiPickersToolbar(),
    MuiTablePagination
  };
}
