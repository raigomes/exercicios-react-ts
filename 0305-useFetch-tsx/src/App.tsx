// Crie um custom hook chamado useFetch.

// 1 - Este hook deve retornar a interface:
// interface FetchState<T> {
//   data: T | null;
//   loading: boolean;
//   error: string | null;
// }

// Onde T é um valor genérico que deverá ser passado quando o Hook for utilizado.

// 2 - data, loading e error são estados reativos (useState).

// 3 - O hook deve receber a URL e OPTIONS como argumentos (interfaces de fetch).

// 4 - O fetch deve ocorrer em um useEffect, com dependência apenas da URL.

// 5 - Use AbortController para abortar o fetch caso o componente desmonte, antes do fetch ser concluído.

// 6 - Teste o Hook com a api: https://data.origamid.dev/produtos

import React from "react";
import useFetch from "./useFetch";

interface Produto {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  descricao: string;
  internacional: boolean;
}

function App() {
  const { data, loading, error } = useFetch<Produto[]>(
    "https://data.origamid.dev/produtos",
  );

  if (error) return null;
  if (loading) return <div>Carregando...</div>;

  return (
    <ul>
      {data?.map((item) => (
        <li key={item.id}>
          <h2>{item.nome}</h2>
          <p>
            {item.preco.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <p>Quantidade: {item.quantidade}</p>
          <p>Descrição: {item.descricao}</p>
          <p>Internacional: {item.internacional ? "Sim" : "Não"}</p>
        </li>
      ))}
    </ul>
  );
}

export default App;
