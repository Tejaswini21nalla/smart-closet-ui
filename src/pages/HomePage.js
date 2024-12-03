import React from 'react';
import { Box } from '@mui/material';
import WelcomeMessage from '../components/WelcomeMessage';

function HomePage({ onAddClick }) {
  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 140px)', // Adjust for AppBar and padding
        textAlign: 'center',
        px: 2
      }}
    >
      <WelcomeMessage onAddClick={onAddClick} />
    </Box>
  );
}

export default HomePage;
