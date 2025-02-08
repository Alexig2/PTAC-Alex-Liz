"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Titulo from "./components/Titulo";
import { parseCookies } from "nookies";

export default function Home() {
  //Variável de estado que inicia o usuário como não cadastrado
  const [user, setUser] = useState(false);
  const router = useRouter();

  //Se há token, o usuário está cadastrado, então setUser = true. Se não página é diferente para o não logado
  useEffect(() => {
    const { "restaurant-token": token } = parseCookies();
    if (token) {
      setUser(true);
    }
  }, [router]);

  //Se logado
  if (user) {
    return (
        <div>
      <div className={styles.fundo}>
        <nav className={styles.cardTitulo}>
          <Titulo titulo="Home" />
        </nav>
        <div className={styles.cardBotao}>
          <button
            className={styles.botao}
            onClick={() => router.push("/reservar")}
          >
            Reservar
          </button>
        </div>
      </div>
      </div>
    );
  } else { //Se não está logado
    return (
      <div className={styles.fundo}>
        <div className={styles.cardTitulo}>
          <Titulo titulo="Reserva" />
        </div>
        <div className={styles.cardBotao}>
          <button
            className={styles.botao}
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}
