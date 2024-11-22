import styles from "../styles/titulo.module.css";

type TituloProp = {
  titulo: string;
}

const Titulo: React.FC<TituloProp> = ({ titulo }) => {
  return <div className={styles.titulo}>{titulo}</div>
}

export default Titulo;
