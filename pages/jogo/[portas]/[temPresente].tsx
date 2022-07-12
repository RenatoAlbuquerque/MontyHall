import { useEffect, useState } from "react";
import styles from "../../../styles/Jogo.module.css";
import Porta from "../../../components/Porta";
import { atualizarPortas, criarPortas } from "../../../functions/portas";
import Link from "../../../node_modules/next/link";
import { useRouter } from "../../../node_modules/next/router";

export default function Jogo() {
  const router = useRouter();
  const [portas, setPortas] = useState([]);
  const [valido, setValido] = useState(false);

  useEffect(() => {
    const portas = +router.query.portas;
    const temPresente = +router.query.temPresente;

    const qtdePortasValida = portas >= 3 && portas <= 100;
    const temPresenteValido = temPresente >= 1 && temPresente <= portas;

    setValido(qtdePortasValida && temPresenteValido);
  }, [router.query.portas, router.query.temPresente]);

  useEffect(() => {
    const portas = +router.query.portas;
    const temPresente = +router.query.temPresente;
    setPortas(criarPortas(portas, temPresente));
  }, [router?.query]);

  function renderizarPortas() {
    return (
      valido &&
      portas.map((porta) => {
        return (
          <Porta
            value={porta}
            key={porta.numero}
            onChange={(novaPorta) =>
              setPortas(atualizarPortas(portas, novaPorta))
            }
          />
        );
      })
    );
  }

  return (
    <div id={styles.jogo}>
      <div className={styles.portas}>
        {valido ? renderizarPortas() : <h1>Valores inválidos</h1>}
      </div>
      <div className={styles.botoes}>
        <Link href="/">
          <button>Reiniciar Jogo</button>
        </Link>
      </div>
    </div>
  );
}