import { useEffect, useState } from "react";
import withApollo from "../../state/with-apollo";
import { gql, useMutation } from "@apollo/client";
import { userColumns } from "../../components/reUsable/DataTable";
import Table from "../../components/reUsable/Table";
import Button from "@mui/material/Button";
import { useAuth } from "../../state/with-auth";
import { useNavigate } from "react-router-dom";
import { GET_ENGINEERS_BY_MANAGER } from "../../queries/BadgeEngineerMutations";
const Engineers = () => {
  const [engineers, setEngineers] = useState([]);
  const [managerId, setManagerId] = useState();

  const updatedColumns = [
    ...userColumns,
    {
      field: "actions",
      headerName: "Propose Badge",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleButtonClick(params.row.id)}
        >
          Propose
        </Button>
      )
    }
  ];

  const auth = useAuth();
  useEffect(() => {
    setManagerId(auth.hasura["x-hasura-tenant-id"]);
  }, []);

  const [executeMutation, { loading, error, data }] = useMutation(GET_ENGINEERS_BY_MANAGER,{

  });

  const navigate = useNavigate();

  const handleButtonClick = (id) => {
    navigate("/proposalform");
    console.log(`Button clicked for row with ID: ${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (managerId !== null && managerId !== undefined) {
          const result = await executeMutation({
            variables: { managerId }
          });
          setEngineers(result.data.get_engineers_by_manager);
        }
      } catch (error) {
        console.error("Error fetching engineers:", error);
      }
    };

    fetchData();
  }, [managerId, executeMutation]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (data && data.get_engineers_by_manager.length < 1)
  return <p>No Data to show</p>;
  console.log(data, "data");

  return (
    <>
      <div>
        <Table row={engineers} columns={updatedColumns} />
      </div>
    </>
  );
};

export default withApollo(Engineers);
