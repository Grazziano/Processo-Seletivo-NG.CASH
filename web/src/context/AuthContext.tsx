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
  const [user, setUser] = useState<UserProps>({
    id: '',
    username: '',
    password: '',
  });
  const isAuthenticated = user ? true : false;

  async function signIn({ username, password }: SignInProps) {}

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
