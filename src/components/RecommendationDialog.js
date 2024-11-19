import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Paper,
  Typography,
  styled,
} from '@mui/material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  backgroundColor: '#f8f9fa',
  borderRadius: theme.spacing(2),
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 200,
}));

const SLEEVE_OPTIONS = [
  { value: "sleeveless", label: "Sleeveless" },
  { value: "short-sleeve", label: "Short Sleeve" },
  { value: "medium-sleeve", label: "Medium Sleeve" },
  { value: "long-sleeve", label: "Long Sleeve" },
];

const COLLAR_OPTIONS = [
  { value: "V-shape", label: "V-Shape" },
  { value: "square", label: "Square" },
  { value: "round", label: "Round" },
  { value: "standing", label: "Standing" },
  { value: "lapel", label: "Lapel" },
  { value: "suspenders", label: "Suspenders" },
];

const LENGTH_OPTIONS = [
  { value: "three-point", label: "Three Point" },
  { value: "medium short", label: "Medium Short" },
  { value: "three-quarter", label: "Three Quarter" },
  { value: "long", label: "Long" },
];

function RecommendationDialog({ open, onClose }) {
  const [attributes, setAttributes] = useState({
    sleeve_length: "",
    collar_type: "",
    lower_length: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAttributes(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    // Convert empty strings to "NA"
    const finalAttributes = {
      sleeve_length: attributes.sleeve_length || "NA",
      collar_type: attributes.collar_type || "NA",
      lower_length: attributes.lower_length || "NA",
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalAttributes),
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }

      const data = await response.json();
      console.log('Recommendations:', data);
      // Handle the recommendations data here
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: 16,
          padding: '16px',
        },
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', typography: 'h5', fontWeight: 'bold' }}>
        Get Outfit Recommendations
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" sx={{ mb: 2, textAlign: 'center', color: 'text.secondary' }}>
          Select your preferred attributes for outfit recommendations
        </Typography>
        <StyledPaper elevation={0}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <StyledFormControl>
              <InputLabel>Sleeve Length</InputLabel>
              <Select
                name="sleeve_length"
                value={attributes.sleeve_length}
                onChange={handleChange}
                label="Sleeve Length"
              >
                <MenuItem value="">
                  <em>Any</em>
                </MenuItem>
                {SLEEVE_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </StyledFormControl>

            <StyledFormControl>
              <InputLabel>Collar Type</InputLabel>
              <Select
                name="collar_type"
                value={attributes.collar_type}
                onChange={handleChange}
                label="Collar Type"
              >
                <MenuItem value="">
                  <em>Any</em>
                </MenuItem>
                {COLLAR_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </StyledFormControl>

            <StyledFormControl>
              <InputLabel>Length</InputLabel>
              <Select
                name="lower_length"
                value={attributes.lower_length}
                onChange={handleChange}
                label="Length"
              >
                <MenuItem value="">
                  <em>Any</em>
                </MenuItem>
                {LENGTH_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </StyledFormControl>
          </Box>
        </StyledPaper>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', p: 3 }}>
        <Button 
          onClick={onClose} 
          color="secondary" 
          variant="outlined"
          sx={{ borderRadius: 2, minWidth: 120 }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          color="primary" 
          variant="contained"
          sx={{ borderRadius: 2, minWidth: 120 }}
        >
          Get Recommendations
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RecommendationDialog;
