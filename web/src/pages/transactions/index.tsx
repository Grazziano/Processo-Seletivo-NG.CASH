import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { setupApiClient } from '../../services/api';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import styles from './styles.module.scss';

interface IData {
  createdAt: string;
  creditedAccountId: string;
  debitedAccountId: string;
  id: string;
  value: number;
}

interface ITransactionsData {
  credited: IData[];
  debited: IData[];
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<ITransactionsData>();
  const [credited, setCredited] = useState<boolean>(true);
  const [debited, setDebited] = useState<boolean>(false);

  async function loadTransactions() {
    const apiClient = setupApiClient();

    const response = await apiClient.get('/transactions');

    setTransactions(response.data);
  }

  function handleTypeTransaction(type: string) {
    if (type === 'credited') {
      setCredited(true);
      setDebited(false);
    } else if (type === 'debited') {
      setCredited(false);
      setDebited(true);
    }
  }

  const creditedTransactions = transactions?.credited.map((data) => (
    <tr key={data.id} className={styles.credited}>
      <td>{data.id}</td>
      <td>{formatCurrency(data.value)}</td>
      <td>{data.debitedAccountId}</td>
      <td>{data.creditedAccountId}</td>
      <td>{formatDate(data.createdAt)}</td>
    </tr>
  ));

  const debitedTransactions = transactions?.debited.map((data) => (
    <tr key={data.id} className={styles.debited}>
      <td>{data.id}</td>
      <td>{formatCurrency(data.value)}</td>
      <td>{data.debitedAccountId}</td>
      <td>{data.creditedAccountId}</td>
      <td>{formatDate(data.createdAt)}</td>
    </tr>
  ));

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <>
      <Head>
        <title>Minhas transações</title>
      </Head>
      <Header />

      <div className={styles.container}>
        <h1>Minhas transações</h1>

        <div className={styles.containerButtons}>
          <button
            className={`${styles.credited} ${credited && styles.notAllowed}`}
            onClick={() => handleTypeTransaction('credited')}
            disabled={credited}
          >
            Entradas
          </button>
          <button
            className={`${styles.debited} ${debited && styles.notAllowed}`}
            onClick={() => handleTypeTransaction('debited')}
            disabled={debited}
          >
            Saídas
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Valor</th>
              <th>Conta debitada</th>
              <th>Conta creditada</th>
              <th>Data</th>
            </tr>
          </thead>

          <tbody>
            {credited && creditedTransactions}

            {debited && debitedTransactions}
          </tbody>
        </table>
      </div>
    </>
  );
}
