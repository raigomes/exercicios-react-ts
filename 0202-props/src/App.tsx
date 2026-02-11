/*
 * 1 - Crie um componente Input
 * 2 - Ele deve retornar <label> e <input>, dentro de uma <div>
 * 3 - Recebe as propriedades label e id
 * 4 - A propriedade label deve ser usada como conteúdo de <label>, e a propriedade id deve ser usada como name (input), id (input) e htmlFor (label)
 * 5 - Permita o uso de qualquer propriedade de input no componente Input.
 * 6 - Adicione 1rem de marginBottom na <div>
 */

import React from "react";
import Input from "./Input";

function App() {
  const [data, setData] = React.useState({});

  function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (target instanceof HTMLInputElement) {
      setData({
        ...data,
        [target.name]: target.value,
      });
    }
  }

  return (
    <div>
      <Input id="nome" label="Nome" onChange={handleChange} />
      <Input id="email" label="Email" type="email" onChange={handleChange} />
      <Input
        id="inicio"
        label="Inicio da Viagem"
        type="date"
        onChange={handleChange}
      />
      <Input id="horario" label="Horário" type="time" onChange={handleChange} />

      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

export default App;
