import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from './components/Header';
import UploadDialog from './components/UploadDialog';
import BottomNavigationBar from './components/BottomNavigationBar';
import HomePage from './pages/HomePage';
import ClosetPage from './pages/ClosetPage';
import MorePage from './pages/MorePage';

function SmartCloset() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFile(null);
  };

  const handleFileChange = (event) => setFile(event.target.files[0]);

  const handleUpload = () => {
    if (file) {
      console.log('File uploaded:', file);
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

        {/* Routes for Page Navigation */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/closet" element={<ClosetPage />} />
          <Route path="/more" element={<MorePage />} />
        </Routes>

        {/* Bottom Navigation */}
        <BottomNavigationBar />
      </div>
    </Router>
  );
}

export default SmartCloset;
