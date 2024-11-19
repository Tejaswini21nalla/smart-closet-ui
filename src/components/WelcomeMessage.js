import React from 'react';
import { Paper, Typography, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

function WelcomeMessage({ onAddClick }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper elevation={3} style={{ marginTop: '20px', padding: '20px', textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Welcome to Your Closet!
      </Typography>
      <Typography color="textSecondary">
        Easily manage your wardrobe and find the perfect outfit.
      </Typography>
      
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onAddClick}
          style={{ marginTop: '10px' }}
        >
          Add Item
        </Button>
      
    </Paper>
  );
}

export default WelcomeMessage;
