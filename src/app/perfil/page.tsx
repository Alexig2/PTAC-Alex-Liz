'use client'
import Usuario from "../interfaces/usuario";
import { useState } from "react";

const perfil = () => {
    /* Caso tiver dúvida parte2
    const usuario = {
      nome: "jose lima",
      idade: 23,
      email: "joselima@gmail.com",
    }; */

    //Criando um exemplo de usuário
  const [usuario, setUsuario] = useState<Usuario>({
    id: 1,
    nome: "jose",
    email: 'jose@gmail.com',
    password: 'jose123',
    tipo: 'cliente'
  });
  
  return (
    <div>
      <h1>Perfil Usuário</h1>
      {/* <PerfilUsuario usuario={usuario} />  Caso tiver dúvida parte3*/}
      <p>Nome: {usuario.nome}</p>
      <p>E-mail: {usuario.email}</p>
      <p>Senha: {usuario.password}</p>
    </div>
  );
};

export default perfil;
