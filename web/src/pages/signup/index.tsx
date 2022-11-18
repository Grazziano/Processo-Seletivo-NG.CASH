import Head from 'next/head';
import Link from 'next/link';
import { FormEvent, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import styles from '../../../styles/Home.module.scss';
import Button from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { AuthContext } from '../../context/AuthContext';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { signUp } = useContext(AuthContext);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if (!username || !password) {
      toast.warning('Preencha todos os dados!', {
        theme: 'colored',
      });
      return;
    }

    setLoading(true);

    let data = {
      username,
      password,
    };

    await signUp(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Cadastro</title>
      </Head>

      <div className={styles.containerCenter}>
        <h1>Crie sua conta</h1>

        <div className={styles.login}>
          <form onSubmit={handleSignUp}>
            <Input
              type="text"
              placeholder="Digite o usuário"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <Input
              type="password"
              placeholder="Digite a senha"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Button type="submit" loading={loading}>
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
