import * as React from 'react';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '306px',
  height: '25px',
  padding: '8px 16px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '10px',
  borderRadius: '60px',
  border: '1px solid rgba(83, 83, 83, 0.15)',
  background: '#F8FAFF',
  position: 'relative',
  marginLeft: 0,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  justifyContent: 'center',
  margin: 'auto'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 0),
  height: '76%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#535353C9',
  width: '100%',
  height:"38px",
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const SearchBar = () => {
  return (
    <Search>
    <SearchIconWrapper>
      <SearchIcon style={{ color: '#535353C9' }}/>
    </SearchIconWrapper>
    <StyledInputBase
      placeholder="Search"
      inputProps={{ 'aria-label': 'search', }}
    />
  </Search>
  )
}

export default SearchBar
