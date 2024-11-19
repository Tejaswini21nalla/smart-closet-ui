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
  Grid,
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

const RecommendationImage = styled('img')({
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderRadius: '8px',
});

const attributeOptions = {
  sleeve_length: {
    "sleeveless": "Sleeveless",
    "short-sleeve": "Short Sleeve",
    "medium-sleeve": "Medium Sleeve",
    "long-sleeve": "Long Sleeve",
  },
  collar_type: {
    "V-shape": "V-Shape",
    "square": "Square",
    "round": "Round",
    "standing": "Standing",
    "lapel": "Lapel",
    "suspenders": "Suspenders",
  },
  lower_length: {
    "three-point": "Three Point",
    "medium short": "Medium Short",
    "three-quarter": "Three Quarter",
    "long": "Long",
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
    lower_length: '',
    hat: '',
    neckwear: '',
    outer_clothing_cardigan: '',
    upper_clothing_covering_navel: ''
  });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAttributes(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      // Convert empty values to 'NA'
      const requestBody = Object.fromEntries(
        Object.entries(attributes).map(([key, value]) => [key, value || 'NA'])
      );

      const response = await fetch('http://127.0.0.1:5000/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Failed to get recommendations: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.success && data.recommendations) {
        setRecommendations(data.recommendations);
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
    navigate('/');
  };

  const attributeLabels = {
    sleeve_length: 'Sleeve Length',
    collar_type: 'Collar Type',
    lower_length: 'Lower Clothing Length',
    hat: 'Hat',
    neckwear: 'Neckwear',
    outer_clothing_cardigan: 'Cardigan',
    upper_clothing_covering_navel: 'Navel Coverage'
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="md" fullWidth>
      <DialogTitle sx={{ pb: 1, textAlign: 'center', typography: 'h5', fontWeight: 'bold' }}>
        Get Outfit Recommendations
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" sx={{ mb: 2, textAlign: 'center', color: 'text.secondary' }}>
          Select your preferred attributes for outfit recommendations
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
            {error}
          </Typography>
        )}
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

        {recommendations.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
              Recommended Outfits
            </Typography>
            <Grid container spacing={2}>
              {recommendations.map((recommendation, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper elevation={3} sx={{ p: 2 }}>
                    <RecommendationImage
                      src={`data:image/jpeg;base64,${recommendation.image}`}
                      alt={`Recommendation ${index + 1}`}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, justifyContent: 'center' }}>
        <Button 
          onClick={handleCancel} 
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
          disabled={loading}
        >
          {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RecommendationDialog;
