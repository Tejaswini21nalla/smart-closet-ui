import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, CircularProgress, useTheme, useMediaQuery } from '@mui/material';

function ClosetPage({ shouldRefresh, onRefreshComplete }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchClosetItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:5000/get_items');
      if (!response.ok) {
        throw new Error('Failed to fetch closet items');
      }
      const data = await response.json();
      console.log('Fetched data:', data);
      setItems(data.items || []);
    } catch (error) {
      console.error('Error fetching closet items:', error);
      setError('Failed to load closet items');
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClosetItems();
  }, []);

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
    <Box sx={{ 
      padding: isMobile ? '12px' : '20px',
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      <Typography 
        variant={isMobile ? "h5" : "h4"} 
        gutterBottom 
        sx={{ 
          textAlign: 'center', 
          mb: isMobile ? 2 : 4,
          fontSize: isMobile ? '1.5rem' : '2rem'
        }}
      >
        Your Closet
      </Typography>

      {items.length === 0 ? (
        <Typography color="textSecondary" sx={{ textAlign: 'center' }}>
          There are no items in the closet yet.
        </Typography>
      ) : (
        <Grid 
          container 
          spacing={isMobile ? 1 : 2}
          sx={{
            width: '100%',
            margin: '0',
            padding: isMobile ? '4px' : '8px',
          }}
        >
          {items.map((item, index) => (
            <Grid 
              item 
              key={index} 
              xs={6} 
              sm={4} 
              md={3} 
              lg={2}
              sx={{
                padding: isMobile ? '4px' : '8px',
              }}
            >
              <Paper 
                elevation={2}
                sx={{ 
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: isMobile ? 1 : 2,
                  overflow: 'hidden',
                  height: '100%',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    paddingTop: '100%',
                    width: '100%',
                    backgroundColor: '#f5f5f5',
                  }}
                >
                  <img
                    src={`data:image/jpeg;base64,${item.image}`}
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
                {item.predictions && (
                  <Box sx={{ 
                    p: isMobile ? 0.5 : 1,
                    backgroundColor: '#fff',
                  }}>
                    {Object.entries(item.predictions).map(([key, value]) => (
                      <Typography 
                        key={key} 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          fontSize: isMobile ? '0.7rem' : '0.8rem',
                          lineHeight: isMobile ? 1.2 : 1.4,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          mb: 0.25,
                        }}
                      >
                        {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}:
                        {' '}
                        {value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </Typography>
                    ))}
                    <Typography 
                      variant="caption" 
                      color="text.secondary" 
                      sx={{ 
                        display: 'block',
                        fontSize: isMobile ? '0.6rem' : '0.7rem',
                        mt: 0.5,
                      }}
                    >
                      {new Date(item.timestamp).toLocaleDateString()}
                    </Typography>
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
