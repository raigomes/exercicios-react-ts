// Interface da API: https://data.origamid.dev/vendas/
// <!-- Essa API possui dados de hoje até 90 dias atrás -->

// 1 - Utilize a API: `https://data.origamid.dev/vendas/?inicio=${inicio}&final=${final}`
// 2 - Inicio/Final é uma string do tipo data YYYY-MM-DD (padrão de saída do input tipo date)
// 3 - Crie ou reutilize o componente Input.tsx (Label com Input) das aulas anteriores
// 4 - Crie 3 estados reativos em App.tsx: data, inicio, final
// 5 - Utilize o componente Input.tsx para modificar o estado de inicio/final
// 6 - Crie um efeito que ocorrerá toda vez que inicio/final mudar. Se existir inicio/final, faça o fetch da API e popule o estado de data com o resultado.
// 7 - Caso data seja diferente de null, mostre na tela o nome e o status de cada venda do período selecionado

import React from "react";
import Input from "./Input";

interface Venda {
  id: string;
  nome: string;
  preco: number;
  status: string;
  pagamento: string;
  parcelas: null | number;
  data: string;
}

function App() {
  const [inicio, setInicio] = React.useState("");
  const [final, setFinal] = React.useState("");
  const [data, setData] = React.useState<null | Venda[]>(null);

  React.useEffect(() => {
    const fetchData = async (ini: Date, fim: Date) => {
      try {
        if (fim.getTime() > ini.getTime()) {
          const response = await fetch(
            `https://data.origamid.dev/vendas/?inicio=${inicio}&final=${final}`,
          );
          if (!response.ok) throw new Error(`Erro: ${response.status}`);

          setData(await response.json());
        }
      } catch (e: unknown) {
        if (e) console.error(e);
        return null;
      }
    };

    if (final && inicio) {
      fetchData(new Date(inicio), new Date(final));
    }
  }, [inicio, final]);

  return (
    <div>
      <Input
        id="inicio"
        label="Início"
        type="date"
        value={inicio}
        onChange={(evt) => setInicio(evt.target.value)}
      />
      <Input
        id="final"
        label="Final"
        type="date"
        value={final}
        onChange={(evt) => setFinal(evt.target.value)}
      />

      {data && (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{`${item.nome}: ${item.status}`}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
