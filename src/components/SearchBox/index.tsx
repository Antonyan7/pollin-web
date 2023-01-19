import React, { KeyboardEvent, useCallback, useState } from 'react';
import { Close, HighlightOffOutlined } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Chip,
  chipClasses,
  IconButton,
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps,
  styled,
  useTheme
} from '@mui/material';
import { borderRadius, margins, paddings } from 'themes/themeConstants';

const StyledOutlinedInput = styled(OutlinedInput)<OutlinedInputProps>(({ theme }) => ({
  '.MuiInputAdornment-root': {
    height: '100%',
    maxHeight: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, max-content)'
  },
  width: '100%',
  '.chips-container': {
    height: '100%',
    maxWidth: 500,
    overflowX: 'overlay',
    display: 'flex',
    alignItems: 'center',
    cursor: 'default',
    '::-webkit-scrollbar': {
      height: 5
    },
    '::-webkit-scrollbar-thumb': {
      background: theme.palette.grey[500]
    },

    '::-webkit-scrollbar-thumb:hover': {
      background: theme.palette.grey[700]
    }
  }
}));

interface SearchBoxProps {
  onSearch: (values: string[]) => void;
  placeholder: string;
  invalidSearchedItems?: string[];
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, placeholder, invalidSearchedItems }) => {
  const theme = useTheme();
  const [currentSearchboxValues, setCurrentSearchboxValues] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const pushValue = (value: string) => {
    if (currentSearchboxValues.indexOf(value) === -1 && !!value) {
      setCurrentSearchboxValues([...currentSearchboxValues, value]);
      setSearchValue('');
    } else {
      setSearchValue('');
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const lastCharacter = value[value.length - 1];

    if (lastCharacter === ',' || lastCharacter === ' ') {
      const newValue = value.slice(0, -1).trim();

      pushValue(newValue);
    } else {
      setSearchValue(value);
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchValue) {
      onSearch([...currentSearchboxValues, searchValue]);
    } else {
      onSearch(currentSearchboxValues);
    }

    pushValue(searchValue);
  };

  const clearClickHandler = useCallback(() => {
    setSearchValue('');
    setCurrentSearchboxValues([]);
    onSearch([]);
  }, [onSearch]);

  const keyDownHandler = (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.key === 'Backspace') {
      if (!searchValue && currentSearchboxValues.length) {
        setCurrentSearchboxValues(currentSearchboxValues.slice(0, -1));
      }
    }
  };

  const searchboxValueDeleteHandler = (value: string) => {
    const newSearchBoxValues = currentSearchboxValues.filter((x) => x !== value);

    setCurrentSearchboxValues(newSearchBoxValues);
    onSearch(newSearchBoxValues);
  };

  return (
    <form onSubmit={submitHandler}>
      <StyledOutlinedInput
        id="input-search-patients"
        value={searchValue}
        placeholder={currentSearchboxValues.length === 0 ? placeholder : ''}
        onChange={changeHandler}
        onKeyDown={keyDownHandler}
        autoComplete="off"
        fullWidth
        startAdornment={
          <InputAdornment position="start">
            <IconButton type="submit">
              <SearchIcon
                sx={{
                  fill: theme.palette.primary.main,
                  fontSize: theme.typography.pxToRem(18)
                }}
              />
            </IconButton>
            <Box className="chips-container">
              {currentSearchboxValues.map((value) => {
                const isSearchedItemInvalid = invalidSearchedItems?.includes(value);

                return (
                  <Chip
                    color="primary"
                    variant="outlined"
                    sx={{
                      ml: margins.left8,
                      background: theme.palette.primary[100],
                      borderRadius: borderRadius.radius7,
                      border: isSearchedItemInvalid ? `1px solid ${theme.palette.error.main}` : 'none',
                      color: theme.palette.primary.dark,
                      fontWeight: 600,
                      py: paddings.topBottom2,
                      fontSize: theme.typography.pxToRem(14),
                      lineHeight: '140%',
                      maxHeight: theme.typography.pxToRem(24),
                      [`.${chipClasses.label}`]: {
                        pl: paddings.left8,
                        pr: 0
                      },
                      [`.${chipClasses.deleteIcon}`]: {
                        ml: theme.typography.pxToRem(9.33),
                        fontSize: theme.typography.pxToRem(16),
                        fill: theme.palette.primary.main
                      }
                    }}
                    deleteIcon={<HighlightOffOutlined />}
                    key={value}
                    label={value}
                    onDelete={() => searchboxValueDeleteHandler(value)}
                  />
                );
              })}
            </Box>
          </InputAdornment>
        }
        endAdornment={
          (currentSearchboxValues?.length > 0 || !!searchValue) && (
            <IconButton onClick={clearClickHandler}>
              <Close color="primary" />
            </IconButton>
          )
        }
      />
    </form>
  );
};

export default SearchBox;
