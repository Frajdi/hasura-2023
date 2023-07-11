import React, { useEffect, useState } from "react";
import { useQuery} from "@apollo/client";
import { LOAD_MANAGERS } from "./QueryManagerList";
import AddManager from "../AddManager/AddManager";

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

  const handleAddManager = (newManager) => {
    setManagers([...managers, newManager]);
  };

  return (
    <div>
      <h2>Add Manager</h2>
      <AddManager onAddManager={handleAddManager} />
      <h2>Managers List</h2>
      {managers.map((manager) => (
        <h3 key={manager.id}>{manager.name}</h3>
      ))}
    </div>
  );

}

export default Managers;
