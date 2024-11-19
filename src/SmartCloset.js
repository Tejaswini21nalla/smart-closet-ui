import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ClosetIcon from '@mui/icons-material/CheckroomOutlined';
import StyleIcon from '@mui/icons-material/Style';
import AddIcon from '@mui/icons-material/Add';
import RecommendationDialog from './components/RecommendationDialog';
import HomePage from './pages/HomePage';
import ClosetPage from './pages/ClosetPage';
import UploadDialog from './components/UploadDialog';
import { Snackbar, Alert } from '@mui/material';

function MobileNavigation({ onAddClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0,
        zIndex: 1000,
        display: { xs: 'block', sm: 'none' }
      }} 
      elevation={3}
    >
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Home"
          value="/"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="Closet"
          value="/closet"
          icon={<ClosetIcon />}
        />
        <BottomNavigationAction
          label="Style Match"
          value="/style"
          icon={<StyleIcon />}
        />
        <BottomNavigationAction
          label="Add Item"
          value="/add"
          icon={<AddIcon />}
          onClick={(e) => {
            e.preventDefault();
            onAddClick();
          }}
        />
      </BottomNavigation>
    </Paper>
  );
}

function AppContent() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [shouldRefreshCloset, setShouldRefreshCloset] = useState(false);
  const [openRecommendations, setOpenRecommendations] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickOpen = () => setOpen(true);
  
  const handleClose = () => {
    setOpen(false);
    setFile(null);
  };

  const handleFileChange = (event) => setFile(event.target.files[0]);

  const handleItemAdded = () => {
    setShouldRefreshCloset(true);
  };

  const handleCloseRecommendations = () => {
    setOpenRecommendations(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isSelected = (path) => location.pathname === path;

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      bgcolor: '#fff'
    }}>
      <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
        <Toolbar>
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              fontWeight: 700,
              background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '2px',
              fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
              textTransform: 'capitalize',
              '& span': {
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'normal',
                fontWeight: 900
              }
            }}
          >
            Smart Closet
          </Typography>
          <Box sx={{ 
            display: { xs: 'none', sm: 'flex' },
            gap: 3,
            mr: 2
          }}>
            <IconButton
              color={isSelected('/') ? 'primary' : 'inherit'}
              onClick={() => handleNavigation('/')}
              sx={{ 
                padding: { sm: '12px' },
                '& .MuiSvgIcon-root': { 
                  fontSize: { sm: '28px' }
                }
              }}
            >
              <HomeIcon />
            </IconButton>
            <IconButton
              color={isSelected('/closet') ? 'primary' : 'inherit'}
              onClick={() => handleNavigation('/closet')}
              sx={{ 
                padding: { sm: '12px' },
                '& .MuiSvgIcon-root': { 
                  fontSize: { sm: '28px' }
                }
              }}
            >
              <ClosetIcon />
            </IconButton>
            <IconButton
              color={isSelected('/style') ? 'primary' : 'inherit'}
              onClick={() => handleNavigation('/style')}
              sx={{ 
                padding: { sm: '12px' },
                '& .MuiSvgIcon-root': { 
                  fontSize: { sm: '28px' }
                }
              }}
            >
              <StyleIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ 
        flex: 1,
        overflow: 'auto',
        pb: isMobile ? 7 : 0
      }}>
        <Routes>
          <Route path="/" element={<HomePage onAddClick={handleClickOpen} />} />
          <Route 
            path="/closet" 
            element={
              <ClosetPage 
                shouldRefresh={shouldRefreshCloset}
                onRefreshComplete={() => setShouldRefreshCloset(false)}
              /> 
            } 
          />
          <Route 
            path="/style" 
            element={<RecommendationDialog open={true} onClose={() => {}} />} 
          />
        </Routes>
      </Box>

      {isMobile && <MobileNavigation onAddClick={handleClickOpen} />}

      <UploadDialog
        open={open}
        onClose={handleClose}
        onFileChange={handleFileChange}
        file={file}
        onItemAdded={handleItemAdded}
      />

      <Snackbar
        open={shouldRefreshCloset}
        autoHideDuration={3000}
        onClose={() => setShouldRefreshCloset(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => false} severity="success" sx={{ width: '100%' }}>
          Image uploaded successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}

function SmartCloset() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default SmartCloset;
