import Head from 'next/head';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import { setupApiClient } from '../../services/api';
import styles from './styles.module.scss';

export default function Transaction() {
  const [name, setName] = useState('');
  const [value, setValue] = useState<number>(0);

  async function handleTransfer(event: FormEvent) {
    event.preventDefault();

    if (!name || value <= 0) {
      toast.warning('É obrigatório informar usuário e valor', {
        theme: 'colored',
      });
      return;
    }

    const apiClient = setupApiClient();

    await apiClient.post('/cash-out', {
      username: name,
      value,
    });

    toast.success('Tranferência concluída com sucesso!', {
      theme: 'colored',
    });

    setName('');
    setValue(0);
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

            <input
              type="number"
              placeholder="Digite o valor a ser transferido"
              className={styles.input}
              value={value}
              onChange={({ target }) => setValue(Number(target.value))}
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
