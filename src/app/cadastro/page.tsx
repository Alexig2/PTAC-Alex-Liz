"use client";
import { useState } from "react";
import styless from "../styles/cadastro.module.css";
import Usuario from "../interfaces/usuario";
import { FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setCookie, parseCookies } from "nookies";
import { ApiURL } from "../../../config";

interface ResponseSignin {
  erro: boolean;
  mensagem: string;
  token?: string;
}

export default function Cadastro() {
  const [usuario, setUsuario] = useState<Usuario>({
    nome: "",
    email: "",
    password: ""
  });

  const [erro, setError] = useState("");
  const router = useRouter();

  const alterarNome = (novoNome: string) => {
    setUsuario((valoresAnteriores) => ({
      ...valoresAnteriores,
      nome: novoNome,
    }));
  };

  const alterarEmail = (novoEmail: string) => {
    setUsuario((valoresAnteriores) => ({
      ...valoresAnteriores,
      email: novoEmail,
    }));
  };

  const alterarSenha = (novaSenha: string) => {
    setUsuario((valoresAnteriores) => ({
      ...valoresAnteriores,
      password: novaSenha,
    }));
  };

  useEffect(() => {
    const { "restaurant-token": token } = parseCookies();
    if (token) {
      router.push("/");
    }
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${ApiURL}/auth/cadastro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario)
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
          router.push("/")
        }
      }
    } catch (error) {
      console.error("Erro na requisicao", error);
    }
  };

  return (
    <main className={styless.fundo}>
      <form onSubmit={handleSubmit} className={styless.container}>
        <h1 className={styless.h1}>Cadastro</h1>
        <div>
          <label>Nome</label>
          <input
            className={styless.input}
            type="text"
            name="nome"
            id="nome"
            value={usuario.nome}
            onChange={(e) => alterarNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>E-mail</label>
          <input
            className={styless.input}
            type="email"
            name="email"
            id="email"
            value={usuario.email}
            onChange={(e) => alterarEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            className={styless.input}
            type="password"
            name="password"
            id="senha"
            minLength={8}
            value={usuario.password}
            onChange={(e) => alterarSenha(e.target.value)}
            required
          />
        </div>

        {erro && <p>{erro}</p>}

        <button type="submit" className={styless.button}>
          Cadastrar
        </button>
      </form>
    </main>
  );
}
