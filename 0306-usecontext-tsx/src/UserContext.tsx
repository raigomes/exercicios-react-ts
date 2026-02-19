import React from "react";
import useFetch from "./useFetch";

interface User {
  id: number;
  nome: string;
  idade: number;
  aulas: number;
  cursos: number;
  preferencias: {
    playback: number;
    volume: number;
    qualidade: string;
  };
}

interface IUserContext {
  data: User | null;
  loading: boolean;
  error: string | null;
}

const UserContext = React.createContext<IUserContext | null>(null);

export const useContextApi = () => {
  const context = React.useContext(UserContext);
  if (!context) throw new Error("useContext deve estar dentro do Provider");
  return context;
};

export const UserProvider = ({ children }: React.PropsWithChildren) => {
  const { data, loading, error } = useFetch<User>(
    "https://data.origamid.dev/usuarios/1",
  );
  return (
    <UserContext.Provider value={{ data, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};
