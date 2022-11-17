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
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [username, setUsername] = useState<UserProps>();
  const isAuthenticated = !!username;

  async function signIn() {
    alert('clicou no login');
  }

  return (
    <AuthContext.Provider value={{ username, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
