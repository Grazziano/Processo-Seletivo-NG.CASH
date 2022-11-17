import Head from 'next/head';
import styles from '../../styles/Home.module.scss';
import Button from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function Home() {
  return (
    <>
      <Head>
        <title>Carteira Digital| Login</title>

        <div className={styles.containerCenter}>
          <h1>Carteira Digital</h1>

          <div className={styles.login}>
            <form>
              <Input type="text" placeholder="Digite o email" />
              <Input type="password" placeholder="Digite a senha" />
              <Button type="submit" loading={false}>
                Acessar
              </Button>
            </form>

            <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
          </div>
        </div>
      </Head>
    </>
  );
}
