import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { setupApiClient } from '../../services/api';
import { canSSRAuth } from '../../utils/canSSRAuth';
import formatCurrency from '../../utils/formatCurrency';
import styles from './styles.module.scss';

export default function Dashboard() {
  const [id, setId] = useState('');
  const [accountId, setAccountId] = useState('');
  const [username, setUsername] = useState('');
  const [balance, setBalance] = useState<number>(0);

  async function loadUserInfo() {
    const apiClient = setupApiClient();

    const response = await apiClient.get('/me');

    setId(response.data.id);
    setAccountId(response.data.accountId);
    setUsername(response.data.username);
    setBalance(response.data.balance);
  }

  useEffect(() => {
    loadUserInfo();
  }, []);
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Header />

      <div className={styles.container}>
        <h2>Dashboard</h2>

        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span className={styles.span}> Conta:</span> {accountId}
          </li>
          <li className={styles.listItem}>
            <span className={styles.span}> Meu nome de usuário:</span>{' '}
            {username}{' '}
          </li>
          <li className={styles.listItem}>
            {' '}
            <span className={styles.span}> Meu saldo atual:</span>{' '}
            {formatCurrency(balance)}{' '}
          </li>
        </ul>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
