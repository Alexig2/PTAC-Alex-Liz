import styles from "../styles/titulo.module.css";

type TituloProp = {
  titulo: string;
}

const Titulo: React.FC<TituloProp> = ({ titulo }) => {
  return <h1 className={styles.titulo}>{titulo}</h1>
}

export default Titulo;
