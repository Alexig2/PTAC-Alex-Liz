"use client";
import styles from "./page.module.css";
import styless from "../styles/login.module.css";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Titulo from "../components/Titulo";
import { parseCookies, setCookie } from "nookies";
import Usuario from "../interfaces/usuario";
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
    status: false// ,
    //data: NAO SEI
  });

  const [erro, setError] = useState("");

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

  // const alterarData = (novaData: Date) => {
  //   setReserva((valoresAnteriores) => ({
  //     ...valoresAnteriores,
  //     data: novaData,
  //   }));
  // };

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
    <main className={styless.fundo}>
      <form onSubmit={handleSubmit} className={styless.container}>
        <h1 className={styless.h1}>Reservar</h1>
        <div>
          <label>Número de Pessoas</label>
          <input
            className={styless.input}
            type="number"
            name="n_pessoas"
            value={reserva.n_pessoas}
            onChange={(e) => alterarNPessoas(e.target.value)}
            required
          />
        </div>
{/* TEM Q COLOCAR O STATUS COMO TRUE DE ALGUM JEITO */}
        {/* <div>
          <label>Data</label>
          <input
            className={styless.input}
            type="date"
            name="data"
            value={reservar.data}
            onChange={(e) => alterarData(e.target.value)}
            required
          />
        </div> */}

        {erro && <p>{erro}</p>}

        <button type="submit" className={styless.button}>
          Reservar
        </button>
      </form>
    </main>
  );
}
