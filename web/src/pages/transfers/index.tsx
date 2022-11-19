import Head from 'next/head';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import { setupApiClient } from '../../services/api';
import styles from './styles.module.scss';

export default function Transaction() {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  async function handleTransfer(event: FormEvent) {
    event.preventDefault();

    if (!name || !value) {
      toast.warning('É obrigatório informar usuário e valor', {
        theme: 'colored',
      });
      return;
    }

    try {
      const apiClient = setupApiClient();

      await apiClient.post('/cash-out', {
        username: name,
        value: parseFloat(value),
      });

      toast.success('Tranferência concluída com sucesso!', {
        theme: 'colored',
      });

      setName('');
      setValue('');
    } catch (error) {
      toast.error('Tranferência não pode ser concluída!', {
        theme: 'colored',
      });
    }
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
              onChange={({ target }) => setValue(target.value)}
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
