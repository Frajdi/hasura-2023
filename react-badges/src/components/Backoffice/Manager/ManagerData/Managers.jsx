import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_MANAGERS } from "../GraphQL/Queries";

const Managers = () => {
  const { loading, data, error } = useQuery(LOAD_MANAGERS);
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    if (data) {
      setManagers(data.managers);
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {managers.map((manager) => (
        <h3 key={manager.id}>{manager.name}</h3>
      ))}
    </div>
  );
};

export default Managers;
