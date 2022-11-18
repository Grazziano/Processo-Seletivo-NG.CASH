import Head from 'next/head';
import Link from 'next/link';
import styles from '../../../styles/Home.module.scss';
import Button from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Faça seu cadastro!</title>
      </Head>

      <div className={styles.containerCenter}>
        <h1>Crie sua conta</h1>

        <div className={styles.login}>
          <form>
            <Input type="text" placeholder="Digite o email" />
            <Input type="password" placeholder="Digite a senha" />
            <Button type="submit" loading={false}>
              Cadastrar
            </Button>
          </form>

          <Link href="/" className={styles.text}>
            Já possui uma conta? Faça login
          </Link>
        </div>
      </div>
    </>
  );
}
