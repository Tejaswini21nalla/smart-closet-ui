import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

function ClosetPage({ uploadedImages }) {
  return (
    <Box sx={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Your Closet
      </Typography>

      {uploadedImages.length === 0 ? (
        <Typography color="textSecondary">
          There are no items in the closet yet.
        </Typography>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {uploadedImages.map((image, index) => (
            <Grid item key={index}>
              <Paper elevation={3} sx={{ padding: '10px' }}>
                <img src={image} alt={`Uploaded item ${index + 1}`} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default ClosetPage;
