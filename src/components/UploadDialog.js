import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  CircularProgress,
  Typography,
  Box,
  Paper,
  styled,
  Snackbar,
  Alert,
} from '@mui/material';

const StyledImage = styled('img')({
  maxWidth: '300px',
  maxHeight: '300px',
  width: 'auto',
  height: 'auto',
  objectFit: 'contain',
  margin: '0 auto',
  display: 'block',
});

const PredictionLabel = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px',
  margin: '4px 0',
  backgroundColor: '#f5f5f5',
  borderRadius: '4px',
});

function UploadDialog({ open, onClose, onFileChange, file, onItemAdded }) {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
    onFileChange(event);
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setPrediction(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction from the server');
      }

      const data = await response.json();
      console.log('Received prediction data:', data);
      setPrediction(data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setPrediction(null);
      setLoading(false);
    }
  };

  const handleClose = async () => {
    if (prediction) {
      setShowSuccess(true);
      // Notify parent component that a new item was added
      if (onItemAdded) {
        onItemAdded();
      }
      // Wait for the success message to be shown
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    setPrediction(null);
    setPreviewUrl(null);
    setShowSuccess(false);
    onClose();
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {prediction ? 'Prediction Results' : 'Upload Item'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', py: 2 }}>
            {!prediction && (
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                style={{ marginBottom: '16px' }}
              />
            )}
            
            {previewUrl && (
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 2, 
                  mb: 2, 
                  width: '100%', 
                  display: 'flex', 
                  justifyContent: 'center' 
                }}
              >
                <StyledImage src={previewUrl} alt="Preview" />
              </Paper>
            )}

            {loading && (
              <CircularProgress sx={{ my: 2 }} />
            )}

            {prediction && (
              <Box sx={{ width: '100%' }}>
                <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
                  Predictions
                </Typography>
                {Object.entries(prediction).map(([key, value]) => (
                  <PredictionLabel key={key}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}:
                    </Typography>
                    <Typography variant="body1">
                      {value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </Typography>
                  </PredictionLabel>
                ))}
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: 'center' }}>
          {prediction ? (
            <Button 
              onClick={handleClose} 
              variant="contained" 
              color="primary"
              sx={{ minWidth: '120px' }}
            >
              OK
            </Button>
          ) : (
            <>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button 
                onClick={handleUpload} 
                color="primary" 
                variant="contained"
                disabled={!file}
              >
                Upload
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showSuccess}
        autoHideDuration={1500}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Item added to your closet!
        </Alert>
      </Snackbar>
    </>
  );
}

export default UploadDialog;
