import Link from 'next/link';
import React, { useContext } from 'react';
import styles from './styles.module.scss';

import { FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../../context/AuthContext';

export default function Header() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <h1>NG</h1>
        </Link>

        <p>{`Bem vindo, ${user?.username}!`}</p>

        <nav className={styles.menuNav}>
          <Link href="/transfers">Transferências</Link>
          <Link href="/transactions">Transações</Link>

          <button onClick={signOut}>
            <FiLogOut color="#fff" size={24} />
          </button>
        </nav>
      </div>
    </header>
  );
}
