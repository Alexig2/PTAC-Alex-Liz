"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Titulo from "./components/Titulo";
import { parseCookies } from "nookies";

export default function Home() {
  const [user, setUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const { "restaurant-token": token } = parseCookies();
    if (token) {
      setUser(true);
    }
  }, [router]);

  if (user) {
    return (
      <div className={styles.fundo}>
        <div className={styles.cardTitulo}>
          <Titulo titulo="Home" />
        </div>
        <div className={styles.cardBotao}>
          <button
            className={styles.botao}
            onClick={() => router.push("/reservar")}
          >
            Reservar
          </button>
        </div>
      </div>
    );
  } else {
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
