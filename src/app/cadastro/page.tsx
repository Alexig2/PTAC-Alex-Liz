'use client'
import { useState } from "react";
import styles from "../page.module.css";
import Usuario from "../interfaces/usuario"

import { FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";

import { setCookie, parseCookies } from 'nookies';
import { ApiURL } from "../config";

interface ResponseSignin {
  erro: boolean,
  mensagem: string,
  token?: string
}

export default function Cadastro() {
  const [password, setPassword] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [usuario, setUsuario] = useState<Usuario>({
    nome: '',
    email: '',
    password: ''
  })

  const [erro, setError] = useState("");
  const router = useRouter();

  const alterarNome = (novoNome: string) => {
    setUsuario((valAntes) => ({
      ...valAntes,
      nome: novoNome
    }))
  }

  const alterarEmail = (novoEmail: string) => {
    setUsuario((valoresAnteriores) => ({
      ...valoresAnteriores,
      email: novoEmail
    }));
  };

  const alterarSenha = (novaSenha: string) => {
    setUsuario((valoresAnteriores) => ({
      ...valoresAnteriores,
      password: novaSenha
    }));
  };

  useEffect(() => {
    const { 'restaurant-token': token } = parseCookies();
    if (token) {
      router.push('/');
    }
  }, [router]);

const  handleSubmit = async (e : FormEvent) => {
  e.preventDefault();
  try {
   const response = await fetch(`${ApiURL}/auth/cadastro`, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({email, password})
   })
    if (response){
      const data : ResponseSignin = await response.json()
      const {erro, mensagem, token = ''} = data;
      console.log(data)
      if (erro){
        setError(mensagem)
      } else {
        // npm i nookies setCookie
        setCookie(undefined, 'restaurant-token', token, {
          maxAge: 60*60*1 // 1 hora
        } )

      }
    } else {

    }
} 
 catch (error) {
console.error('Erro na requisicao', error)
}
}


  return (
    <main className={styles.page}>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
      <div>
          <label>Nome</label>
          <input type="text" name="nome" id="nome" value={usuario.nome} onChange={(e) => alterarNome(e.target.value)} required/>
        </div>
        <div>
          <label>E-mail</label>
          <input type="email" name="email" id="email" value={usuario.email} onChange={(e) => alterarEmail(e.target.value)} required/>
        </div>
        <div>
          <label>Senha</label>
          <input type="password" name="password" id="password" value={usuario.password} onChange={(e) => alterarSenha(e.target.value)} required/>
        </div>

        {erro && <p>{erro}</p>}

        <button>Cadastrar</button>
      </form>
    </main>
  );
}
