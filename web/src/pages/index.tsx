import Head from 'next/head';
import Link from 'next/link';
import { FormEvent, useContext } from 'react';
import styles from '../../styles/Home.module.scss';
import Button from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
  const { signIn } = useContext(AuthContext);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    let data = {
      username: 'teste',
      password: '123456',
    };

    await signIn(data);
  }

  return (
    <>
      <Head>
        <title>Carteira Digital| Login</title>

        <div className={styles.containerCenter}>
          <h1>Carteira Digital</h1>

          <div className={styles.login}>
            <form onSubmit={handleLogin}>
              <Input type="text" placeholder="Digite o usuário" />
              <Input type="password" placeholder="Digite a senha" />
              <Button type="submit" loading={false}>
                Acessar
              </Button>
            </form>

            <Link href="/signup" className={styles.text}>
              Não possui uma conta? Cadastre-se
            </Link>
          </div>
        </div>
      </Head>
    </>
  );
}
