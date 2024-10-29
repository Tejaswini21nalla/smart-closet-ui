import React, { useState } from 'react';
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
  const [uploadedImages, setUploadedImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFile(null);
  };

  const handleFileChange = (event) => setFile(event.target.files[0]);

  const handleUpload = () => {
    if (file) {
      // Simulate image upload
      const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the uploaded file
      setUploadedImages((prevImages) => [...prevImages, imageUrl]);
      setSuccessMessage(true); // Show success message
      handleClose();
    }
  };

  return (
    <Router>
      <div>
        {/* Header Component - Appears on all pages */}
        <Header onAddClick={handleClickOpen} />
        
        {/* Upload Dialog */}
        <UploadDialog
          open={open}
          onClose={handleClose}
          onFileChange={handleFileChange}
          onUpload={handleUpload}
          file={file}
        />

        {/* Success Snackbar */}
        <Snackbar
          open={successMessage}
          autoHideDuration={5000}
          onClose={() => setSuccessMessage(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setSuccessMessage(false)} severity="success" sx={{ width: '100%' }}>
            Image uploaded successfully!
          </Alert>
        </Snackbar>

        {/* Routes for Page Navigation */}
        <Routes>
          <Route path="/" element={<HomePage onAddClick={handleClickOpen} />} />
          <Route path="/closet" element={<ClosetPage uploadedImages={uploadedImages} />} />
          <Route path="/more" element={<MorePage />} />
        </Routes>

        {/* Bottom Navigation */}
        <BottomNavigationBar />
      </div>
    </Router>
  );
}

export default SmartCloset;
