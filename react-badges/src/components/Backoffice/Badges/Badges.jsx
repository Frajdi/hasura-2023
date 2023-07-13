import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { LOAD_BADGES } from "../Badges/Graphql/Queries";
import { Button } from "@mui/material";
import CreateBadge from "./CreateBadge";
import { Link } from "react-router-dom";
import { DELETE_BADGE } from "./Graphql/Mutations";

const Badges = () => {
  const { data } = useQuery(LOAD_BADGES);
  // const { badges_definitions } = data ? data : [];

  const [badges, setBadges] = useState([]);
  const [deleteBadge, { loading, error }] = useMutation(DELETE_BADGE, {
    refetchQueries: [{ query: LOAD_BADGES }]
  });

  useEffect(() => {
    if (data) {
      setBadges(data.badges_definitions);
    }
  }, [data]);

  const deleteBadgeHandler = (id) => {
    deleteBadge({
      variables: {
        id: badge.id
      }
    });
  };

  return (
    <div>
      {badges &&
        badges.map((badge) => {
          return (
            <>
              <h1> {badge.title}</h1>
              <p>{badge.description}</p>
              <ol>
                {badge.badges_definitions_requirements_definitions.map(
                  (requirement, index) => (
                    <li key={index}>{requirement.description}</li>
                  )
                )}
              </ol>
              <Button onClick={() => deleteBadgeHandler(badge.id)}>
                Delete
              </Button>
            </>
          );
        })}
      <Button>
        <Link to={"/create"}>Add New</Link>
      </Button>
    </div>
  );
};

export default Badges;
