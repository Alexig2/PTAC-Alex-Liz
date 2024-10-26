"use client";
import styles from "../page.module.css";
import styless from "../styles/login.module.css";
import { useRouter } from "next/navigation";
import Usuario from "../interfaces/usuario";
import { useEffect, useState } from "react";

export default function Login() {
  const router =useRouter()
  const [senha, setSenha] = useState<string>();
  const [email, setEmail] = useState<string>();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const response = await fetch(
        "https://prof-jeferson.github.io/API-reservas/usuarios.json"
      );
      if (!response) {
        console.log("Erro ao buscar");
      }
      const usuarios = await response.json();

      const usuarioConvertidos: Usuario[] = usuarios as Usuario[];

      if (!usuarios) {
        console.log("Erro ao buscar");
      } else {
        const user =  usuarioConvertidos.find(
          (user) => user.email == email && user.password == senha
        );
        if(user){
          localStorage.setItem("usuario", JSON.stringify(user));

        }
      }
    } catch {}
  };

  useEffect(() => {
    const usuarioLogado = localStorage.getItem("usuario");
    if (usuarioLogado) {
      console.log(usuarioLogado);
      router.push("/");
    }
  }, []);

  const route = useRouter();
  return (
    <main className={styles.page}>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>E-mail</label>
          <input type="email" name="email" required onChange={(e) => {setEmail(e.target.value)}}/>
        </div>
        <div>
          <label>Senha</label>
          <input type="password" name="senha" required onChange={(e) => {setSenha(e.target.value)}}/>
        </div>

        <button type="submit">Entrar</button>

        <p className={styless.botao} onClick={() => route.push("/cadastro")}>
          Cadastrar
        </p>
      </form>
    </main>
  );
}
