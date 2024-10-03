"use client";
import Mesa from "../interfaces/mesa";
import { useState } from "react";

const mesa = () => {
  const [mesa, setMesa] = useState<Mesa>({
    id: 1,
    codigo: "mesa dos tacos",
    n_lugares: 2,
  });

  return (
    <div>
      <h1>Perfil Usuário</h1>
      <p>Código: {mesa.codigo}</p>
      <p>Lugares: {mesa.n_lugares}</p>
    </div>
  );
};

export default mesa;
