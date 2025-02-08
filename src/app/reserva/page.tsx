"use client";
import Reserva from "../interfaces/reserva";
import { useState } from "react";

const reserva = () => {
  const [reserva, setReserva] = useState<Reserva>({
    id: 1,
    usuario_id: 1,
    mesa_id: 1,
    data: new Date('01-01-2024'),
    n_pessoas: 5,
    status: true
  });

  return (
    <div>
      <h1>Reserva</h1>
      {/* <p>Data: {reserva.data}</p> ESTÁ DANDO ERRO AQUI*/}
      <p>Número de pessoas: {reserva.n_pessoas}</p>
      <p>Status: {reserva.status}</p>
    </div>
  );
};

export default reserva;
