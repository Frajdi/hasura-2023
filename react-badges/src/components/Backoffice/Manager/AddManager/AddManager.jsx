import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_MANAGER } from "./MutationAddManager";

const AddManagers = ({ onAddManager }) => {
  const [newManagerName, setNewManagerName] = useState("");
  const [addManager] = useMutation(ADD_MANAGER);

  const handleChangeName = (e) => {
    setNewManagerName(e.target.value);
  };

  const handleAddManager = async () => {
    try {
      const { data } = await addManager({
        variables: { name: newManagerName }
      });
      const newManager = data.insert_users_one;
      onAddManager(newManager);
      setNewManagerName("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleAddManager}>
      <input type="text" value={newManagerName} onChange={handleChangeName} />
      <button type="submit">Add Manager</button>
    </form>
  );
};

export default AddManagers;
