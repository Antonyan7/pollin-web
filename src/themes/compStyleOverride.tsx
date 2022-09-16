import { Theme } from '@mui/material/styles';

import {
  MuiAlert,
  MuiAutocomplete,
  MuiAvatar,
  MuiButton,
  MuiCardActions,
  MuiCardContent,
  MuiCardHeader,
  MuiChip,
  MuiDialog,
  MuiDialogTitle,
  MuiDivider,
  MuiInputBase,
  MuiInternalDateTimePickerTabs,
  MuiListItemButton,
  MuiListItemIcon,
  MuiListItemText,
  MuiOutlinedInput,
  MuiPaper,
  MuiSelect,
  MuiSlider,
  MuiTableCell,
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
  const paperColor = theme.palette.background.paper;
  const textColorPrimaryDark = theme.palette.primary.dark;

  return {
    MuiButton,
    MuiPaper: MuiPaper(borderRadius),
    MuiCardHeader: MuiCardHeader(textColorDark),
    MuiCardContent,
    MuiCardActions,
    MuiAlert,
    MuiListItemButton: MuiListItemButton(textColor, menuSelected, menuSelectedBack),
    MuiListItemIcon: MuiListItemIcon(textColor),
    MuiListItemText: MuiListItemText(textColorDark),
    MuiInputBase: MuiInputBase(textColorDark, textColorSecondary),
    MuiOutlinedInput: MuiOutlinedInput(outlinedFilled, bgColor, borderRadius, theme.palette.grey[400], lightColor),
    MuiSlider: MuiSlider(lightColor, theme.palette.grey[300], paperColor),
    MuiAutocomplete: MuiAutocomplete(menuSelectedBack, textColorDark, theme.palette.secondary[200], borderRadius),
    MuiDivider: MuiDivider(theme.palette.divider),
    MuiSelect,
    MuiAvatar: MuiAvatar(textColorPrimaryDark, theme.palette.primary[200]),
    MuiChip,
    MuiTimelineContent: MuiTimelineContent(textColorDark),
    MuiTreeItem,
    MuiTimelineDot,
    MuiInternalDateTimePickerTabs: MuiInternalDateTimePickerTabs(
      lightColor,
      theme.palette.primary[200],
      theme.palette.grey[900],
      textColorPrimaryDark
    ),
    MuiTabs: MuiTabs(theme.palette.grey[200]),
    MuiDialog,
    MuiTableCell: MuiTableCell(theme.palette.grey[200], theme.palette.grey[600]),
    MuiTooltip: MuiTooltip(paperColor, textColor),
    MuiDialogTitle
  };
}
