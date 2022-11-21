import React, { KeyboardEvent, useCallback, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Chip, IconButton, InputAdornment, OutlinedInput, useTheme } from '@mui/material';

interface SearchBoxProps {
  onSearch: (values: string[]) => void;
  placeholder?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, placeholder }) => {
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
      <OutlinedInput
        id="input-search-patients"
        value={searchValue}
        placeholder={placeholder}
        onChange={changeHandler}
        onKeyDown={keyDownHandler}
        fullWidth
        startAdornment={
          <InputAdornment position="start">
            <IconButton type="submit">
              <SearchIcon color="primary" />
            </IconButton>
            {currentSearchboxValues.map((value) => (
              <Chip
                color="primary"
                variant="outlined"
                sx={{ ml: theme.spacing(1) }}
                key={value}
                label={value}
                onDelete={() => searchboxValueDeleteHandler(value)}
              />
            ))}
          </InputAdornment>
        }
        endAdornment={
          (currentSearchboxValues?.length > 0 || !!searchValue) && (
            <IconButton onClick={clearClickHandler}>
              <CloseIcon color="primary" />
            </IconButton>
          )
        }
      />
    </form>
  );
};

export default SearchBox;
