import Router from 'next/router';
import { destroyCookie } from 'nookies';
import { createContext, ReactNode, useState } from 'react';

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
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, '@nextauth.token');
    Router.push('/');
  } catch (error) {
    console.log('erro ao deslogar');
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({
    id: '',
    username: '',
    password: '',
  });
  const isAuthenticated = user ? true : false;

  async function signIn({ username, password }: SignInProps) {}

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
