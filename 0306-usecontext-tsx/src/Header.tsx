import React from "react";
import { useContextApi } from "./UserContext";

const Header = () => {
  const { data, error, loading } = useContextApi();

  if (error) throw new Error(error);
  if (loading) return <p>Carregando...</p>;

  return (
    data && (
      <header>
        <h1>{data.nome}</h1>
      </header>
    )
  );
};

export default Header;
