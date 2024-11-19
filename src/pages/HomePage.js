import React from 'react';
import { Box } from '@mui/material';
import WelcomeMessage from '../components/WelcomeMessage';

function HomePage({ onAddClick }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding:'20px',
        marginTop: '240px'
      }}
    >
      <WelcomeMessage onAddClick={onAddClick} />
    </Box>
  );
}

export default HomePage;
