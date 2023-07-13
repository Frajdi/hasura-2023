import { InputLabel, TextField } from "@mui/material";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_BADGE_MUTATION } from "./Graphql/Mutations";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LOAD_BADGES } from "./Graphql/Queries";

const CreateBadge = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();
  const [insert_badges_definitions, { loading, error, data }] = useMutation(
    CREATE_BADGE_MUTATION,
    { refetchQueries: [{ query: LOAD_BADGES }] }
  );

  const onSubmit = (data) => {
    const { title, description, r_title, r_description } = data;
    console.log(title, description, r_title, r_description);

    insert_badges_definitions({
      variables: {
        title: title,
        description: description,
        r_title: r_title,
        r_description: r_description
      }
    });
    console.log("Mutation successful");
    console.log(error);
    navigate("/badges");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            label="Title"
            name="title"
            {...register("title", {
              required: true
            })}
          />
          <TextField
            label="Description"
            name="description"
            {...register("description", {
              required: true
            })}
          />
          <TextField
            label="r_title"
            name="r_title"
            {...register("r_title", {
              required: true
            })}
          />
          <TextField
            label="r_description"
            name="r_description"
            {...register("r_description", {
              required: true
            })}
          />
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  );
};
export default CreateBadge;
