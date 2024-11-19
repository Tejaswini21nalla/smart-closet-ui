import React from 'react';
import { AppBar, Toolbar, Typography, TextField, IconButton, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
// import logo from '../assets/logo.png'; 

function Header({ onAddClick }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        {/* Logo and Title */}
        {/* <img src={logo} alt="Logo" style={{ width: 40, marginRight: 10 }} /> */}
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          SMART CLOSET
        </Typography>

        {/* Search Bar */}
        <TextField
          variant="outlined"
          placeholder="Search"
          size="small"
          InputProps={{
            startAdornment: (
              <IconButton edge="start">
                <SearchIcon />
              </IconButton>
            ),
          }}
          style={{
            marginRight: isMobile ? '0' : '10px',
            width: isMobile ? '100%' : '60%',
          }}
        />

        {/* Add Item Button (Visible only on desktop) */}
        {!isMobile && (
          <Button variant="contained" startIcon={<AddIcon />} onClick={onAddClick}>
            Add Item
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
