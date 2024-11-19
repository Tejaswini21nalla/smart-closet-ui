import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, CircularProgress } from '@mui/material';

function ClosetPage({ shouldRefresh, onRefreshComplete }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClosetItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:5000/get_items');
      if (!response.ok) {
        throw new Error('Failed to fetch closet items');
      }
      const data = await response.json();
      setItems(data.items || []);
    } catch (error) {
      console.error('Error fetching closet items:', error);
      setError('Failed to load closet items');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchClosetItems();
  }, []);

  // Refresh when shouldRefresh changes
  useEffect(() => {
    if (shouldRefresh) {
      fetchClosetItems();
      onRefreshComplete();
    }
  }, [shouldRefresh, onRefreshComplete]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: '20px', textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Your Closet
      </Typography>

      {items.length === 0 ? (
        <Typography color="textSecondary" sx={{ textAlign: 'center' }}>
          There are no items in the closet yet.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {items.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  }
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    paddingTop: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 1,
                  }}
                >
                  <img
                    src={item.image_url}
                    alt={`Closet item ${index + 1}`}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
                {item.attributes && (
                  <Box sx={{ width: '100%', mt: 1 }}>
                    {Object.entries(item.attributes).map(([key, value]) => (
                      <Typography key={key} variant="body2" color="text.secondary">
                        {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}:
                        {' '}
                        {value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </Typography>
                    ))}
                  </Box>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default ClosetPage;
