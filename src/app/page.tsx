"use client";
import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Titulo from "./components/Titulo";

export default function Home() {
  const [user, setUser] = useState(false);
  const route = useRouter();
  const funcaoTeste = () => {
    let n1 = 1;
    let n2 = 2;
    let soma = n1 + n2;
    console.log(soma);
    return <h1>Sei lá</h1>;
  };

  if (user == false) {
    return (
      <div className={styles.fundo}>
        <div className={styles.cardTitulo}>
          <Titulo titulo="Reserva" />
        </div>
        <div className={styles.cardBotao}>
          <button className={styles.botao} onClick={() => route.push("/login")}>
            Login
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div className={styles.page}>
        <h1>Home</h1>
        <button onClick={() => route.push("/login")}>Login</button>
      </div>
    );
  }
}
