import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { setupApiClient } from '../../services/api';

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

  async function loadTransactions() {
    const apiClient = setupApiClient();

    const response = await apiClient.get('/transactions');

    setTransactions(response.data);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <>
      <Head>
        <title>Minhas transações</title>
      </Head>
      <Header />

      <div>
        <h1>Minhas transações</h1>

        {transactions?.credited.map((data) => (
          <li key={data.id}>{data.id}</li>
        ))}

        {transactions?.debited.map((data) => (
          <li key={data.id}>{data.id}</li>
        ))}
      </div>
    </>
  );
}
