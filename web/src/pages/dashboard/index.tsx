import Head from 'next/head';
import React from 'react';
import Header from '../../components/Header';
import { canSSRAuth } from '../../utils/canSSRAuth';

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div>
        <Header />
        <h1>Dashboard</h1>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
