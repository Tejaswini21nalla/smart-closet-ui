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
  Grid,
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

const SimilarItemImage = styled('img')({
  width: '150px',
  height: '150px',
  objectFit: 'cover',
  borderRadius: '4px',
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
  const [similarItems, setSimilarItems] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentPredictions, setCurrentPredictions] = useState(null);

  const formatValue = (value) => {
    if (typeof value !== 'string') return value;
    return value.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
    onFileChange(event);
  };

  const handleSave = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/save', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to save item');
      }

      const data = await response.json();
      if (data.success) {
        setPrediction({
          filename: data.filename,
          predictions: data.predictions
        });
        setSimilarItems(null);
        setShowSuccess(true);
        if (onItemAdded) {
          onItemAdded();
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setPrediction(null);
    setSimilarItems(null);
    setCurrentPredictions(null);

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
      
      if (data.message && data.similar_items) {
        setSimilarItems(data.similar_items);
        setCurrentPredictions(data.current_predictions);
      } else if (data.success && data.predictions) {
        setPrediction({
          filename: data.filename,
          predictions: data.predictions
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setPrediction(null);
      setSimilarItems(null);
      setCurrentPredictions(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = async () => {
    if (prediction) {
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    setPrediction(null);
    setSimilarItems(null);
    setPreviewUrl(null);
    setShowSuccess(false);
    setCurrentPredictions(null);
    onClose();
  };

  const renderPredictions = (predictions, title = "Predictions") => (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
        {title}
      </Typography>
      {Object.entries(predictions).map(([key, value]) => (
        <Box
          key={key}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px',
            margin: '4px 0',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}:
          </Typography>
          <Typography variant="body1">
            {formatValue(value)}
          </Typography>
        </Box>
      ))}
    </Box>
  );

  const renderSimilarItems = (items) => (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
        Similar Items Found
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {items.map((item, index) => (
          <Grid item key={index}>
            <Paper elevation={3} sx={{ p: 1 }}>
              <SimilarItemImage
                src={`data:image/jpeg;base64,${item.image}`}
                alt={`Similar item ${index + 1}`}
              />
              <Typography variant="caption" display="block" textAlign="center" sx={{ mt: 1 }}>
                {item.filename}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Typography 
        variant="h6" 
        color="warning.main" 
        sx={{ 
          mt: 3,
          mb: 2, 
          textAlign: 'center',
          fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
          fontWeight: 500,
          fontFamily: "'Playfair Display', serif",
          color: '#ed6c02',
          letterSpacing: '0.5px'
        }}
      >
        Would you still like to add this item to your closet?
      </Typography>
    </Box>
  );

  return (
    <>
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {similarItems ? 'Similar Items Found' : prediction ? 'Prediction Results' : 'Upload Item'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', py: 2 }}>
            {!prediction && !similarItems && (
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

            {similarItems && renderSimilarItems(similarItems)}

            {prediction && (
              <>
                <Typography color="success.main" sx={{ mb: 2 }}>
                  Successfully processed {prediction.filename}
                </Typography>
                {renderPredictions(prediction.predictions)}
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: 'center' }}>
          {similarItems ? (
            <>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button 
                onClick={handleSave} 
                variant="contained" 
                color="primary"
              >
                Yes, Add Item
              </Button>
            </>
          ) : prediction ? (
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
