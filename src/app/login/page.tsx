import styles from "../page.module.css";

export default function Login() {
  return (
    <main className={styles.page}>
      <h1>Login</h1>
      <form action={"/"} method="post">
        <div>
          <label>E-mail</label>
          <input type="email" name="email"></input>
        </div>
        <div>
          <label>Senha</label>
          <input type="password" name="senha"></input>
        </div>

        <button>Entrar</button>
      </form>
    </main>
  );
}
