"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Titulo from "./components/Titulo";
import { parseCookies } from "nookies";
import Mesa from "./interfaces/mesa";

export default function Home() {
  const [user, setUser] = useState(false);
  const router = useRouter();
  const [mesas, setMesas] = useState<Mesa[]>([]) //aaaa

  useEffect(() => {
    async function fetchData(){
      const response = await fetch('http://localhost:3333/reservas') //aaaa
      console.log(await response.json())
    }

    const { "restaurant-token": token } = parseCookies();
    if (token) {
      setUser(true);
    }
  }, [router]);

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
