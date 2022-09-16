export const MuiListItemButton = (textColor: string, menuSelected: string, menuSelectedBack: string) => ({
  styleOverrides: {
    root: {
      color: textColor,
      paddingTop: '10px',
      paddingBottom: '10px',
      '&.Mui-selected': {
        color: menuSelected,
        backgroundColor: menuSelectedBack,
        '&:hover': {
          backgroundColor: menuSelectedBack
        },
        '& .MuiListItemIcon-root': {
          color: menuSelected
        }
      },
      '&:hover': {
        backgroundColor: menuSelectedBack,
        color: menuSelected,
        '& .MuiListItemIcon-root': {
          color: menuSelected
        }
      }
    }
  }
});

export const MuiButton = {
  styleOverrides: {
    root: {
      fontWeight: 500,
      borderRadius: '4px'
    }
  }
};

export const MuiPaper = (borderRadius: number) => ({
  defaultProps: {
    elevation: 0
  },
  styleOverrides: {
    root: {
      backgroundImage: 'none'
    },
    rounded: {
      borderRadius: `${borderRadius}px`
    }
  }
});

export const MuiCardHeader = (textColor: string) => ({
  styleOverrides: {
    root: {
      color: textColor,
      padding: '24px'
    },
    title: {
      fontSize: '1.125rem'
    }
  }
});

export const MuiCardContent = {
  styleOverrides: {
    root: {
      padding: '24px'
    }
  }
};

export const MuiCardActions = {
  styleOverrides: {
    root: {
      padding: '24px'
    }
  }
};

export const MuiAlert = {
  styleOverrides: {
    root: {
      alignItems: 'center'
    },
    outlined: {
      border: '1px dashed'
    }
  }
};

export const MuiListItemIcon = (textColor: string) => ({
  styleOverrides: {
    root: {
      color: textColor,
      minWidth: '36px'
    }
  }
});

export const MuiListItemText = (textColor: string) => ({
  styleOverrides: {
    primary: {
      color: textColor
    }
  }
});

export const MuiInputBase = (textColor: string, textColorSecondary: string) => ({
  styleOverrides: {
    input: {
      color: textColor,
      '&::placeholder': {
        color: textColorSecondary,
        fontSize: '0.875rem'
      }
    }
  }
});

export const MuiOutlinedInput = (
  outlinedFilled: boolean,
  bgColor: string,
  borderRadius: number,
  borderColor: string,
  color: string
) => ({
  styleOverrides: {
    root: {
      background: outlinedFilled ? bgColor : 'transparent',
      borderRadius: `${borderRadius}px`,
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor
      },
      '&:hover $notchedOutline': {
        borderColor: color
      },
      '&.MuiInputBase-multiline': {
        padding: 1
      }
    },
    input: {
      fontWeight: 500,
      background: outlinedFilled ? bgColor : 'transparent',
      padding: '15.5px 14px',
      borderRadius: `${borderRadius}px`,
      '&.MuiInputBase-inputSizeSmall': {
        padding: '10px 14px',
        '&.MuiInputBase-inputAdornedStart': {
          paddingLeft: 0
        }
      }
    },
    inputAdornedStart: {
      paddingLeft: 4
    },
    notchedOutline: {
      borderRadius: `${borderRadius}px`
    }
  }
});

export const MuiSlider = (textColor: string, disabledColor: string, bgColor: string) => ({
  styleOverrides: {
    root: {
      '&.Mui-disabled': {
        color: disabledColor
      }
    },
    mark: {
      backgroundColor: bgColor,
      width: '4px'
    },
    valueLabel: {
      color: textColor
    }
  }
});

export const MuiAutocomplete = (
  secondaryColor: string,
  darkColor: string,
  iconColor: string,
  borderRadius: number
) => ({
  styleOverrides: {
    root: {
      '& .MuiAutocomplete-tag': {
        background: secondaryColor,
        borderRadius: 4,
        color: darkColor,
        '.MuiChip-deleteIcon': {
          color: iconColor
        }
      }
    },
    popper: {
      borderRadius: `${borderRadius}px`,
      boxShadow:
        '0px 8px 10px -5px rgb(0 0 0 / 20%), 0px 16px 24px 2px rgb(0 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 12%)'
    }
  }
});

export const MuiDivider = (dividerColor: string) => ({
  styleOverrides: {
    root: {
      borderColor: dividerColor,
      opacity: 1
    }
  }
});

export const MuiSelect = {
  styleOverrides: {
    select: {
      '&:focus': {
        backgroundColor: 'transparent'
      }
    }
  }
};

export const MuiAvatar = (textColor: string, bgColor: string) => ({
  styleOverrides: {
    root: {
      color: textColor,
      background: bgColor
    }
  }
});

export const MuiChip = {
  styleOverrides: {
    root: {
      '&.MuiChip-deletable .MuiChip-deleteIcon': {
        color: 'inherit'
      }
    }
  }
};

export const MuiTimelineContent = (textColor: string) => ({
  styleOverrides: {
    root: {
      color: textColor,
      fontSize: '16px'
    }
  }
});

export const MuiTreeItem = {
  styleOverrides: {
    label: {
      marginTop: 14,
      marginBottom: 14
    }
  }
};

export const MuiTimelineDot = {
  styleOverrides: {
    root: {
      boxShadow: 'none'
    }
  }
};

export const MuiInternalDateTimePickerTabs = (
  tabColor: string,
  borderColor: string,
  tabTextColor: string,
  textColorDark: string
) => ({
  styleOverrides: {
    tabs: {
      backgroundColor: tabColor,
      '& .MuiTabs-flexContainer': {
        borderColor
      },
      '& .MuiTab-root': {
        color: tabTextColor
      },
      '& .MuiTabs-indicator': {
        backgroundColor: textColorDark
      },
      '& .Mui-selected': {
        color: textColorDark
      }
    }
  }
});

export const MuiTabs = (borderColor: string) => ({
  styleOverrides: {
    flexContainer: {
      borderBottom: '1px solid',
      borderColor
    }
  }
});

export const MuiDialog = {
  styleOverrides: {
    paper: {
      padding: '12px 0 12px 0'
    }
  }
};

export const MuiTableCell = (borderColor: string, textColor: string) => ({
  styleOverrides: {
    root: {
      borderColor,
      '&.MuiTableCell-head': {
        fontSize: '0.875rem',
        color: textColor,
        fontWeight: 500
      }
    }
  }
});

export const MuiTooltip = (color: string, background: string) => ({
  styleOverrides: {
    tooltip: {
      color,
      background
    }
  }
});

export const MuiDialogTitle = {
  styleOverrides: {
    root: {
      fontSize: '1.25rem'
    }
  }
};
