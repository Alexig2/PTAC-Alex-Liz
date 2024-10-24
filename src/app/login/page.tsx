"use client";
import styles from "../page.module.css";
import styless from "../styles/login.module.css";
import { useRouter } from "next/navigation";

export default function Login() {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const response = await fetch(
        "https://prof-jeferson.github.io/API-reservas/usuarios.json"
      );
      if (!response) {
        console.log("Erro ao buscar");
      } else {
        const usuarios = await response.json();
        console.log(usuarios);
      }
    } catch {}
  };

  const route = useRouter();
  return (
    <main className={styles.page}>
      <h1>Login</h1>
      <form action={"/"} method="post">
        <div>
          <label>E-mail</label>
          <input type="email" name="email" required />
        </div>
        <div>
          <label>Senha</label>
          <input type="password" name="senha" required />
        </div>

        <button>Entrar</button>

        <p className={styless.botao} onClick={() => route.push("/cadastro")}>
          Cadastrar
        </p>
      </form>
    </main>
  );
}
