import styles from "../styles/titulo.module.css";

type TituloProp = {
  titulo: string;
}
//Título para adicionar nas páginas
const Titulo: React.FC<TituloProp> = ({ titulo }) => {
  return <div className={styles.titulo}>{titulo}</div>
}

export default Titulo;
