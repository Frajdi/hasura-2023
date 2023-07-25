import { useState } from "react";
import { TextField, Button, Alert } from "@mui/material";
import { useEffect } from "react";
import RequirementAlert from "../../components/alerts/RequirementAlert";
import { useMutation } from "@apollo/client";
import {
  CREATE_BADGE,
  CREATE_BADGE_VERSION,
  GET_BADGES
} from "../../queries/BadgesQueries";
import LoadingSpinner from "../../components/spinner/LoadingSpinner";
import { useNavigate, Link } from "react-router-dom";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { AddBox, RemoveCircle } from "@mui/icons-material";
const CreateBadge = () => {
  const [requirementCount, setRequirementCount] = useState(1);
  const [insert_badges_definitions, { loading, error, data }] = useMutation(
    CREATE_BADGE,
    { refetchQueries: [{ query: GET_BADGES }] }
  );
  const [create_badges_version] = useMutation(CREATE_BADGE_VERSION, {
    refetchQueries: [{ query: GET_BADGES }],
    onCompleted: () => navigate("/badges", { state: { showAlert: 2 } }),
    onError: () => navigate("/badges", { state: { showAlert: -2 } })
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      requirements: [{ title: "", description: "" }]
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "requirements"
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      create_badges_version({
        variables: {
          id: data?.insert_badges_definitions?.returning[0]?.id
        }
      });
    }
  }, [data]);

  useEffect(() => {
    setRequirementCount(fields.length);
  }, [fields]);

  const onSubmit = (formData) => {
    const { title, description, requirements } = formData;

    if (requirementCount < 3) {
      alert("ave lali duhen 3 cop");
      return;
    }

    insert_badges_definitions({
      variables: {
        title: title,
        description: description,
        requirements: requirements.map((requirement) => ({
          title: requirement.title,
          description: requirement.description
        }))
      }
    });
  };
  if (loading)
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <LoadingSpinner />
      </div>
    );
  if (error) return `Loading error! ${error.message}`;
  return (
    <div>
      <Link to="/badges">
        <Button
          variant="outlined"
          sx={{ marginTop: "20px", marginLeft: "45%", padding: "10px" }}
        >
          GO TO BADGES
        </Button>
      </Link>
      <div style={{ marginTop: "50px", textAlign: "center" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <TextField
              multiline={true}
              sx={{ marginBottom: "10px", minWidth: "400px" }}
              label="Title"
              name="title"
              {...register("title", {
                required: "Badge must have a title",
                minLength: { value: 3, message: "Min length is 3" },
                maxLength: { value: 40, message: "Max length is 40" }
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <br />
            <TextField
              sx={{ marginBottom: "20px", minWidth: "400px" }}
              multiline={true}
              label="Description"
              name="description"
              {...register("description", {
                required: "Badge must have a description",
                minLength: { value: 3, message: "Min length is 3" }
              })}
              error={!!errors.description}
              helperText={errors.desccription?.message}
            />
            <p>Requirements</p>
            <AddBox
              sx={{ cursor: "pointer", marginBottom: "10px" }}
              onClick={() => append({ title: "", description: "" })}
            />
            {fields.map((field, index) => (
              <div key={field.id}>
                <Controller
                  name={`requirements.${index}.title`}
                  control={control}
                  defaultValue={field.title}
                  rules={{ required: "Requirement Title is required" }}
                  render={({ field }) => (
                    <TextField
                      multiline={true}
                      sx={{ marginBottom: "10px", minWidth: "400px" }}
                      label={`Requirement Title ${index + 1}`}
                      error={!!errors?.requirements?.[index]?.title}
                      helperText={errors?.requirements?.[index]?.title?.message}
                      {...field}
                    />
                  )}
                />
                <br />
                <Controller
                  name={`requirements.${index}.description`}
                  control={control}
                  defaultValue={field.description}
                  rules={{ required: "Requirement Description is required" }}
                  render={({ field }) => (
                    <TextField
                      sx={{ marginBottom: "25px", minWidth: "400px" }}
                      multiline={true}
                      label={`Requirement Description ${index + 1}`}
                      error={!!errors?.requirements?.[index]?.description}
                      helperText={
                        errors?.requirements?.[index]?.description?.message
                      }
                      {...field}
                    />
                  )}
                />
                <br />
                <RemoveCircle
                  sx={{
                    cursor: "pointer",
                    marginTop: "-50px",
                    marginLeft: "5px"
                  }}
                  onClick={() => remove(index)}
                />
              </div>
            ))}
          </div>
          <Button type="submit" variant="outlined" sx={{ padding: "10px" }}>
            Create Badge
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateBadge;
