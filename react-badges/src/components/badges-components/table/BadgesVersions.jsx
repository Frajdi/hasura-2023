import React from "react";
import {
  TableRow,
  TableCell,
  Table,
  TableHead,
  TableBody,
  Container,
  Paper,
  Button,
  TableContainer,
  Box
} from "@mui/material";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_BADGE_VERSIONS } from "../../../queries/BadgesQueries";
import BadgesVersionsRow from "./BadgesVersionsRow";
import { useParams } from "react-router-dom";

const BadgesVersions = () => {
  const { id } = useParams();
  const { data } = useQuery(GET_BADGE_VERSIONS, {
    variables: {
      id
    }
  });

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Link to="/badges">
        <Button
          variant="outlined"
          sx={{ marginTop: "20px", marginLeft: "40%" }}
        >
          GO TO BADGES
        </Button>
      </Link>
      <Box sx={{ m: 1, display: "flex", justifyContent: "center" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Badge</TableCell>
                <TableCell align="center">Version</TableCell>
                <TableCell align="center">Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.badges_versions.map((data, index) => (
                <BadgesVersionsRow key={index} data={data} index={index} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default BadgesVersions;
