import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField
} from "@mui/material";

const RejectionDialog = ({ open, onClose, onSubmit }) => {
  const [disapprovalMotivation, setDisapprovalMotivation] = useState("");

  const handleSubmit = () => {
    onSubmit(disapprovalMotivation);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Rejection</DialogTitle>
      <DialogContent>
        <TextField
          label="Disapproval Motivation"
          value={disapprovalMotivation}
          onChange={(e) => setDisapprovalMotivation(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit Rejection</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RejectionDialog;
