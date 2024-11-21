"use client";
import styles from "../page.module.css";
import styless from "../styles/login.module.css";
import { useRouter } from "next/navigation";
import Usuario from "../interfaces/usuario";
import { FormEvent, useEffect, useState } from "react";
import { ApiURL } from "../../../config";
import { setCookie, parseCookies } from "nookies";

interface ResponseSignin {
  erro: boolean;
  mensagem: string;
  token?: string;
}

export default function Login() {
  const router = useRouter();
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState("");

  useEffect(() => {
    const { "restaurant-token": token } = parseCookies();
    if (token) {
      router.push("/");
    }
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${ApiURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
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
          })
          router.push('/')
        }
      }
    } catch (error) {
      console.error("Erro na requisicao", error);
    }
  };

  return (
    <main className={styless.fundo}>
      <form onSubmit={handleSubmit} className={styless.container}>
        <h1 className={styless.h1}>Login</h1>
        <div>
          <label>E-mail</label>
          <input
            className={styless.input}
            type="email"
            id="email"
            value={email}
            name="email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            className={styless.input}
            type="password"
            name="password"
            id="senha"
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        {error && <p>{error}</p>}


        <button type="submit" className={styless.button}>
          Entrar
        </button>

        <p className={styless.a} onClick={() => router.push("/cadastro")}>
          Cadastrar
        </p>
      </form>
    </main>
  );
}
