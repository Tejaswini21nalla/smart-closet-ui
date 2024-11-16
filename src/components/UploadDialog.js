import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';

function UploadDialog({ open, onClose, onFileChange, file }) {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setPrediction(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Send the image to the backend API
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction from the server');
      }

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error:', error);
      setPrediction('Error in prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upload Item</DialogTitle>
      <DialogContent>
        <input type="file" onChange={onFileChange} />
      </DialogContent>
      <DialogActions>
        {loading ? (
          <CircularProgress />
        ) : prediction ? (
          <>
            <DialogContent>
              <Typography>Prediction:</Typography>
              <Typography variant="h6">{prediction}</Typography>
              <Button onClick={() => { setPrediction(null); onClose(); }} color="primary">
                OK
              </Button>
            </DialogContent>
          </>
        ) : (
          <>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleUpload} color="primary" disabled={!file}>
              Upload
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default UploadDialog;
