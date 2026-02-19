import React from "react";
import { useContextApi } from "./UserContext";

const Content = () => {
  const { data, error, loading } = useContextApi();

  if (error) throw new Error(error);
  if (loading) return <p>Carregando...</p>;

  return (
    data &&
    data.preferencias && (
      <>
        <h2>Preferencias:</h2>
        <ul>
          {Object.entries(data.preferencias).map(([key, value]) => {
            return <li key={key}>{`${key} : ${value}`}</li>;
          })}
        </ul>
      </>
    )
  );
};

export default Content;
