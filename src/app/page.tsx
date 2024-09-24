'use client'
import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user, setUser] = useState(false);
  const route = useRouter();

  if (user) {
    return (
      <div className={styles.page}>
        <h1>Home</h1>
      </div>
    );
  } else {
    return (
      <div className={styles.page}>
        <h1>Home</h1>
        <button onClick={() => route.push('/login')}>Login</button>
      </div>
    );
  }
}
