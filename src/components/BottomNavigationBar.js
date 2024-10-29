import React from 'react';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link, useLocation } from 'react-router-dom';

function BottomNavigationBar() {
  const location = useLocation();
  const currentTab = location.pathname;

  return (
    <Box 
      sx={{ 
        width: '100%', 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        zIndex: 1000, // Ensure it appears above other content
        boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.1)' // Optional shadow for separation
      }}
    >
      <BottomNavigation value={currentTab}>
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon sx={{ fontSize: 32 }} />}
          component={Link}
          to="/"
          value="/"
        />
        <BottomNavigationAction
          label="Closet"
          icon={<CheckroomIcon sx={{ fontSize: 32 }} />}
          component={Link}
          to="/closet"
          value="/closet"
        />
        <BottomNavigationAction
          label="More"
          icon={<MoreHorizIcon sx={{ fontSize: 32 }} />}
          component={Link}
          to="/more"
          value="/more"
        />
      </BottomNavigation>
    </Box>
  );
}

export default BottomNavigationBar;
