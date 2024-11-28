"use client";
import styles from "../styles/reservar.module.css";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseCookies, setCookie } from "nookies";
import Reserva from "../interfaces/reserva";
import { ApiURL } from "../../../config";

export default function Reservar() {
  const router = useRouter();

  useEffect(() => {
    const { "restaurant-token": token } = parseCookies();
    if (!token) {
      router.push("/");
    }
  }, [router]);

  interface ResponseSignin {
    erro: boolean;
    mensagem: string;
    token?: string;
  }

  const [reserva, setReserva] = useState<Reserva>({
    n_pessoas: 0,
    status: false,
    data: new Date("2024-01-01"),
  });

  const [erro, setError] = useState("");

  function convertDateToString() {
    return reserva.data?.toISOString().split("T")[0];
  }

  const mesas = [
    { id: 1, n_pessoas: 4 },
    { id: 2, n_pessoas: 6 },
    { id: 3, n_pessoas: 2 },
    { id: 4, n_pessoas: 2 },
  ];

  const alterarNPessoas = (novoNPessoas: number) => {
    setReserva((valoresAnteriores) => ({
      ...valoresAnteriores,
      n_pessoas: novoNPessoas,
    }));
  };

  const alterarStatus = (novoStatus: boolean) => {
    setReserva((valoresAnteriores) => ({
      ...valoresAnteriores,
      status: novoStatus,
    }));
  };

  const alterarData = (novaData: Date) => {
    setReserva((valoresAnteriores) => ({
      ...valoresAnteriores,
      data: novaData,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {

    e.preventDefault();
    try {
      const response = await fetch(`${ApiURL}/auth/reservar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reserva),
      });
      if (response) {
        const data: ResponseSignin = await response.json();
        const { erro, mensagem, token = "" } = data;
        console.log(data);
        if (erro) {
          setError(mensagem);
        } else {
          // npm i nookies setCookie
          setCookie(undefined, "restaurant-token", token, {
            maxAge: 60 * 60 * 1, // 1 hora
          });
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Erro na requisicao", error);
    }
  };

  return (
    <main className={styles.fundo}>
      <form onSubmit={handleSubmit} className={styles.container}>
        <h1 className={styles.h1}>Reservar</h1>
        <div>
          <label>Mesas Disponíveis</label>
          <select className={styles.input} name="mesaDisp" id="">
            {mesas.map((mesa) => {
              return <option value="">Mesa {mesa.id}</option>;
            })}
          </select>
        </div>
        <div>
          <label>Número de Pessoas</label>
          <input
            className={styles.input}
            type="number"
            name="n_pessoas"
            value={reserva.n_pessoas}
            onChange={(e) => alterarNPessoas(parseInt(e.target.value))}
            required
          />
        </div>
        {/* TEM Q COLOCAR O STATUS COMO TRUE DE ALGUM JEITO */}
        <div>
          <label>Data</label>
          <input
            className={styles.input}
            type="date"
            name="data"
            value={convertDateToString()}
            onChange={(e) => alterarData(new Date(e.target.value))}
            required
          />
        </div>

        {erro && <p>{erro}</p>}

        <button type="submit" className={styles.button}>
          Reservar
        </button>
      </form>
    </main>
  );
}
