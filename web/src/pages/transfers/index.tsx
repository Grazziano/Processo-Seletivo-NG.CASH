import Head from 'next/head';
import { FormEvent, useState } from 'react';
import Header from '../../components/Header';
import styles from './styles.module.scss';

export default function Transaction() {
  const [name, setName] = useState('');

  async function handleTransfer(event: FormEvent) {
    event.preventDefault();

    alert('TESTE ' + name);
  }

  return (
    <>
      <Head>
        <title>Transferências</title>
      </Head>

      <div>
        <Header />

        <main className={styles.container}>
          <h1>Transferências</h1>

          <form className={styles.form} onSubmit={handleTransfer}>
            <input
              type="text"
              placeholder="Digite nome do usuário que irá receber a transferência"
              className={styles.input}
              value={name}
              onChange={({ target }) => setName(target.value)}
            />

            <button type="submit" className={styles.button}>
              Concluir Transação
            </button>
          </form>
        </main>
      </div>
    </>
  );
}
