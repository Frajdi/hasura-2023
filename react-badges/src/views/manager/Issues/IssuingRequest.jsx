import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import {
  GET_ISSUING_REQUESTS_FOR_MANAGER,
  UPDATE_ISSUING_REQUEST_APPROVAL,
  UPDATE_ISSUING_REQUEST_REJECTION
} from "../../../queries/IssueMutations";

const IssuingRequests = ({ managerId }) => {
  const { loading, error, data } = useQuery(GET_ISSUING_REQUESTS_FOR_MANAGER, {
    variables: { managerId }
  });

  const [approveIssuingRequest] = useMutation(UPDATE_ISSUING_REQUEST_APPROVAL);
  const [rejectIssuingRequest] = useMutation(UPDATE_ISSUING_REQUEST_REJECTION);

  const handleApproveIssuingRequest = (requestId) => {
    approveIssuingRequest({
      variables: { id: requestId },
      update: (cache) => {
        // Update cache logic here
      }
    });
  };

  const handleRejectIssuingRequest = (requestId) => {
    rejectIssuingRequest({
      variables: { id: requestId },
      update: (cache) => {
        // Update cache logic here
      }
    });
  };

  if (loading) {
    return <Typography>Loading issuing requests...</Typography>;
  }

  if (error) {
    return (
      <Typography variant="body1" color="error">
        Error loading issuing requests: {error.message}
      </Typography>
    );
  }

  return (
    <div>
      <Card variant="outlined">
        <CardContent>
          <Typography
            variant="h2"
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            Issuing Request
          </Typography>
          {data.issuing_requests_view.map((request) => (
            <div key={request.id}>
              <Typography variant="h5" component="div">
                Badge Title: {request.badge_title}
              </Typography>
              <Typography variant="body2">
                Badge Description: {request.badge_description}
              </Typography>
              <Typography variant="body1">
                Engineer Name: {request.engineer_name}
              </Typography>
              <Button
                size="small"
                onClick={() => handleApproveIssuingRequest(request.id)}
              >
                Approve
              </Button>
              <Button
                size="small"
                onClick={() => handleRejectIssuingRequest(request.id)}
              >
                Reject
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default IssuingRequests;
