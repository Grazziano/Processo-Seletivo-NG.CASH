import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/apiClient';

type UserProps = {
  id: string;
  username: string;
  password: string;
};

type SignInProps = {
  username: string;
  password: string;
};

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

type SignUpProps = {
  username: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, '@nextauth.token');
    Router.push('/');
  } catch (error) {
    toast.error('Erro ao deslogar!', {
      theme: 'colored',
    });
    console.log('erro ao deslogar');
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({
    id: '',
    username: '',
    password: '',
  });
  const isAuthenticated = !!user;

  useEffect(() => {
    const { '@nextauth.token': token } = parseCookies();

    if (token) {
      api
        .get('/me')
        .then((response) => {
          const { id, username, password } = response.data;
          setUser({ id, username, password });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ username, password }: SignInProps) {
    try {
      const response = await api.post('/session', {
        username,
        password,
      });

      // console.log(response.data);

      setCookie(undefined, '@nextauth.token', response.data.token, {
        maxAge: 60 * 60 * 24,
        path: '/',
      });

      setUser({
        id: response.data.id,
        username: response.data.username,
        password: response.data.password,
      });

      api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;

      toast.success('Login concluído com sucesso!', {
        theme: 'colored',
      });

      Router.push('/dashboard');
    } catch (error) {
      toast.error('Erro ao acessar!', {
        theme: 'colored',
      });
      console.log('Erro ao acessar: ', error);
    }
  }

  async function signUp({ username, password }: SignUpProps) {
    try {
      const response = await api.post('/users', {
        username,
        password,
      });

      toast.success('Cadastrado com sucesso!', {
        theme: 'colored',
      });

      Router.push('/');
    } catch (error) {
      toast.error('Erro ao cadastrar!', {
        theme: 'colored',
      });
      console.log('Erro ao cadastrar: ', error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}
