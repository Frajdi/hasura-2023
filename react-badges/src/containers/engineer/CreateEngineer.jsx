import { ADD_ENGINEER, GET_ENGINEERS } from "../../queries/EngineerQueries";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import UserForm from "../../components/UserForm";
import { useForm } from "react-hook-form";
import { useState } from "react";

const CreateEngineer = () => {
  const navigate = useNavigate();
  // const [showAlert, setShowAlert] = useState(1);

  const form = useForm({
    mode: "onChange"
  });
  const [addEngineer, { loading, error }] = useMutation(ADD_ENGINEER, {
    refetchQueries: [{ query: GET_ENGINEERS }]
  });
  const handleFormSubmit = (formData) => {
    addEngineer({ variables: { name: formData.name } }).then(({ data }) => {
      const showAlert = data?.insert_users_one?.name ? 1 : -1;
      navigate("/engineers", { state: { showAlert } });
    });
  };

  if (error) return `Submission error! ${error.message}`;

  return (
    <div
      style={{
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >
      <UserForm form={form} onSubmit={handleFormSubmit} />
    </div>
  );
};
export default CreateEngineer;
