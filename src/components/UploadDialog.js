import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

function UploadDialog({ open, onClose, onFileChange, onUpload, file }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upload Item</DialogTitle>
      <DialogContent>
        <input type="file" onChange={onFileChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onUpload} color="primary" disabled={!file}>
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UploadDialog;
