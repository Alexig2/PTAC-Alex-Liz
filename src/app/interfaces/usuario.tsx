interface Usuario {
  id?: number,
  nome: string,
  email: string, // se eu fizer email?: string singnifica que não é obrigatório preencher
  password: string,
  tipo?: 'cliente' | 'adm'
}

/* Caso tiver dúvida parte1
const PerfilUsuario: React.FC<{ usuario: Usuario }> = ({ usuario }) => {
  return (
    <div>
      <p>Nome: {usuario.nome}</p>
      <p>Idade: {usuario.idade}</p>
      {usuario.email && <p>E-mail: {usuario.email}</p>}
    </div>
  );
};

export default PerfilUsuario */

export default Usuario