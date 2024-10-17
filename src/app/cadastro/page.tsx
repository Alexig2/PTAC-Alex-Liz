'use client'
import { useState } from "react";
import styles from "../page.module.css";
import Usuario from "../interfaces/usuario"


export default function Cadastro() {
  const [usuario, setUsuario] = useState<Usuario>({
    nome: '',
    email: '',
    password: ''
  })

  const alterarNome = (novoNome: string) => {
    setUsuario((valAntes) => ({
      ...valAntes,
      nome: novoNome
    }))
  }

  return (
    <main className={styles.page}>
      <h1>Cadastro</h1>
      <form action={"/"} method="post">
      <div>
          <label>Nome</label>
          <input type="text" name="nome" value={usuario.nome} required/>
        </div>
        <div>
          <label>E-mail</label>
          <input type="email" name="email" value={usuario.email} required/>
        </div>
        <div>
          <label>Senha</label>
          <input type="password" name="senha" value={usuario.password} required/>
        </div>

        <button>Cadastrar</button>
      </form>
    </main>
  );
}
