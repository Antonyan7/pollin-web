import React, { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Close } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, OutlinedInput, outlinedInputClasses, Portal, useTheme } from '@mui/material';
import { CypressIds } from 'constants/cypressIds';
import { useRouter } from 'next/router';

import { SearchBoxItems } from './SearchBoxItems';
import { SearchBoxProps } from './types';

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, placeholder, invalidSearchedItems }) => {
  const theme = useTheme();
  const router = useRouter();
  const [currentSearchboxValues, setCurrentSearchboxValues] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const container = useRef();
  const addSearchedValue = (value: string) => {
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

      addSearchedValue(newValue);
    } else {
      setSearchValue(value);
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchValue) {
      onSearch([...currentSearchboxValues, searchValue.trim()]);
    } else {
      onSearch(currentSearchboxValues);
    }

    addSearchedValue(searchValue.trim());
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

  useEffect(() => {
    let { selectedSpecimens } = router.query;

    if (selectedSpecimens?.length) {
      selectedSpecimens = !Array.isArray(selectedSpecimens) ? [selectedSpecimens] : selectedSpecimens;
      setCurrentSearchboxValues(selectedSpecimens as string[]);
    }

    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={submitHandler}>
      <OutlinedInput
        value={searchValue}
        placeholder={currentSearchboxValues.length === 0 ? placeholder : ''}
        onChange={changeHandler}
        onKeyDown={keyDownHandler}
        autoComplete="off"
        fullWidth
        data-cy={CypressIds.PAGE_SPECIMEN_TRACKING_ALL_TEST_LIST_SEARCH}
        ref={container}
        sx={{
          display: 'flex',
          [`.${outlinedInputClasses.input}`]: {
            order: 3,
            width: 'auto',
            minWidth: '20%'
          },
          button: {
            ml: 'auto',
            order: 4
          }
        }}
        startAdornment={
          <InputAdornment
            position="start"
            sx={{
              order: 1
            }}
          >
            <IconButton type="submit">
              <SearchIcon
                sx={{
                  fill: theme.palette.primary.main,
                  fontSize: theme.typography.pxToRem(18)
                }}
              />
            </IconButton>
          </InputAdornment>
        }
        endAdornment={
          (currentSearchboxValues?.length > 0 || !!searchValue) && (
            <IconButton
              onClick={clearClickHandler}
              sx={{
                order: 4
              }}
            >
              <Close color="primary" />
            </IconButton>
          )
        }
      />
      <Portal container={container.current}>
        <SearchBoxItems
          searchboxValueDeleteHandler={searchboxValueDeleteHandler}
          currentSearchboxValues={currentSearchboxValues}
          invalidSearchedItems={invalidSearchedItems}
        />
      </Portal>
    </form>
  );
};

export default SearchBox;
