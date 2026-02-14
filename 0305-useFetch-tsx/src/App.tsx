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
import Button from "./Button";

interface Produto {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  descricao: string;
  internacional: boolean;
}

function App() {
  const [id, setId] = React.useState<string | null>(null);
  const { data, loading, error } = useFetch<Produto[]>(
    "https://data.origamid.dev/produtos",
  );
  const produto = useFetch<Produto>(`https://data.origamid.dev/produtos/${id}`);

  if (error) return null;
  if (loading) return <div>Carregando...</div>;

  return (
    <section className="flex">
      <div>
        {data &&
          data.map((item) => (
            <Button key={item.id} onClick={() => setId(item.id)}>
              {item.id}
            </Button>
          ))}
      </div>
      {produto.data && produto.data.id && (
        <ul>
          <li>{produto.data.nome}</li>
          <li>
            {produto.data.preco.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </li>
          <li>Quantidade: {produto.data.quantidade}</li>
          <li>Descrição: {produto.data.descricao}</li>
          <li>Internacional: {produto.data.internacional ? "Sim" : "Não"}</li>
        </ul>
      )}
    </section>
  );

  // return (
  //   <ul>
  //     {data?.map((item) => (
  //       <li key={item.id}>
  //         <h2>{item.nome}</h2>
  //         <p>
  //           {item.preco.toLocaleString("pt-BR", {
  //             style: "currency",
  //             currency: "BRL",
  //           })}
  //         </p>
  //         <p>Quantidade: {item.quantidade}</p>
  //         <p>Descrição: {item.descricao}</p>
  //         <p>Internacional: {item.internacional ? "Sim" : "Não"}</p>
  //       </li>
  //     ))}
  //   </ul>
  // );
}

export default App;
