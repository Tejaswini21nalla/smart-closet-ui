import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Snackbar, Alert, Container } from '@mui/material';
import Header from './components/Header';
import UploadDialog from './components/UploadDialog';
import BottomNavigationBar from './components/BottomNavigationBar';
import HomePage from './pages/HomePage';
import ClosetPage from './pages/ClosetPage';
import MorePage from './pages/MorePage';

function SmartCloset() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [shouldRefreshCloset, setShouldRefreshCloset] = useState(false);

  const handleClickOpen = () => setOpen(true);
  
  const handleClose = () => {
    setOpen(false);
    setFile(null);
  };

  const handleFileChange = (event) => setFile(event.target.files[0]);

  const handleItemAdded = useCallback(() => {
    setShouldRefreshCloset(true);
  }, []);

  return (
    <Router>
      <div>
        <Header onAddClick={handleClickOpen} />
        <UploadDialog
          open={open}
          onClose={handleClose}
          onFileChange={handleFileChange}
          file={file}
          onItemAdded={handleItemAdded}
        />

        {/* Success Snackbar */}
        <Snackbar
          open={false}
          autoHideDuration={5000}
          onClose={() => false}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => false} severity="success" sx={{ width: '100%' }}>
            Image uploaded successfully!
          </Alert>
        </Snackbar>

        {/* Routes for Page Navigation */}
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
          <Route path="/more" element={<MorePage />} />
        </Routes>

        {/* Bottom Navigation */}
        <BottomNavigationBar />
      </div>
    </Router>
  );
}

export default SmartCloset;
