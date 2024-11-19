import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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

const attributeOptions = {
  sleeve_length: {
    "Sleeveless": "Sleeveless",
    "Short Sleeve": "Short Sleeve",
    "Medium Sleeve": "Medium Sleeve",
    "Long Sleeve": "Long Sleeve",
  },
  collar_type: {
    "V-Shape": "V-Shape",
    "Square": "Square",
    "Round": "Round",
    "Standing": "Standing",
    "Lapel": "Lapel",
    "Suspenders": "Suspenders",
  },
  lower_clothing_length: {
    "Three Point": "Three Point",
    "Medium Short": "Medium Short",
    "Three Quarter": "Three Quarter",
    "Long": "Long",
  },
  hat: {
    "no hat": "No Hat",
    "yes hat": "Has Hat",
  },
  neckwear: {
    "no neckwear": "No Neckwear",
    "yes neckwear": "Has Neckwear",
  },
  outer_clothing_cardigan: {
    "yes cardigan": "Has Cardigan",
    "no cardigan": "No Cardigan",
  },
  upper_clothing_covering_navel: {
    "no": "Not Covering Navel",
    "yes": "Covering Navel",
  }
};

function RecommendationDialog({ open, onClose }) {
  const navigate = useNavigate();
  const [attributes, setAttributes] = useState({
    sleeve_length: '',
    collar_type: '',
    lower_clothing_length: '',
    hat: '',
    neckwear: '',
    outer_clothing_cardigan: '',
    upper_clothing_covering_navel: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAttributes(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          attributes: Object.fromEntries(
            Object.entries(attributes).map(([key, value]) => [key, value || 'NA'])
          )
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }

      const data = await response.json();
      console.log(data);
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    onClose();
    navigate('/');
  };

  const attributeLabels = {
    sleeve_length: 'Sleeve Length',
    collar_type: 'Collar Type',
    lower_clothing_length: 'Lower Clothing Length',
    hat: 'Hat',
    neckwear: 'Neckwear',
    outer_clothing_cardigan: 'Cardigan',
    upper_clothing_covering_navel: 'Navel Coverage'
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1, textAlign: 'center', typography: 'h5', fontWeight: 'bold' }}>
        Get Outfit Recommendations
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" sx={{ mb: 2, textAlign: 'center', color: 'text.secondary' }}>
          Select your preferred attributes for outfit recommendations
        </Typography>
        <StyledPaper elevation={0}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            {Object.keys(attributes).map((attr) => (
              <StyledFormControl key={attr} fullWidth>
                <InputLabel>{attributeLabels[attr]}</InputLabel>
                <Select
                  name={attr}
                  value={attributes[attr]}
                  onChange={handleChange}
                  label={attributeLabels[attr]}
                >
                  <MenuItem value="">
                    <em>Any</em>
                  </MenuItem>
                  {Object.entries(attributeOptions[attr]).map(([value, label]) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </StyledFormControl>
            ))}
          </Box>
        </StyledPaper>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, justifyContent: 'center' }}>
        <Button onClick={handleCancel} color="secondary" variant="outlined" sx={{ borderRadius: 2, minWidth: 120 }}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          color="primary" 
          variant="contained"
          sx={{
            borderRadius: 2, 
            minWidth: 120,
            backgroundColor: '#000',
            '&:hover': {
              backgroundColor: '#333',
            },
          }}
        >
          Get Recommendations
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RecommendationDialog;
