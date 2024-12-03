import React from 'react';
import { Paper, Typography, Button, useMediaQuery, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

function WelcomeMessage({ onAddClick }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper 
      elevation={3} 
      sx={{
        marginTop: { xs: '20px', sm: '40px' },
        padding: { xs: '30px', sm: '40px', md: '50px' },
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        maxWidth: '800px',
        mx: 'auto',
        borderRadius: '16px',
      }}
    >
      <Box sx={{ mb: { xs: 3, sm: 4 } }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 'bold',
            color: '#1a237e',
            mb: 2
          }}
        >
          Welcome to Your Smart Closet!
        </Typography>
        <Typography 
          variant="h6" 
          color="textSecondary"
          sx={{
            fontSize: { xs: '1rem', sm: '1.25rem' },
            maxWidth: '600px',
            mx: 'auto',
            lineHeight: 1.6
          }}
        >
          Easily manage your wardrobe and discover perfect outfit combinations with AI-powered recommendations.
        </Typography>
      </Box>
      
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<AddIcon />}
        onClick={onAddClick}
        sx={{
          mt: 3,
          py: { xs: 1.5, sm: 2 },
          px: { xs: 3, sm: 4 },
          fontSize: { xs: '1rem', sm: '1.1rem' },
          borderRadius: '8px',
          textTransform: 'none',
          backgroundColor: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
      >
        Add Item to Closet
      </Button>
    </Paper>
  );
}

export default WelcomeMessage;
