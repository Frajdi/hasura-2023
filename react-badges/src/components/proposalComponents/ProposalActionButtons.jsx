import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
  FormHelperText
} from "@mui/material";
import { useMutation } from "@apollo/client";
import {
  DISAPPROVE_CANDIDATURE_PROPOSAL,
  APPROVE_CANDIDATURE_PROPOSAL
} from "../../queries/CandidatureMutations";
import { useDisapprovalCandidatureProposal } from "../../containers/Manager/ProposalFunctions";

const ProposalActionButtons = ({ rowId, approvalStatus, refetch }) => {
  const [open, setOpen] = useState(false);
  const [disapprovalMotivation, setDisapprovalMotivation] = useState("");
  const {
    handleDisapprove,
    loading: loadingDisapprove,
    error: errorDisapprove
  } = useDisapprovalCandidatureProposal(
    rowId,
    disapprovalMotivation,
    setOpen,
    setDisapprovalMotivation,
    refetch
  );

  const [
    approveCandidatureProposal,
    { loading: loadingApprove, error: errorApprove }
  ] = useMutation(APPROVE_CANDIDATURE_PROPOSAL, {
    onCompleted: () => refetch()
  });

  const handleRejectButtonClick = () => {
    setOpen(true);
  };
  console.log(rowId, "rowId");
  const handleAcceptButtonClick = () => {
    approveCandidatureProposal({
      variables: {
        proposalId: rowId
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
    setDisapprovalMotivation("");
  };

  const handleSubmit = () => {
    handleDisapprove();
    setOpen(false);
    setDisapprovalMotivation("");
  };
  console.log(approvalStatus);

  if (approvalStatus === "Approved" || approvalStatus === "Rejected") {
    return null;
  }

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAcceptButtonClick}
        disable={loadingApprove}
      >
        {loadingApprove ? <CircularProgress size={20} /> : "Accept"}
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={handleRejectButtonClick}
        loading={loadingDisapprove}
      >
        {loadingDisapprove ? <CircularProgress size={20} /> : "Reject"}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Rejection</DialogTitle>
        <DialogContent>
          <TextField
            label="Disapproval Motivation"
            value={disapprovalMotivation}
            onChange={(e) => setDisapprovalMotivation(e.target.value)}
            fullWidth
          />
          {errorDisapprove && (
            <FormHelperText error>{errorDisapprove.message}</FormHelperText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loadingDisapprove}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {loadingDisapprove ? (
              <CircularProgress size={20} />
            ) : (
              "Submit Rejection"
            )}
          </Button>
        </DialogActions>
      </Dialog>
      {errorApprove && (
        <FormHelperText error>{errorApprove.message}</FormHelperText>
      )}
    </Box>
  );
};

export default ProposalActionButtons;
