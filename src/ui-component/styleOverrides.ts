import { borders, margins, paddings } from 'themes/themeConstants';

export const MuiListItemButton = (textColor: string, menuSelected: string, menuSelectedBack: string) => ({
  styleOverrides: {
    root: {
      color: textColor,
      paddingTop: paddings.top12,
      paddingBottom: paddings.bottom12,
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

export const MuiButton = (color: string) => ({
  styleOverrides: {
    root: {
      fontWeight: 400,
      borderRadius: '4px',
      borderColor: color
    }
  }
});

export const MuiTablePagination = {
  styleOverrides: {
    selectRoot: {
      '&': {
        pointerEvents: 'none'
      },
      '& > svg': {
        display: 'none'
      }
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
      padding: paddings.all24
    },
    title: {
      fontSize: '1.125rem'
    }
  }
});

export const MuiCardContent = {
  styleOverrides: {
    root: {
      padding: paddings.all24
    }
  }
};

export const MuiCardActions = {
  styleOverrides: {
    root: {
      padding: paddings.all24
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
        padding: paddings.all2
      }
    },
    input: {
      fontWeight: 400,
      background: outlinedFilled ? bgColor : 'transparent',
      padding: `${paddings.topBottom16} ${paddings.leftRight12}`,
      borderRadius: `${borderRadius}px`,
      '&.MuiInputBase-inputSizeSmall': {
        padding: `${paddings.topBottom12} ${paddings.leftRight16}`,
        '&.MuiInputBase-inputAdornedStart': {
          paddingLeft: paddings.left0
        }
      }
    },
    inputAdornedStart: {
      paddingLeft: paddings.left4
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
      marginTop: margins.top16,
      marginBottom: margins.bottom16
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
      borderBottom: `${borders.solid1px}`,
      borderColor
    }
  }
});

export const MuiDialog = {
  styleOverrides: {
    paper: {
      padding: `${paddings.top12} ${paddings.right0} ${paddings.bottom12} ${paddings.left0}`
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
        fontWeight: 400
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
export const MuiPickersToolbar = () => ({
  styleOverrides: {
    root: {
      '& > span': {
        display: 'block',
        width: '100%',
        textAlign: 'center',
        color: 'black'
      },
      '& > .MuiPickersToolbar-content button span': {
        fontSize: '16px'
      },
      '& > .MuiPickersToolbar-content span': {
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center'
      },
      '& > .MuiPickersToolbar-content .MuiDateTimePickerToolbar-dateContainer': {
        marginTop: margins.top8,
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        alignItems: 'center',
        gridColumnGap: '8px',
        '& button span': {
          color: 'black',
          fontWeight: 400
        },
        '& button:nth-child(2) span': {
          paddingTop: paddings.top2
        }
      }
    },
    '& > timeContainer > button > span': {
      fontSize: '10px'
    }
  }
});
export const MuiClockPicker = (lightColor: string, mainColor: string, secondary200: string, secondaryMain: string) => ({
  styleOverrides: {
    root: {
      '& > div > div': {
        backgroundColor: secondary200,
        marginBottom: margins.bottom32
      },
      '& .MuiButtonBase-root > span': {
        color: secondaryMain
      }
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
